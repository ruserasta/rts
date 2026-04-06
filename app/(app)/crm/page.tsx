import { ModulePage } from "@/components/layout/module-page";
import { modulePlaceholder } from "@/lib/data/mock-data";

export default function CrmPage() {
  return <ModulePage title="CRM Pipeline" description={modulePlaceholder.crm} />;
}
