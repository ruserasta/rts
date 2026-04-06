import { Button } from "@/components/ui/button";
import { testCredentials } from "@/lib/data/mock-data";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,#5b21b633,#0b0d14)] p-6">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-2xl">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Welcome to</p>
        <h1 className="mt-1 text-3xl font-semibold">CAK Group</h1>
        <p className="mt-2 text-sm text-muted-foreground">Sign in to access the internal agency operating system.</p>
        <form className="mt-8 space-y-4">
          <input className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-sm" placeholder="Email" type="email" />
          <input className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-sm" placeholder="Password" type="password" />
          <Button className="w-full" type="submit">Sign in</Button>
        </form>
        <p className="mt-4 text-xs text-muted-foreground">
          Test admin: <span className="text-foreground">{testCredentials.adminEmail}</span> · Password: <span className="text-foreground">{testCredentials.defaultPassword}</span>
        </p>
      </div>
    </main>
  );
}
