import { ModulePage } from "@/components/layout/module-page";
import { modulePlaceholder } from "@/lib/data/mock-data";

export default function ReportsPage() {
  return <ModulePage title="Reports" description={modulePlaceholder.reports} />;
}
