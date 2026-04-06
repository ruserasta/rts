import { Card } from "@/components/ui/card";
import { workspaceModes } from "@/lib/data/mock-data";

export default function SettingsPage() {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold">Settings</h2>
        <p className="text-sm text-muted-foreground">Configure agency mode presets and workspace defaults.</p>
      </div>
      <Card>
        <h3 className="text-sm font-medium">Agency Modes</h3>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          {workspaceModes.map((mode) => (
            <div className="rounded-lg border border-border p-3" key={mode.value}>
              <p className="font-medium">{mode.label}</p>
              <p className="mt-1 text-xs text-muted-foreground">{mode.description}</p>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}
