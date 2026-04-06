"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { createTaskAction } from "@/app/(app)/tasks/actions";
import { campaignsData, clientsData } from "@/lib/data/agency-data";
import { Button } from "@/components/ui/button";

function SubmitButton() {
  const { pending } = useFormStatus();
  return <Button disabled={pending} type="submit">{pending ? "Saving..." : "Add Task"}</Button>;
}

export function CreateTaskForm() {
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  return (
    <form
      action={async (formData) => {
        const result = await createTaskAction(formData);
        if (result?.error) {
          setError(result.error);
          setMessage(null);
          return;
        }

        setError(null);
        setMessage(result?.warning ?? "Task saved successfully.");
      }}
      className="grid gap-2 rounded-lg border border-border bg-muted p-3 md:grid-cols-7"
    >
      <input className="rounded-md border border-border bg-background px-2 py-2 text-sm" name="title" placeholder="Task title" required />
      <select className="rounded-md border border-border bg-background px-2 py-2 text-sm" name="clientId">
        <option value="">Client</option>
        {clientsData.map((client) => <option key={client.id} value={client.id}>{client.name}</option>)}
      </select>
      <select className="rounded-md border border-border bg-background px-2 py-2 text-sm" name="campaignId">
        <option value="">Campaign</option>
        {campaignsData.map((campaign) => <option key={campaign.id} value={campaign.id}>{campaign.name}</option>)}
      </select>
      <select className="rounded-md border border-border bg-background px-2 py-2 text-sm" name="priority">
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
        <option value="urgent">Urgent</option>
      </select>
      <input className="rounded-md border border-border bg-background px-2 py-2 text-sm" name="dueDate" type="date" />
      <input className="rounded-md border border-border bg-background px-2 py-2 text-sm" min={0} name="estimatedHours" placeholder="Est. hrs" type="number" />
      <SubmitButton />
      {error && <p className="md:col-span-7 text-xs text-danger">{error}</p>}
      {message && <p className="md:col-span-7 text-xs text-success">{message}</p>}
    </form>
  );
}
