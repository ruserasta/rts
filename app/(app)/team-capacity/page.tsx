import { ModulePage } from "@/components/layout/module-page";
import { CapacityTable } from "@/components/modules/capacity-table";

export default function TeamCapacityPage() {
  return (
    <ModulePage title="Team Capacity" description="Weekly workload capacity based on assigned task estimates.">
      <div className="mt-4">
        <CapacityTable />
      </div>
    </ModulePage>
  );
}
