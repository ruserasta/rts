import { ModulePage } from "@/components/layout/module-page";
import { ClientsTable } from "@/components/modules/clients-table";
import { CreateClientForm } from "@/components/modules/create-client-form";
import { listClients } from "@/lib/data/clients-repo";

export default async function ClientsPage() {
  const { rows, source } = await listClients();

  return (
    <ModulePage title="Clients" description="Manage client records, retainers, owners, and delivery status.">
      <div className="mt-4 space-y-4">
        <div className="rounded-lg border border-border bg-card px-3 py-2 text-xs text-muted-foreground">
          Data source: {source === "supabase" ? "Supabase" : "Mock fallback"}
        </div>
        <CreateClientForm />
        <ClientsTable rows={rows} />
      </div>
    </ModulePage>
  );
}
