"use client";

import dynamic from "next/dynamic";
import { TroopUnit } from "@/types";

const LeafletMap = dynamic(() => import("./leaflet-map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full rounded-lg bg-muted animate-pulse flex items-center justify-center text-muted-foreground text-sm">
      Loading map…
    </div>
  ),
});

interface BattlefieldMapProps {
  troops: TroopUnit[];
}

export function BattlefieldMap({ troops }: BattlefieldMapProps) {
  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden border shadow-inner">
      <LeafletMap troops={troops} />
    </div>
  );
}
