import { Role } from "@/lib/types";

export async function getCurrentUserRole(): Promise<Role> {
  return "manager";
}
