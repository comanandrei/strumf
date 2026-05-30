/** Postgres table names from prisma/schema.prisma (Prisma default mapping). */
export const ORACLE_ALLOWED_TABLES = [
  "Household",
  "HouseholdMembership",
  "CaregiverInvite",
  "Baby",
  "FeedingEvent",
  "Consultation",
  "Appointment",
  "PredictionCache",
  "Account",
  "Session",
  "User",
  "VerificationToken",
] as const;

const FORBIDDEN_PATTERN =
  /\b(insert|update|delete|drop|truncate|alter|create|grant|revoke|copy|execute|call|merge|replace|attach|detach|vacuum|reindex|cluster|comment|do|pg_sleep|pg_read_file|pg_write_file|lo_import|lo_export|dblink|pg_catalog|information_schema)\b/i;

const MAX_ROWS = 100;

export class OracleSqlValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "OracleSqlValidationError";
  }
}

export function validateOracleSelectSql(rawSql: string): string {
  const sql = rawSql.trim().replace(/\s+/g, " ");
  if (!sql) {
    throw new OracleSqlValidationError("SQL query is empty.");
  }

  if (sql.includes(";")) {
    throw new OracleSqlValidationError("Only a single SELECT statement is allowed.");
  }

  if (sql.includes("--") || sql.includes("/*")) {
    throw new OracleSqlValidationError("SQL comments are not allowed.");
  }

  const lowered = sql.toLowerCase();
  if (!lowered.startsWith("select ") && !lowered.startsWith("with ")) {
    throw new OracleSqlValidationError("Only read-only SELECT queries are allowed.");
  }

  if (FORBIDDEN_PATTERN.test(sql)) {
    throw new OracleSqlValidationError("Query contains forbidden keywords.");
  }

  if (/\bpasswordhash\b/i.test(sql)) {
    throw new OracleSqlValidationError("Selecting password hashes is not allowed.");
  }

  const referencedTables = ORACLE_ALLOWED_TABLES.filter((table) => {
    const quoted = new RegExp(`"${table}"`, "i");
    const unquoted = new RegExp(`\\b${table}\\b`, "i");
    return quoted.test(sql) || unquoted.test(sql);
  });

  if (referencedTables.length === 0) {
    throw new OracleSqlValidationError(
      `Query must reference at least one allowed table: ${ORACLE_ALLOWED_TABLES.join(", ")}.`,
    );
  }

  const hasLimit = /\blimit\s+\d+/i.test(sql);
  if (hasLimit) {
    const limitMatch = /\blimit\s+(\d+)/i.exec(sql);
    const limitValue = limitMatch ? Number.parseInt(limitMatch[1] ?? "0", 10) : 0;
    if (limitValue > MAX_ROWS) {
      throw new OracleSqlValidationError(`LIMIT must be ${MAX_ROWS} rows or fewer.`);
    }
    return sql;
  }

  return `${sql} LIMIT ${MAX_ROWS}`;
}
