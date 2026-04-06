import { budgetsData, calculateBudgetMetrics, getCampaignName, getClientName } from "@/lib/data/agency-data";

export function BudgetsTable() {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="min-w-full text-sm">
        <thead className="bg-muted text-left text-xs uppercase tracking-wide text-muted-foreground">
          <tr>
            <th className="px-3 py-2">Client</th>
            <th className="px-3 py-2">Campaign</th>
            <th className="px-3 py-2">Allocated</th>
            <th className="px-3 py-2">Spend</th>
            <th className="px-3 py-2">Total Cost</th>
            <th className="px-3 py-2">Profit</th>
            <th className="px-3 py-2">ROI</th>
          </tr>
        </thead>
        <tbody>
          {budgetsData.map((row) => {
            const metrics = calculateBudgetMetrics(row);
            const overBudget = row.actualSpend > row.allocatedBudget;
            return (
              <tr className="border-t border-border" key={row.id}>
                <td className="px-3 py-2">{getClientName(row.clientId)}</td>
                <td className="px-3 py-2">{getCampaignName(row.campaignId)}</td>
                <td className="px-3 py-2">${row.allocatedBudget.toLocaleString()}</td>
                <td className={`px-3 py-2 ${overBudget ? "text-danger" : ""}`}>${row.actualSpend.toLocaleString()}</td>
                <td className="px-3 py-2">${metrics.totalCost.toLocaleString()}</td>
                <td className={`px-3 py-2 ${metrics.profit >= 0 ? "text-success" : "text-danger"}`}>${metrics.profit.toLocaleString()}</td>
                <td className="px-3 py-2">{(metrics.roi * 100).toFixed(1)}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
