import { ModulePage } from "@/components/layout/module-page";
import { clients } from "@/lib/data/mock-data";

export default function ClientsPage() {
  return (
    <ModulePage title="Clients" description="Manage client records, retainers, and delivery health.">
      <div className="mt-4 space-y-2 text-sm">
        {clients.map((client) => (
          <div className="flex items-center justify-between rounded-lg border border-border px-3 py-2" key={client.id}>
            <span>{client.name}</span>
            <span className="text-muted-foreground">{client.industry} · ${client.retainer.toLocaleString()}/mo</span>
          </div>
        ))}
      </div>
    </ModulePage>
  );
}
