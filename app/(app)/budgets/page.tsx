import { ModulePage } from "@/components/layout/module-page";
import { BudgetsTable } from "@/components/modules/budgets-table";

export default function BudgetsPage() {
  return (
    <ModulePage title="Budgets" description="Allocated vs spend with total cost, profit, and ROI calculations.">
      <div className="mt-4">
        <BudgetsTable />
      </div>
    </ModulePage>
  );
}
