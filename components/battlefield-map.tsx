"use client";

import { TroopUnit } from "@/types";
import { TroopMarker } from "./troop-marker";

interface BattlefieldMapProps {
  troops: TroopUnit[];
}

function TerrainSVG() {
  return (
    <svg
      viewBox="0 0 100 100"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Background terrain */}
      <rect x={0} y={0} width={100} height={100} fill="#7a9a5c" />

      {/* Northern ridge (Allied position) */}
      <ellipse cx={45} cy={32} rx={40} ry={6} fill="#6d8e50" opacity={0.6} />

      {/* Southern ridge (French position) */}
      <ellipse cx={50} cy={73} rx={38} ry={5} fill="#6d8e50" opacity={0.5} />

      {/* Valley between the ridges */}
      <ellipse cx={47} cy={53} rx={42} ry={10} fill="#84a866" opacity={0.4} />

      {/* Roads */}
      <line x1={48} y1={5} x2={50} y2={95} stroke="#b8a07a" strokeWidth={0.8} strokeDasharray="2 1" />
      <line x1={48} y1={38} x2={92} y2={50} stroke="#b8a07a" strokeWidth={0.6} strokeDasharray="2 1" />
      <line x1={48} y1={38} x2={8} y2={25} stroke="#b8a07a" strokeWidth={0.6} strokeDasharray="2 1" />

      {/* Paris Wood */}
      <ellipse cx={90} cy={65} rx={8} ry={12} fill="#4a7040" opacity={0.7} />
      <text x={90} y={65} textAnchor="middle" fontSize={1.6} fill="#2d4a28" fontStyle="italic">
        Paris Wood
      </text>

      {/* Hougoumont wood */}
      <ellipse cx={25} cy={56} rx={6} ry={5} fill="#4a7040" opacity={0.6} />

      {/* Hougoumont */}
      <rect x={26} y={50.5} width={3.5} height={2.5} rx={0.3} fill="#8B7355" stroke="#6b5540" strokeWidth={0.3} />
      <text x={27.7} y={49.5} textAnchor="middle" fontSize={1.5} fill="#4a3520" fontWeight={600}>
        Hougoumont
      </text>

      {/* La Haye Sainte */}
      <rect x={46.5} y={48.5} width={3} height={2} rx={0.3} fill="#8B7355" stroke="#6b5540" strokeWidth={0.3} />
      <text x={48} y={47.5} textAnchor="middle" fontSize={1.5} fill="#4a3520" fontWeight={600}>
        La Haye Sainte
      </text>

      {/* Papelotte */}
      <rect x={66} y={44} width={2.5} height={1.8} rx={0.3} fill="#8B7355" stroke="#6b5540" strokeWidth={0.3} />
      <text x={67.2} y={43} textAnchor="middle" fontSize={1.3} fill="#4a3520">
        Papelotte
      </text>

      {/* La Belle Alliance */}
      <rect x={49} y={70} width={2.5} height={1.8} rx={0.3} fill="#8B7355" stroke="#6b5540" strokeWidth={0.3} />
      <text x={50.2} y={69} textAnchor="middle" fontSize={1.3} fill="#4a3520">
        La Belle Alliance
      </text>

      {/* Plancenoit */}
      <rect x={71} y={63} width={3} height={2.5} rx={0.3} fill="#8B7355" stroke="#6b5540" strokeWidth={0.3} />
      <text x={72.5} y={62} textAnchor="middle" fontSize={1.3} fill="#4a3520">
        Plancenoit
      </text>

      {/* Mont-Saint-Jean label */}
      <text x={48} y={24} textAnchor="middle" fontSize={1.5} fill="#4a3520" fontStyle="italic">
        Mont-Saint-Jean
      </text>

      {/* Compass */}
      <g transform="translate(8, 88)">
        <circle cx={0} cy={0} r={3} fill="white" opacity={0.5} />
        <text x={0} y={-0.8} textAnchor="middle" fontSize={2} fill="#4a3520" fontWeight={700}>
          N
        </text>
        <line x1={0} y1={-2.5} x2={0} y2={-1.5} stroke="#4a3520" strokeWidth={0.3} />
        <text x={0} y={2.2} textAnchor="middle" fontSize={1.2} fill="#4a3520">
          S
        </text>
      </g>

      {/* Bottom label */}
      <text x={50} y={97} textAnchor="middle" fontSize={1.2} fill="#4a3520" opacity={0.6}>
        Battle of Waterloo — June 18, 1815
      </text>
    </svg>
  );
}

export function BattlefieldMap({ troops }: BattlefieldMapProps) {
  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden border bg-[#7a9a5c] shadow-inner">
      {/* SVG terrain layer */}
      <TerrainSVG />

      {/* HTML overlay for troop markers (percentage-positioned) */}
      <div className="absolute inset-0">
        {troops.map((unit) => (
          <TroopMarker key={unit.id} unit={unit} />
        ))}
      </div>
    </div>
  );
}
