"use client";

import { useMemo, useState } from "react";
import { getClientName } from "@/lib/data/agency-data";
import type { CampaignRecord } from "@/lib/types/domain";

export function CampaignsTable({ rows: inputRows }: { rows: CampaignRecord[] }) {
  const [status, setStatus] = useState("all");

  const rows = useMemo(
    () => inputRows.filter((item) => status === "all" || item.status === status),
    [status, inputRows]
  );

  return (
    <div className="space-y-4">
      <select className="rounded-lg border border-border bg-muted px-3 py-2 text-sm" onChange={(e) => setStatus(e.target.value)} value={status}>
        <option value="all">All statuses</option>
        <option value="draft">Draft</option>
        <option value="planned">Planned</option>
        <option value="active">Active</option>
        <option value="paused">Paused</option>
        <option value="completed">Completed</option>
      </select>
      <div className="grid gap-3 md:grid-cols-2">
        {rows.map((campaign) => {
          const overspend = campaign.spend > campaign.budget;
          return (
            <div className="rounded-xl border border-border bg-card p-4" key={campaign.id}>
              <p className="text-sm font-medium">{campaign.name}</p>
              <p className="mt-1 text-xs text-muted-foreground">{getClientName(campaign.clientId)} · {campaign.channel}</p>
              <div className="mt-3 flex items-center justify-between text-xs">
                <span>Budget ${campaign.budget.toLocaleString()}</span>
                <span className={overspend ? "text-danger" : "text-success"}>Spend ${campaign.spend.toLocaleString()}</span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">Owner: {campaign.owner} · Type: {campaign.type.replace("_", " ")}</p>
            </div>
          );
        })}
        {rows.length === 0 && <p className="text-xs text-muted-foreground">No campaigns found for selected status.</p>}
      </div>
    </div>
  );
}
