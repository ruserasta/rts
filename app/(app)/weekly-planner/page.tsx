import { ModulePage } from "@/components/layout/module-page";
import { modulePlaceholder } from "@/lib/data/mock-data";

export default function WeeklyPlannerPage() {
  return <ModulePage title="Weekly Planner" description={modulePlaceholder.weekly} />;
}
