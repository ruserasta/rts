import { ModulePage } from "@/components/layout/module-page";
import { ContentList } from "@/components/modules/content-list";

export default function ContentCalendarPage() {
  return (
    <ModulePage title="Content Calendar" description="Content production queue with platform and approval status tracking.">
      <div className="mt-4">
        <ContentList />
      </div>
    </ModulePage>
  );
}
