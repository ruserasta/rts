import { isAfter, isBefore, parseISO, startOfWeek, endOfWeek } from "date-fns";
import { StatCard } from "@/components/dashboard/stat-card";
import { SimpleBarChart } from "@/components/charts/simple-bar-chart";
import { Card } from "@/components/ui/card";
import { budgetsData, campaignsData, clientsData, contentItemsData, crmLeadsData, tasksData, calculateBudgetMetrics } from "@/lib/data/agency-data";

export default function DashboardPage() {
  const now = new Date("2026-04-06");
  const weekStart = startOfWeek(now, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(now, { weekStartsOn: 1 });

  const activeClients = clientsData.filter((client) => client.status === "active").length;
  const activeCampaigns = campaignsData.filter((campaign) => campaign.status === "active").length;
  const overdueTasks = tasksData.filter((task) => isBefore(parseISO(task.dueDate), now) && task.status !== "done").length;
  const weeklyContent = contentItemsData.filter((item) => {
    const d = parseISO(item.publishDate);
    return isAfter(d, weekStart) && isBefore(d, weekEnd);
  }).length;
  const monthlyBudget = budgetsData.reduce((sum, row) => sum + row.allocatedBudget, 0);
  const monthlySpend = budgetsData.reduce((sum, row) => sum + row.actualSpend, 0);
  const pipelineValue = crmLeadsData
    .filter((lead) => !["won", "lost"].includes(lead.stage))
    .reduce((sum, lead) => sum + lead.estimatedValue, 0);

  const chartData = {
    campaignStatus: Object.entries(
      campaignsData.reduce<Record<string, number>>((acc, row) => {
        acc[row.status] = (acc[row.status] ?? 0) + 1;
        return acc;
      }, {})
    ).map(([name, value]) => ({ name, value })),
    tasksByStatus: Object.entries(
      tasksData.reduce<Record<string, number>>((acc, row) => {
        acc[row.status] = (acc[row.status] ?? 0) + 1;
        return acc;
      }, {})
    ).map(([name, value]) => ({ name, value })),
    leadsByStage: Object.entries(
      crmLeadsData.reduce<Record<string, number>>((acc, row) => {
        acc[row.stage] = (acc[row.stage] ?? 0) + 1;
        return acc;
      }, {})
    ).map(([name, value]) => ({ name, value })),
    contentByPlatform: Object.entries(
      contentItemsData.reduce<Record<string, number>>((acc, row) => {
        acc[row.platform] = (acc[row.platform] ?? 0) + 1;
        return acc;
      }, {})
    ).map(([name, value]) => ({ name, value }))
  };

  const totalProfit = budgetsData.reduce((sum, row) => sum + calculateBudgetMetrics(row).profit, 0);

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Operations Dashboard</h2>
        <p className="text-sm text-muted-foreground">Live snapshot of CAK Group delivery, finance, and pipeline.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Active Clients" value={String(activeClients)} />
        <StatCard label="Active Campaigns" value={String(activeCampaigns)} />
        <StatCard label="Overdue Tasks" value={String(overdueTasks)} helper="Needs immediate attention" />
        <StatCard label="Content This Week" value={String(weeklyContent)} />
        <StatCard label="Pipeline Value" value={`$${pipelineValue.toLocaleString()}`} />
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <SimpleBarChart title="Campaign Status Breakdown" data={chartData.campaignStatus} />
        <SimpleBarChart title="Tasks by Status" data={chartData.tasksByStatus} />
        <SimpleBarChart title="Leads by Stage" data={chartData.leadsByStage} />
        <SimpleBarChart title="Weekly Content by Platform" data={chartData.contentByPlatform} />
      </div>

      <Card className="grid gap-4 md:grid-cols-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Monthly Budget</p>
          <p className="text-xl font-semibold">${monthlyBudget.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Current Spend</p>
          <p className="text-xl font-semibold text-warning">${monthlySpend.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Remaining</p>
          <p className="text-xl font-semibold text-success">${(monthlyBudget - monthlySpend).toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Estimated Profit</p>
          <p className={`text-xl font-semibold ${totalProfit >= 0 ? "text-success" : "text-danger"}`}>${totalProfit.toLocaleString()}</p>
        </div>
      </Card>
    </section>
  );
}
