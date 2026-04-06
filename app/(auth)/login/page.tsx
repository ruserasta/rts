"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { testCredentials } from "@/lib/data/mock-data";

export default function LoginPage() {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState(testCredentials.adminEmail);
  const [password, setPassword] = useState(testCredentials.defaultPassword);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    setLoading(false);

    if (authError) {
      setError(authError.message);
      return;
    }

    router.replace("/dashboard");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,#5b21b633,#0b0d14)] p-6">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-2xl">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Welcome to</p>
        <h1 className="mt-1 text-3xl font-semibold">CAK Group</h1>
        <p className="mt-2 text-sm text-muted-foreground">Sign in to access the internal agency operating system.</p>
        <form className="mt-8 space-y-4" onSubmit={onSubmit}>
          <input
            className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-sm"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            required
            type="email"
            value={email}
          />
          <input
            className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-sm"
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            required
            type="password"
            value={password}
          />
          <Button className="w-full" disabled={loading} type="submit">
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
        {error && <p className="mt-3 text-xs text-danger">{error}</p>}
        <p className="mt-4 text-xs text-muted-foreground">
          Test admin: <span className="text-foreground">{testCredentials.adminEmail}</span> · Password: <span className="text-foreground">{testCredentials.defaultPassword}</span>
        </p>
      </div>
    </main>
  );
}
