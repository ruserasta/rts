import { ModulePage } from "@/components/layout/module-page";
import { CampaignsTable } from "@/components/modules/campaigns-table";
import { CreateCampaignForm } from "@/components/modules/create-campaign-form";
import { listCampaigns } from "@/lib/data/campaigns-repo";

export default async function CampaignsPage() {
  const { rows, source } = await listCampaigns();

  return (
    <ModulePage title="Campaigns" description="Track campaign status, channels, budgets, and overspend risk.">
      <div className="mt-4 space-y-4">
        <div className="rounded-lg border border-border bg-card px-3 py-2 text-xs text-muted-foreground">
          Data source: {source === "supabase" ? "Supabase" : "Mock fallback"}
        </div>
        <CreateCampaignForm />
        <CampaignsTable rows={rows} />
      </div>
    </ModulePage>
  );
}
