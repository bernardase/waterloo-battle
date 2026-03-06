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

function getUnitType(id: string): "cavalry" | "infantry" | "garrison" {
  if (id.includes("cav")) return "cavalry";
  if (id.includes("hougoumont") || id.includes("lhs")) return "garrison";
  return "infantry";
}

function NatoSymbol({
  unitType,
  color,
  isRouted,
}: {
  unitType: "cavalry" | "infantry" | "garrison";
  color: string;
  isRouted: boolean;
}) {
  const opacity = isRouted ? 0.4 : 1;
  const w = 18;
  const h = 12;

  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      className="block"
      style={{ opacity }}
    >
      <rect
        x={1}
        y={1}
        width={w - 2}
        height={h - 2}
        rx={1}
        fill={color}
        stroke="white"
        strokeWidth={1.2}
      />
      {unitType === "infantry" && (
        <>
          <line x1={2} y1={2} x2={w - 2} y2={h - 2} stroke="white" strokeWidth={1} />
          <line x1={w - 2} y1={2} x2={2} y2={h - 2} stroke="white" strokeWidth={1} />
        </>
      )}
      {unitType === "cavalry" && (
        <line x1={2} y1={h - 2} x2={w - 2} y2={2} stroke="white" strokeWidth={1} />
      )}
      {unitType === "garrison" && (
        <circle cx={w / 2} cy={h / 2} r={2.5} fill="none" stroke="white" strokeWidth={1} />
      )}
    </svg>
  );
}

export function TroopMarker({ unit }: TroopMarkerProps) {
  const color = getFactionColor(unit.faction);
  const isEngaged = unit.status === "engaged";
  const isRouted = unit.status === "routed";
  const isRetreating = unit.status === "retreating";
  const isAdvancing = unit.status === "advancing";
  const unitType = getUnitType(unit.id);

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
          {/* Unit label */}
          <span
            className="text-[7px] sm:text-[8px] font-semibold whitespace-nowrap mb-0.5 pointer-events-none select-none px-0.5 rounded-sm leading-tight"
            style={{
              color,
              textShadow:
                "1px 1px 2px rgba(255,255,255,0.95), -1px -1px 2px rgba(255,255,255,0.95), 0 0 6px rgba(255,255,255,0.9)",
            }}
          >
            {unit.name.length > 18 ? unit.name.slice(0, 16) + "…" : unit.name}
          </span>

          {/* NATO symbol with engagement pulse */}
          <div className="relative group-hover:scale-110 transition-transform">
            {isEngaged && (
              <span
                className="absolute -inset-1 rounded animate-pulse-ring"
                style={{ backgroundColor: color, opacity: 0.3 }}
              />
            )}
            <NatoSymbol unitType={unitType} color={color} isRouted={isRouted} />

            {/* Direction arrow below symbol */}
            {(isRetreating || isAdvancing) && (
              <svg
                width={10}
                height={6}
                viewBox="0 0 10 6"
                className="absolute left-1/2 -translate-x-1/2"
                style={{ top: isAdvancing ? -6 : "100%" }}
              >
                {isRetreating && (
                  <path d="M2 0 L5 5 L8 0" fill="none" stroke={color} strokeWidth={1.2} strokeLinecap="round" />
                )}
                {isAdvancing && (
                  <path d="M2 5 L5 0 L8 5" fill="none" stroke={color} strokeWidth={1.2} strokeLinecap="round" />
                )}
              </svg>
            )}
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
