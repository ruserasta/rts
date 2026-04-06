import { ModulePage } from "@/components/layout/module-page";
import { modulePlaceholder, teamMembers } from "@/lib/data/mock-data";

export default function TeamCapacityPage() {
  return (
    <ModulePage title="Team Capacity" description={modulePlaceholder.capacity}>
      <div className="mt-4 space-y-2 text-sm">
        {teamMembers.map((user) => (
          <div className="flex items-center justify-between rounded-lg border border-border px-3 py-2" key={user.id}>
            <span>{user.fullName}</span>
            <span className="text-muted-foreground">{user.role.replace("_", " ")} · {user.weeklyCapacityHours}h/week</span>
          </div>
        ))}
      </div>
    </ModulePage>
  );
}
