import { FACTIONS } from "@/data/factions";

export function Legend() {
  return (
    <div className="flex items-center gap-4">
      {FACTIONS.map((faction) => (
        <div key={faction.id} className="flex items-center gap-1.5">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: faction.color }}
          />
          <span className="text-xs text-muted-foreground">{faction.label}</span>
        </div>
      ))}
    </div>
  );
}
