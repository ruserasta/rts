import { Bell, Search } from "lucide-react";

export function Topbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-border px-6">
      <div className="flex items-center gap-3 rounded-lg border border-border bg-card px-3 py-2 text-sm text-muted-foreground">
        <Search className="h-4 w-4" />
        Search clients, campaigns, tasks...
      </div>
      <div className="flex items-center gap-3">
        <button className="rounded-lg border border-border bg-card p-2">
          <Bell className="h-4 w-4" />
        </button>
        <div className="rounded-full bg-primary/20 px-3 py-1 text-xs text-primary">Manager 1</div>
      </div>
    </header>
  );
}
