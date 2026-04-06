import { campaignsData } from "@/lib/data/agency-data";
import { createClient as createSupabaseClient } from "@/lib/supabase/server";
import type { CampaignRecord } from "@/lib/types/domain";

type CampaignRow = {
  id: string;
  name: string;
  client_id: string;
  campaign_type: CampaignRecord["type"];
  channel: string | null;
  budget: number | null;
  actual_spend: number | null;
  status: CampaignRecord["status"];
};

function toCampaignRecord(row: CampaignRow): CampaignRecord {
  return {
    id: row.id,
    name: row.name,
    clientId: row.client_id,
    type: row.campaign_type,
    channel: row.channel ?? "Unspecified",
    budget: row.budget ?? 0,
    spend: row.actual_spend ?? 0,
    owner: "Assigned Owner",
    status: row.status
  };
}

export async function listCampaigns(): Promise<{ rows: CampaignRecord[]; source: "supabase" | "mock" }> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return { rows: campaignsData, source: "mock" };
  }

  try {
    const supabase = await createSupabaseClient();
    const { data, error } = await supabase
      .from("campaigns")
      .select("id,name,client_id,campaign_type,channel,budget,actual_spend,status")
      .order("created_at", { ascending: false });

    if (error || !data) {
      return { rows: campaignsData, source: "mock" };
    }

    return { rows: data.map((row) => toCampaignRecord(row as CampaignRow)), source: "supabase" };
  } catch {
    return { rows: campaignsData, source: "mock" };
  }
}
