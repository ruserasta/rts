import { ModulePage } from "@/components/layout/module-page";
import { ClientsTable } from "@/components/modules/clients-table";

export default function ClientsPage() {
  return (
    <ModulePage title="Clients" description="Manage client records, retainers, owners, and delivery status.">
      <div className="mt-4">
        <ClientsTable />
      </div>
    </ModulePage>
  );
}
