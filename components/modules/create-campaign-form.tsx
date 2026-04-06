"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { createCampaignAction } from "@/app/(app)/campaigns/actions";
import { clientsData } from "@/lib/data/agency-data";
import { Button } from "@/components/ui/button";

function SubmitButton() {
  const { pending } = useFormStatus();
  return <Button disabled={pending} type="submit">{pending ? "Saving..." : "Add Campaign"}</Button>;
}

export function CreateCampaignForm() {
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  return (
    <form
      action={async (formData) => {
        const result = await createCampaignAction(formData);
        if (result?.error) {
          setError(result.error);
          setMessage(null);
          return;
        }

        setError(null);
        setMessage(result?.warning ?? "Campaign saved successfully.");
      }}
      className="grid gap-2 rounded-lg border border-border bg-muted p-3 md:grid-cols-6"
    >
      <input className="rounded-md border border-border bg-background px-2 py-2 text-sm" name="name" placeholder="Campaign name" required />
      <select className="rounded-md border border-border bg-background px-2 py-2 text-sm" name="clientId" required>
        <option value="">Select client</option>
        {clientsData.map((client) => (
          <option key={client.id} value={client.id}>{client.name}</option>
        ))}
      </select>
      <select className="rounded-md border border-border bg-background px-2 py-2 text-sm" name="campaignType">
        <option value="full_service">Full-service</option>
        <option value="paid_ads">Paid ads</option>
        <option value="social_media">Social media</option>
        <option value="branding">Branding</option>
        <option value="production">Production</option>
      </select>
      <input className="rounded-md border border-border bg-background px-2 py-2 text-sm" name="channel" placeholder="Channel" />
      <input className="rounded-md border border-border bg-background px-2 py-2 text-sm" min={0} name="budget" placeholder="Budget" type="number" />
      <SubmitButton />
      {error && <p className="md:col-span-6 text-xs text-danger">{error}</p>}
      {message && <p className="md:col-span-6 text-xs text-success">{message}</p>}
    </form>
  );
}
