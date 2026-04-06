import { ModulePage } from "@/components/layout/module-page";
import { modulePlaceholder } from "@/lib/data/mock-data";

export default function TasksPage() {
  return <ModulePage title="Tasks" description={modulePlaceholder.tasks} />;
}
