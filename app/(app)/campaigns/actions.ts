"use server";

import { revalidatePath } from "next/cache";
import { canAccessModule } from "@/lib/rbac/permissions";
import { createClient as createSupabaseClient } from "@/lib/supabase/server";
import { getCurrentUserRole } from "@/lib/auth/session";

export async function createCampaignAction(formData: FormData) {
  const role = await getCurrentUserRole();

  if (!canAccessModule(role, "campaigns") || !["manager", "account_manager"].includes(role)) {
    return { error: "You do not have permission to create campaigns." };
  }

  const name = String(formData.get("name") ?? "").trim();
  const clientId = String(formData.get("clientId") ?? "").trim();
  const campaignType = String(formData.get("campaignType") ?? "full_service").trim();
  const channel = String(formData.get("channel") ?? "").trim();
  const budget = Number(formData.get("budget") ?? 0);

  if (!name || !clientId) {
    return { error: "Campaign name and client are required." };
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    revalidatePath("/campaigns");
    return { success: true, warning: "Supabase env missing, campaign not persisted (mock mode)." };
  }

  try {
    const supabase = await createSupabaseClient();
    const { error } = await supabase.from("campaigns").insert({
      name,
      client_id: clientId,
      campaign_type: campaignType,
      channel: channel || null,
      budget: Number.isFinite(budget) ? budget : 0,
      actual_spend: 0,
      status: "planned"
    });

    if (error) {
      return { error: error.message };
    }

    revalidatePath("/campaigns");
    return { success: true };
  } catch {
    return { error: "Unexpected error while creating campaign." };
  }
}
