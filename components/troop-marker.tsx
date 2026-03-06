"use client";

import { TroopUnit } from "@/types";
import { getFactionColor } from "@/data/factions";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TroopMarkerProps {
  unit: TroopUnit;
}

export function TroopMarker({ unit }: TroopMarkerProps) {
  const color = getFactionColor(unit.faction);
  const isEngaged = unit.status === "engaged";
  const isRouted = unit.status === "routed";
  const isRetreating = unit.status === "retreating";
  const isAdvancing = unit.status === "advancing";

  return (
    <Tooltip>
      <TooltipTrigger
        className="absolute transition-all duration-700 ease-in-out -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
        style={{
          left: `${unit.x}%`,
          top: `${unit.y}%`,
        }}
      >
        <div className="relative flex flex-col items-center">
          {/* Label */}
          <span
            className="text-[8px] sm:text-[9px] font-semibold whitespace-nowrap mb-0.5 pointer-events-none select-none px-0.5 rounded-sm"
            style={{
              color,
              textShadow:
                "1px 1px 2px rgba(255,255,255,0.9), -1px -1px 2px rgba(255,255,255,0.9), 0 0 4px rgba(255,255,255,0.8)",
            }}
          >
            {unit.name.length > 18 ? unit.name.slice(0, 16) + "…" : unit.name}
          </span>

          {/* Marker dot */}
          <div className="relative">
            {isEngaged && (
              <span
                className="absolute inset-0 rounded-full animate-pulse-ring"
                style={{ backgroundColor: color, opacity: 0.4 }}
              />
            )}
            <span
              className="relative block h-3 w-3 sm:h-3.5 sm:w-3.5 rounded-full border-[1.5px] border-white shadow-sm group-hover:scale-125 transition-transform"
              style={{
                backgroundColor: color,
                opacity: isRouted ? 0.4 : 1,
              }}
            >
              {/* Direction indicator */}
              {isRetreating && (
                <svg
                  viewBox="0 0 10 10"
                  className="absolute inset-0 w-full h-full"
                >
                  <path
                    d="M2 3 L5 7 L8 3"
                    fill="none"
                    stroke="white"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                  />
                </svg>
              )}
              {isAdvancing && (
                <svg
                  viewBox="0 0 10 10"
                  className="absolute inset-0 w-full h-full"
                >
                  <path
                    d="M2 7 L5 3 L8 7"
                    fill="none"
                    stroke="white"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </span>
          </div>
        </div>
      </TooltipTrigger>
      <TooltipContent side="top" sideOffset={8}>
        <div className="space-y-1 max-w-[220px]">
          <div className="font-semibold">{unit.name}</div>
          {unit.commander !== "—" && (
            <div className="opacity-70">Cmd: {unit.commander}</div>
          )}
          <div className="opacity-70">
            {unit.strength} &middot;{" "}
            <span className="capitalize">{unit.status}</span>
          </div>
          <div className="opacity-90">{unit.tooltip}</div>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
