"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Briefcase, Calendar, ChartNoAxesColumn, ClipboardList, DollarSign, Gauge, LayoutDashboard, Settings, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/clients", label: "Clients", icon: Users },
  { href: "/campaigns", label: "Campaigns", icon: Briefcase },
  { href: "/content-calendar", label: "Content Calendar", icon: Calendar },
  { href: "/tasks", label: "Tasks", icon: ClipboardList },
  { href: "/crm", label: "CRM", icon: ChartNoAxesColumn },
  { href: "/budgets", label: "Budgets", icon: DollarSign },
  { href: "/team-capacity", label: "Team Capacity", icon: Gauge },
  { href: "/weekly-planner", label: "Weekly Planner", icon: Calendar },
  { href: "/reports", label: "Reports", icon: BarChart3 },
  { href: "/settings", label: "Settings", icon: Settings }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 border-r border-border bg-[#11131A] p-4">
      <div className="mb-8 px-2">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Agency OS</p>
        <h1 className="text-xl font-semibold text-white">CAK Group</h1>
      </div>
      <nav className="space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          const active = pathname === link.href;
          return (
            <Link
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition",
                active ? "bg-primary/20 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
              href={link.href}
              key={link.href}
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
