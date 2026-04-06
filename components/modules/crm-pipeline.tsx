import { crmLeadsData } from "@/lib/data/agency-data";

const stages = ["new_lead", "contacted", "qualified", "proposal_sent", "negotiation", "won", "lost"] as const;

export function CrmPipeline() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stages.map((stage) => {
        const rows = crmLeadsData.filter((lead) => lead.stage === stage);
        const total = rows.reduce((sum, lead) => sum + lead.estimatedValue, 0);

        return (
          <div className="rounded-xl border border-border bg-card p-3" key={stage}>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">{stage.replace("_", " ")}</p>
            <p className="mt-1 text-lg font-semibold">${total.toLocaleString()}</p>
            <div className="mt-2 space-y-2">
              {rows.map((lead) => (
                <div className="rounded-lg border border-border bg-muted p-2 text-xs" key={lead.id}>
                  <p className="font-medium">{lead.company}</p>
                  <p className="text-muted-foreground">{lead.contactPerson} · {lead.owner}</p>
                </div>
              ))}
              {rows.length === 0 && <p className="text-xs text-muted-foreground">No leads in this stage.</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
