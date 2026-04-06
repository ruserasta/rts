import { ReactNode } from "react";
import { Card } from "@/components/ui/card";

export function ModulePage({ title, description, children }: { title: string; description: string; children?: ReactNode }) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Card>
        <p className="text-sm text-muted-foreground">MVP module scaffold complete. Next iteration adds full create/update workflows, advanced filters, and Supabase-backed forms.</p>
        {children}
      </Card>
    </section>
  );
}
