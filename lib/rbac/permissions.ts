import { Role } from "@/lib/types";

export const MODULES = [
  "dashboard",
  "clients",
  "campaigns",
  "content-calendar",
  "tasks",
  "crm",
  "budgets",
  "team-capacity",
  "weekly-planner",
  "reports",
  "settings"
] as const;

export type ModuleKey = (typeof MODULES)[number];

const permissions: Record<Role, ModuleKey[]> = {
  manager: [...MODULES],
  account_manager: ["dashboard", "clients", "campaigns", "content-calendar", "tasks", "crm", "budgets", "team-capacity", "weekly-planner", "reports", "settings"],
  graphic_designer: ["dashboard", "content-calendar", "tasks", "team-capacity"],
  video_editor: ["dashboard", "content-calendar", "tasks", "team-capacity"],
  photographer: ["dashboard", "content-calendar", "tasks", "team-capacity"]
};

export function canAccessModule(role: Role, module: ModuleKey) {
  return permissions[role].includes(module);
}
