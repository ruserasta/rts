import { Card } from "@/components/ui/card";
import { budgetsData, calculateBudgetMetrics, crmLeadsData, tasksData } from "@/lib/data/agency-data";

export default function ReportsPage() {
  const totalRevenue = budgetsData.reduce((sum, row) => sum + row.revenue, 0);
  const totalProfit = budgetsData.reduce((sum, row) => sum + calculateBudgetMetrics(row).profit, 0);
  const completedTasks = tasksData.filter((task) => task.status === "done").length;
  const openPipeline = crmLeadsData
    .filter((lead) => !["won", "lost"].includes(lead.stage))
    .reduce((sum, lead) => sum + lead.estimatedValue, 0);

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold">Reports</h2>
        <p className="text-sm text-muted-foreground">Operational snapshot for leadership review.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <p className="text-xs uppercase text-muted-foreground">Total Revenue</p>
          <p className="mt-1 text-2xl font-semibold">${totalRevenue.toLocaleString()}</p>
        </Card>
        <Card>
          <p className="text-xs uppercase text-muted-foreground">Total Profit</p>
          <p className={`mt-1 text-2xl font-semibold ${totalProfit >= 0 ? "text-success" : "text-danger"}`}>${totalProfit.toLocaleString()}</p>
        </Card>
        <Card>
          <p className="text-xs uppercase text-muted-foreground">Tasks Completed</p>
          <p className="mt-1 text-2xl font-semibold">{completedTasks}</p>
        </Card>
        <Card>
          <p className="text-xs uppercase text-muted-foreground">Open Pipeline</p>
          <p className="mt-1 text-2xl font-semibold">${openPipeline.toLocaleString()}</p>
        </Card>
      </div>
    </section>
  );
}
