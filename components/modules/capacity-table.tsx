import { teamMembers } from "@/lib/data/mock-data";
import { tasksData } from "@/lib/data/agency-data";

export function CapacityTable() {
  const rows = teamMembers.map((member) => {
    const assignedHours = tasksData
      .filter((task) => task.assignedTo === member.fullName)
      .reduce((sum, task) => sum + task.estimatedHours, 0);

    const available = member.weeklyCapacityHours - assignedHours;
    const utilization = (assignedHours / member.weeklyCapacityHours) * 100;

    return {
      ...member,
      assignedHours,
      available,
      utilization
    };
  });

  return (
    <div className="space-y-2">
      {rows.map((row) => (
        <div className="grid grid-cols-1 gap-2 rounded-lg border border-border bg-muted p-3 text-sm md:grid-cols-5" key={row.id}>
          <p className="font-medium">{row.fullName}</p>
          <p className="text-muted-foreground">{row.role.replace("_", " ")}</p>
          <p>Assigned: {row.assignedHours}h</p>
          <p>Available: {row.available}h</p>
          <p className={row.utilization > 90 ? "text-danger" : row.utilization > 75 ? "text-warning" : "text-success"}>Utilization: {row.utilization.toFixed(0)}%</p>
        </div>
      ))}
    </div>
  );
}
