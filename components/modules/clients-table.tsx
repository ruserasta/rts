"use client";

import { useMemo, useState } from "react";
import type { ClientRecord } from "@/lib/types/domain";

export function ClientsTable({ rows: inputRows }: { rows: ClientRecord[] }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");

  const rows = useMemo(
    () =>
      inputRows.filter((client) => {
        const bySearch = client.name.toLowerCase().includes(query.toLowerCase()) || client.industry.toLowerCase().includes(query.toLowerCase());
        const byStatus = status === "all" || client.status === status;
        return bySearch && byStatus;
      }),
    [query, status, inputRows]
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <input className="rounded-lg border border-border bg-muted px-3 py-2 text-sm" onChange={(e) => setQuery(e.target.value)} placeholder="Search client or industry" value={query} />
        <select className="rounded-lg border border-border bg-muted px-3 py-2 text-sm" onChange={(e) => setStatus(e.target.value)} value={status}>
          <option value="all">All statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="on_hold">On hold</option>
        </select>
      </div>
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="min-w-full text-sm">
          <thead className="bg-muted text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-3 py-2">Client</th>
              <th className="px-3 py-2">Industry</th>
              <th className="px-3 py-2">Owner</th>
              <th className="px-3 py-2">Service</th>
              <th className="px-3 py-2">Retainer</th>
              <th className="px-3 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr className="border-t border-border" key={row.id}>
                <td className="px-3 py-2 font-medium">{row.name}</td>
                <td className="px-3 py-2">{row.industry}</td>
                <td className="px-3 py-2">{row.owner}</td>
                <td className="px-3 py-2">{row.serviceType.replace("_", " ")}</td>
                <td className="px-3 py-2">${row.retainer.toLocaleString()}</td>
                <td className="px-3 py-2">
                  <span className={`rounded-full px-2 py-1 text-xs ${row.status === "active" ? "bg-green-500/15 text-green-300" : row.status === "on_hold" ? "bg-amber-500/15 text-amber-300" : "bg-zinc-500/15 text-zinc-300"}`}>
                    {row.status.replace("_", " ")}
                  </span>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td className="px-3 py-6 text-center text-xs text-muted-foreground" colSpan={6}>
                  No clients match the current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
