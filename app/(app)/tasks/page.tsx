import { ModulePage } from "@/components/layout/module-page";
import { TasksBoard } from "@/components/modules/tasks-board";

export default function TasksPage() {
  return (
    <ModulePage title="Tasks" description="Kanban-style task tracker with overdue highlighting and role ownership.">
      <div className="mt-4">
        <TasksBoard />
      </div>
    </ModulePage>
  );
}
