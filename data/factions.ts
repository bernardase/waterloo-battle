import { FactionConfig } from "@/types";

export const FACTIONS: FactionConfig[] = [
  {
    id: "french",
    label: "French",
    color: "#2563eb",
    darkColor: "#3b82f6",
  },
  {
    id: "allied",
    label: "Allied",
    color: "#dc2626",
    darkColor: "#ef4444",
  },
  {
    id: "prussian",
    label: "Prussian",
    color: "#1f2937",
    darkColor: "#6b7280",
  },
];

export function getFactionColor(faction: string): string {
  return FACTIONS.find((f) => f.id === faction)?.color ?? "#6b7280";
}
