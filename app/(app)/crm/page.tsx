import { ModulePage } from "@/components/layout/module-page";
import { CrmPipeline } from "@/components/modules/crm-pipeline";

export default function CrmPage() {
  return (
    <ModulePage title="CRM Pipeline" description="Pipeline by stage with weighted value visibility and owner context.">
      <div className="mt-4">
        <CrmPipeline />
      </div>
    </ModulePage>
  );
}
