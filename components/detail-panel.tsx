"use client";

import { TimelinePhase } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Cloud, Users, Swords } from "lucide-react";
import { cn } from "@/lib/utils";

interface DetailPanelProps {
  event: TimelinePhase;
  isOpen: boolean;
}

function FactionRow({
  label,
  strength,
  colorClass,
}: {
  label: string;
  strength: string;
  colorClass: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span
        className={cn("mt-1.5 h-2.5 w-2.5 rounded-full shrink-0", colorClass)}
      />
      <div className="min-w-0">
        <div className="text-sm font-medium">{label}</div>
        <div className="text-xs text-muted-foreground">{strength}</div>
      </div>
    </div>
  );
}

function PanelContent({ event }: { event: TimelinePhase }) {
  return (
    <div className="space-y-5">
      {/* Phase header */}
      <div>
        <Badge variant="secondary" className="mb-2 text-xs">
          {event.phase}
        </Badge>
        <h2 className="text-lg font-semibold tracking-tight leading-snug">
          {event.title}
        </h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          {event.time} &middot; June 18, 1815
        </p>
      </div>

      <Separator />

      {/* Weather */}
      <Card className="bg-muted/50 shadow-none">
        <CardContent className="p-3.5 flex items-start gap-3">
          <Cloud className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
          <span className="text-sm leading-relaxed">{event.weather}</span>
        </CardContent>
      </Card>

      {/* Overview */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Swords className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold">Battle Overview</h3>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {event.overview}
        </p>
      </div>

      <Separator />

      {/* Key events */}
      <div>
        <h3 className="text-sm font-semibold mb-2.5">Key Events</h3>
        <div className="pl-4 space-y-2.5">
          {event.keyEvents.map((evt, i) => (
            <div key={i} className="flex gap-3 text-sm">
              <span className="shrink-0 mt-1 h-1.5 w-1.5 rounded-full bg-foreground/25" />
              <span className="text-muted-foreground leading-relaxed">
                {evt}
              </span>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Troop strength */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Users className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold">Force Summary</h3>
        </div>
        <div className="space-y-3">
          <FactionRow
            label="French"
            strength={event.troopStrength.french}
            colorClass="bg-blue-600"
          />
          <FactionRow
            label="Anglo-Allied"
            strength={event.troopStrength.allied}
            colorClass="bg-red-600"
          />
          <FactionRow
            label="Prussian"
            strength={event.troopStrength.prussian}
            colorClass="bg-gray-800"
          />
        </div>
      </div>
    </div>
  );
}

export function DetailPanel({ event, isOpen }: DetailPanelProps) {
  return (
    <div
      className={cn(
        "h-full border-l bg-background transition-all duration-300 ease-in-out overflow-hidden shrink-0",
        isOpen ? "w-[360px]" : "w-0 border-l-0"
      )}
    >
      <ScrollArea className="h-full">
        <div className="p-5 min-w-[360px]">
          <PanelContent event={event} />
        </div>
      </ScrollArea>
    </div>
  );
}
