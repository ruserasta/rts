import { tasksData } from "@/lib/data/agency-data";
import { createClient as createSupabaseClient } from "@/lib/supabase/server";
import type { TaskRecord } from "@/lib/types/domain";

type TaskRow = {
  id: string;
  title: string;
  client_id: string | null;
  campaign_id: string | null;
  assigned_user_id: string | null;
  priority: TaskRecord["priority"];
  status: TaskRecord["status"];
  due_date: string | null;
  estimated_hours: number | null;
  actual_hours: number | null;
};

function toTaskRecord(row: TaskRow): TaskRecord {
  return {
    id: row.id,
    title: row.title,
    clientId: row.client_id ?? "c1",
    campaignId: row.campaign_id ?? "cp1",
    assignedTo: row.assigned_user_id ? "Assigned User" : "Unassigned",
    priority: row.priority,
    status: row.status,
    dueDate: row.due_date ?? new Date().toISOString().slice(0, 10),
    estimatedHours: row.estimated_hours ?? 0,
    actualHours: row.actual_hours ?? 0
  };
}

export async function listTasks(): Promise<{ rows: TaskRecord[]; source: "supabase" | "mock" }> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return { rows: tasksData, source: "mock" };
  }

  try {
    const supabase = await createSupabaseClient();
    const { data, error } = await supabase
      .from("tasks")
      .select("id,title,client_id,campaign_id,assigned_user_id,priority,status,due_date,estimated_hours,actual_hours")
      .order("created_at", { ascending: false });

    if (error || !data) {
      return { rows: tasksData, source: "mock" };
    }

    return { rows: data.map((row) => toTaskRecord(row as TaskRow)), source: "supabase" };
  } catch {
    return { rows: tasksData, source: "mock" };
  }
}
