import { ModulePage } from "@/components/layout/module-page";
import { modulePlaceholder } from "@/lib/data/mock-data";

export default function ContentCalendarPage() {
  return <ModulePage title="Content Calendar" description={modulePlaceholder.content} />;
}
