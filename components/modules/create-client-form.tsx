"use client";

import { useFormStatus } from "react-dom";
import { createClientAction } from "@/app/(app)/clients/actions";
import { useState } from "react";
import { Button } from "@/components/ui/button";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} type="submit" variant="default">
      {pending ? "Saving..." : "Add Client"}
    </Button>
  );
}

export function CreateClientForm() {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      action={async (formData) => {
        const result = await createClientAction(formData);
        if (result?.error) {
          setError(result.error);
          setMessage(null);
          return;
        }
        setError(null);
        setMessage(result?.warning ?? "Client saved successfully.");
      }}
      className="grid gap-2 rounded-lg border border-border bg-muted p-3 md:grid-cols-5"
    >
      <input className="rounded-md border border-border bg-background px-2 py-2 text-sm" name="name" placeholder="Client name" required />
      <input className="rounded-md border border-border bg-background px-2 py-2 text-sm" name="industry" placeholder="Industry" />
      <select className="rounded-md border border-border bg-background px-2 py-2 text-sm" name="serviceType">
        <option value="full_service">Full-service</option>
        <option value="paid_ads">Paid ads</option>
        <option value="social_media">Social media</option>
      </select>
      <input className="rounded-md border border-border bg-background px-2 py-2 text-sm" min={0} name="retainer" placeholder="Monthly retainer" type="number" />
      <SubmitButton />
      {error && <p className="md:col-span-5 text-xs text-danger">{error}</p>}
      {message && <p className="md:col-span-5 text-xs text-success">{message}</p>}
    </form>
  );
}
