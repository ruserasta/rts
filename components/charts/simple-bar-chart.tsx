"use client";

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card } from "@/components/ui/card";

export function SimpleBarChart({ title, data }: { title: string; data: { name: string; value: number }[] }) {
  return (
    <Card className="h-[320px]">
      <h3 className="mb-4 text-sm font-medium">{title}</h3>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data}>
          <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} />
          <YAxis stroke="#9CA3AF" fontSize={12} />
          <Tooltip cursor={{ fill: "#1f2432" }} />
          <Bar dataKey="value" fill="#8B5CF6" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
