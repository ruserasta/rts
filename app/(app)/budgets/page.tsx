import { ModulePage } from "@/components/layout/module-page";
import { modulePlaceholder } from "@/lib/data/mock-data";

export default function BudgetsPage() {
  return <ModulePage title="Budgets" description={modulePlaceholder.budgets} />;
}
