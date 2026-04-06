"use server";

import { revalidatePath } from "next/cache";
import { createClient as createSupabaseClient } from "@/lib/supabase/server";
import { canAccessModule } from "@/lib/rbac/permissions";
import { getCurrentUserRole } from "@/lib/auth/session";

export async function createClientAction(formData: FormData) {
  const role = await getCurrentUserRole();
  if (!canAccessModule(role, "clients") || !["manager", "account_manager"].includes(role)) {
    return { error: "You do not have permission to create clients." };
  }

  const name = String(formData.get("name") ?? "").trim();
  const industry = String(formData.get("industry") ?? "").trim();
  const serviceType = String(formData.get("serviceType") ?? "full_service").trim();
  const retainer = Number(formData.get("retainer") ?? 0);

  if (!name) {
    return { error: "Client name is required." };
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    revalidatePath("/clients");
    return { success: true, warning: "Supabase env missing, client not persisted (mock mode)." };
  }

  try {
    const supabase = await createSupabaseClient();
    const { error } = await supabase.from("clients").insert({
      name,
      company_name: name,
      industry: industry || null,
      service_type: serviceType,
      monthly_retainer: Number.isFinite(retainer) ? retainer : 0,
      status: "active"
    });

    if (error) {
      return { error: error.message };
    }

    revalidatePath("/clients");
    return { success: true };
  } catch {
    return { error: "Unexpected error while creating client." };
  }
}
