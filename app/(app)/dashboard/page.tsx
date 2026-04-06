import { dashboardStats, chartData } from "@/lib/data/mock-data";
import { StatCard } from "@/components/dashboard/stat-card";
import { SimpleBarChart } from "@/components/charts/simple-bar-chart";
import { Card } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Operations Dashboard</h2>
        <p className="text-sm text-muted-foreground">Live snapshot of CAK Group delivery, finance, and pipeline.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Active Clients" value={String(dashboardStats.activeClients)} />
        <StatCard label="Active Campaigns" value={String(dashboardStats.activeCampaigns)} />
        <StatCard label="Overdue Tasks" value={String(dashboardStats.overdueTasks)} helper="Needs immediate attention" />
        <StatCard label="Content This Week" value={String(dashboardStats.contentThisWeek)} />
        <StatCard label="Team Utilization" value={`${dashboardStats.teamUtilization}%`} />
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
          <p className="text-xl font-semibold">${dashboardStats.monthlyBudget.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Current Spend</p>
          <p className="text-xl font-semibold text-warning">${dashboardStats.monthlySpend.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Remaining</p>
          <p className="text-xl font-semibold text-success">${(dashboardStats.monthlyBudget - dashboardStats.monthlySpend).toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">CRM Pipeline</p>
          <p className="text-xl font-semibold">${dashboardStats.pipelineValue.toLocaleString()}</p>
        </div>
      </Card>
    </section>
  );
}
