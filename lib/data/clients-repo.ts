import { clientsData } from "@/lib/data/agency-data";
import { createClient as createSupabaseClient } from "@/lib/supabase/server";
import type { ClientRecord } from "@/lib/types/domain";

type ClientRow = {
  id: string;
  name: string;
  industry: string | null;
  service_type: string | null;
  monthly_retainer: number | null;
  status: "active" | "inactive" | "on_hold";
  owner_id: string | null;
};

function toClientRecord(row: ClientRow): ClientRecord {
  return {
    id: row.id,
    name: row.name,
    industry: row.industry ?? "Uncategorized",
    owner: row.owner_id ? "Assigned User" : "Unassigned",
    serviceType: (row.service_type as ClientRecord["serviceType"]) ?? "full_service",
    retainer: row.monthly_retainer ?? 0,
    status: row.status
  };
}

export async function listClients(): Promise<{ rows: ClientRecord[]; source: "supabase" | "mock" }> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return { rows: clientsData, source: "mock" };
  }

  try {
    const supabase = await createSupabaseClient();
    const { data, error } = await supabase
      .from("clients")
      .select("id,name,industry,service_type,monthly_retainer,status,owner_id")
      .order("created_at", { ascending: false });

    if (error || !data) {
      return { rows: clientsData, source: "mock" };
    }

    return { rows: data.map((row) => toClientRecord(row as ClientRow)), source: "supabase" };
  } catch {
    return { rows: clientsData, source: "mock" };
  }
}
