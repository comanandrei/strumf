import { z } from "zod";

import { env } from "~/env";

import type { PrismaClient } from "../../../generated/prisma";
import {
  OracleSqlValidationError,
  validateOracleSelectSql,
} from "./oracle-sql-validator";

export const ORACLE_SCHEMA_SUMMARY = `
PostgreSQL database for Strumf baby-care app. Table names are case-sensitive — quote them, e.g. "Baby", "FeedingEvent".

Enums:
- HouseholdRole: OWNER, MEMBER
- MilkType: BREAST_MILK, FORMULA, MIXED, UNKNOWN
- BabySex: MALE, FEMALE, OTHER, UNKNOWN

Tables:
- "Household" (id, name, createdAt, updatedAt)
- "HouseholdMembership" (id, userId, householdId, role, displayLabel, createdAt, updatedAt)
- "CaregiverInvite" (id, householdId, emailNormalized, token, invitedByUserId, expiresAt, revokedAt, acceptedAt, acceptedByUserId)
- "Baby" (id, householdId, displayName, birthDateTime, birthWeightGrams, birthLengthCm, headCircumferenceCm, sex, notes, timezone, createdAt, updatedAt)
- "FeedingEvent" (id, babyId, loggedByUserId, startedAt, endedAt, amountMl, milkType, notes, createdAt, updatedAt)
- "Consultation" (id, babyId, recordedById, occurredAt, location, reason, outcomeNotes, providerName, followUpAt, createdAt, updatedAt)
- "Appointment" (id, babyId, title, startsAt, endsAt, location, notes, createdAt, updatedAt)
- "PredictionCache" (id, babyId, kind, inputFingerprint, payload, modelVersion, expiresAt, createdAt)
- "User" (id, name, email, emailVerified, image, passwordHash, isActive) — never select passwordHash
- "Account", "Session", "VerificationToken" — auth internals; avoid unless necessary

Rules:
- Generate exactly one read-only SELECT (WITH ... SELECT allowed).
- Always include LIMIT (max 100).
- Quote mixed-case table/column names with double quotes.
- Prefer aggregations and filters over selecting all rows.
`.trim();

const OracleGptResponseSchema = z.object({
  sql: z.string().min(1),
  explanation: z.string().min(1),
  title: z.string().min(1).optional(),
});

export type OracleQueryResult = {
  sql: string;
  explanation: string;
  title: string;
  columns: string[];
  rows: Record<string, unknown>[];
  rowCount: number;
  model: string;
};

function serializeCell(value: unknown): unknown {
  if (value instanceof Date) return value.toISOString();
  if (value === null || value === undefined) return null;
  if (typeof value === "bigint") return value.toString();
  if (typeof value === "object") return JSON.stringify(value);
  return value;
}

function rowsToRecords(rows: unknown[]): Record<string, unknown>[] {
  return rows.map((row) => {
    if (row && typeof row === "object" && !Array.isArray(row)) {
      const record: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(row as Record<string, unknown>)) {
        record[key] = serializeCell(value);
      }
      return record;
    }
    return { value: serializeCell(row) };
  });
}

export async function requestGptOracleSql(question: string) {
  if (!env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not configured.");
  }

  const model = env.OPENAI_MODEL ?? "gpt-4o-mini";
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      temperature: 0.1,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "You translate natural-language data questions into safe PostgreSQL SELECT queries for the Strumf baby-care app. Return only valid JSON with keys: sql, explanation, and optional title. Never generate mutating SQL.",
        },
        {
          role: "user",
          content: `Schema:\n${ORACLE_SCHEMA_SUMMARY}\n\nQuestion:\n${question}`,
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`GPT request failed with status ${response.status}.`);
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string | null } }>;
  };
  const content = data.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("GPT returned an empty response.");
  }

  const parsed = OracleGptResponseSchema.parse(JSON.parse(content) as unknown);
  return { model, ...parsed };
}

export async function runOracleQuery(
  db: PrismaClient,
  question: string,
): Promise<OracleQueryResult> {
  const { model, sql: rawSql, explanation, title } = await requestGptOracleSql(question);

  let validatedSql: string;
  try {
    validatedSql = validateOracleSelectSql(rawSql);
  } catch (error) {
    if (error instanceof OracleSqlValidationError) {
      throw new Error(`Generated SQL failed validation: ${error.message}`);
    }
    throw error;
  }

  await db.$executeRawUnsafe(`SET LOCAL statement_timeout = '5000'`);

  let rawRows: unknown;
  try {
    rawRows = await db.$queryRawUnsafe(validatedSql);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Query execution failed.";
    throw new Error(`Database error: ${message}`);
  }

  const rowsArray = Array.isArray(rawRows) ? rawRows : [rawRows];
  const records = rowsToRecords(rowsArray);
  const columns =
    records.length > 0 ? Object.keys(records[0] ?? {}) : [];

  return {
    sql: validatedSql,
    explanation,
    title: title ?? "Query results",
    columns,
    rows: records,
    rowCount: records.length,
    model,
  };
}
