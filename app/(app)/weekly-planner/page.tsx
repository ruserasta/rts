import { Card } from "@/components/ui/card";

const priorities = [
  "Finalize Q2 paid ads creative for Nexa Homes",
  "Close proposal negotiations with Harbor Hotels",
  "Publish 12 social content assets across active clients"
];

const blockers = [
  "Waiting for client approvals on 3 ad creatives",
  "Photographer slot conflict for Friday shoot"
];

export default function WeeklyPlannerPage() {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold">Weekly Planner</h2>
        <p className="text-sm text-muted-foreground">Week of Apr 6, 2026 — align priorities, blockers, and owners.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <h3 className="text-sm font-medium">Top Priorities</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            {priorities.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </Card>
        <Card>
          <h3 className="text-sm font-medium">Current Blockers</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            {blockers.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </Card>
      </div>
    </section>
  );
}
