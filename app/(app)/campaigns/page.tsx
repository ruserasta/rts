import { ModulePage } from "@/components/layout/module-page";
import { modulePlaceholder } from "@/lib/data/mock-data";

export default function CampaignsPage() {
  return <ModulePage title="Campaigns" description={modulePlaceholder.campaigns} />;
}
