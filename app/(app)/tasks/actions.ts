"use server";

import { revalidatePath } from "next/cache";
import { canAccessModule } from "@/lib/rbac/permissions";
import { createClient as createSupabaseClient } from "@/lib/supabase/server";
import { getCurrentUserRole } from "@/lib/auth/session";

export async function createTaskAction(formData: FormData) {
  const role = await getCurrentUserRole();

  if (!canAccessModule(role, "tasks") || !["manager", "account_manager"].includes(role)) {
    return { error: "You do not have permission to create tasks." };
  }

  const title = String(formData.get("title") ?? "").trim();
  const clientId = String(formData.get("clientId") ?? "").trim();
  const campaignId = String(formData.get("campaignId") ?? "").trim();
  const dueDate = String(formData.get("dueDate") ?? "").trim();
  const priority = String(formData.get("priority") ?? "medium").trim();
  const estimatedHours = Number(formData.get("estimatedHours") ?? 0);

  if (!title) {
    return { error: "Task title is required." };
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    revalidatePath("/tasks");
    return { success: true, warning: "Supabase env missing, task not persisted (mock mode)." };
  }

  try {
    const supabase = await createSupabaseClient();
    const { error } = await supabase.from("tasks").insert({
      title,
      client_id: clientId || null,
      campaign_id: campaignId || null,
      priority,
      status: "todo",
      due_date: dueDate || null,
      estimated_hours: Number.isFinite(estimatedHours) ? estimatedHours : 0,
      actual_hours: 0
    });

    if (error) {
      return { error: error.message };
    }

    revalidatePath("/tasks");
    return { success: true };
  } catch {
    return { error: "Unexpected error while creating task." };
  }
}
