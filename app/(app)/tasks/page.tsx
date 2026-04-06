import { ModulePage } from "@/components/layout/module-page";
import { CreateTaskForm } from "@/components/modules/create-task-form";
import { TasksBoard } from "@/components/modules/tasks-board";
import { listTasks } from "@/lib/data/tasks-repo";

export default async function TasksPage() {
  const { rows, source } = await listTasks();

  return (
    <ModulePage title="Tasks" description="Kanban-style task tracker with overdue highlighting and role ownership.">
      <div className="mt-4 space-y-4">
        <div className="rounded-lg border border-border bg-card px-3 py-2 text-xs text-muted-foreground">
          Data source: {source === "supabase" ? "Supabase" : "Mock fallback"}
        </div>
        <CreateTaskForm />
        <TasksBoard rows={rows} />
      </div>
    </ModulePage>
  );
}
