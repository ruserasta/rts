"use client";

import { isBefore, parseISO } from "date-fns";
import { tasksData, getClientName } from "@/lib/data/agency-data";

const columns = ["todo", "in_progress", "waiting_review", "done"] as const;

export function TasksBoard() {
  const now = new Date();

  return (
    <div className="grid gap-4 xl:grid-cols-4">
      {columns.map((column) => (
        <div className="rounded-xl border border-border bg-card p-3" key={column}>
          <h3 className="mb-3 text-sm font-medium capitalize">{column.replace("_", " ")}</h3>
          <div className="space-y-2">
            {tasksData.filter((task) => task.status === column).map((task) => {
              const overdue = isBefore(parseISO(task.dueDate), now) && task.status !== "done";
              return (
                <div className="rounded-lg border border-border bg-muted p-3 text-xs" key={task.id}>
                  <p className="font-medium text-foreground">{task.title}</p>
                  <p className="mt-1 text-muted-foreground">{getClientName(task.clientId)} · {task.assignedTo}</p>
                  <p className={`mt-1 ${overdue ? "text-danger" : "text-muted-foreground"}`}>Due {task.dueDate}</p>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
