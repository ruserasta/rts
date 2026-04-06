import { ModulePage } from "@/components/layout/module-page";
import { CampaignsTable } from "@/components/modules/campaigns-table";

export default function CampaignsPage() {
  return (
    <ModulePage title="Campaigns" description="Track campaign status, channels, budgets, and overspend risk.">
      <div className="mt-4">
        <CampaignsTable />
      </div>
    </ModulePage>
  );
}
