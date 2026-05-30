"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

import { Button } from "~/app/_components/ui/button";
import { Card } from "~/app/_components/ui/card";
import { api } from "~/trpc/react";

function formatCell(value: unknown): string {
  if (value === null || value === undefined) return "—";
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

export default function OraclePage() {
  const { data: session, status } = useSession();
  const [question, setQuestion] = useState("");
  const statusQuery = api.oracle.status.useQuery(undefined, {
    enabled:
      status === "authenticated" &&
      Boolean(session?.user && "isSudoAdmin" in session.user && session.user.isSudoAdmin),
  });
  const askMutation = api.oracle.ask.useMutation();

  const isSudoAdmin =
    session?.user && "isSudoAdmin" in session.user && session.user.isSudoAdmin;

  if (status === "loading") {
    return <p className="text-white/60">Loading…</p>;
  }

  if (!isSudoAdmin) {
    return (
      <div className="flex flex-col gap-4">
        <header>
          <h1 className="text-2xl font-bold tracking-tight">Oracle</h1>
          <p className="mt-1 text-sm text-white/65">Natural language database queries</p>
        </header>
        <Card>
          <p className="text-sm text-white/80">
            Oracle is restricted to sudo admins. Sign in with an authorized account to use it.
          </p>
        </Card>
      </div>
    );
  }

  const result = askMutation.data;
  const gptReady = statusQuery.data?.isGptConfigured ?? false;

  return (
    <div className="flex flex-col gap-6 pb-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Oracle</h1>
        <p className="mt-1 text-sm text-white/65">
          Describe the data you want. GPT writes a read-only SQL query, runs it, and shows results.
        </p>
      </header>

      {!gptReady && statusQuery.isSuccess ? (
        <Card className="border border-amber-400/40 bg-amber-400/10">
          <p className="text-sm text-amber-100">
            Add <code className="rounded bg-black/20 px-1">OPENAI_API_KEY</code> to your environment
            to enable Oracle.
          </p>
        </Card>
      ) : null}

      <Card>
        <form
          className="flex flex-col gap-4"
          onSubmit={(event) => {
            event.preventDefault();
            const trimmed = question.trim();
            if (!trimmed || askMutation.isPending) return;
            askMutation.mutate({ question: trimmed });
          }}
        >
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-white/80">What do you want to know?</span>
            <textarea
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              rows={4}
              placeholder='e.g. "Total feeding volume per baby in the last 7 days"'
              className="min-h-28 w-full resize-y rounded-xl border border-strumf-border bg-black/20 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-strumf-accent focus:outline-none"
            />
          </label>
          <Button
            type="submit"
            variant="accent"
            disabled={!question.trim() || askMutation.isPending || !gptReady}
          >
            {askMutation.isPending ? "Asking Oracle…" : "Run query"}
          </Button>
          {askMutation.error ? (
            <p className="text-sm text-strumf-danger">{askMutation.error.message}</p>
          ) : null}
        </form>
      </Card>

      {result ? (
        <>
          <Card>
            <p className="text-xs font-medium uppercase tracking-wide text-white/50">Summary</p>
            <h2 className="mt-2 text-lg font-semibold text-white">{result.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-white/80">{result.explanation}</p>
            <p className="mt-3 text-xs text-white/50">
              {result.rowCount} row{result.rowCount === 1 ? "" : "s"} · {result.model}
            </p>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-strumf-accent">
                View generated SQL
              </summary>
              <pre className="mt-2 overflow-x-auto rounded-lg bg-black/30 p-3 text-xs text-white/90">
                {result.sql}
              </pre>
            </details>
          </Card>

          <Card className="overflow-hidden p-0">
            {result.rowCount === 0 ? (
              <p className="p-4 text-sm text-white/70">No rows returned.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-strumf-border bg-black/25">
                      {result.columns.map((column) => (
                        <th
                          key={column}
                          className="whitespace-nowrap px-4 py-3 text-xs font-bold uppercase tracking-wide text-white/60"
                        >
                          {column}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {result.rows.map((row, rowIndex) => (
                      <tr
                        key={rowIndex}
                        className="border-b border-strumf-border/60 even:bg-white/[0.03]"
                      >
                        {result.columns.map((column) => (
                          <td key={column} className="max-w-xs truncate px-4 py-2.5 text-white/90">
                            {formatCell(row[column])}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </>
      ) : null}
    </div>
  );
}
