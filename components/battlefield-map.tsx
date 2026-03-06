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
      <defs>
        {/* Terrain noise for organic feel */}
        <filter id="terrain-noise" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="1.2"
            numOctaves={4}
            seed={2}
            result="noise"
          />
          <feColorMatrix
            type="saturate"
            values="0"
            in="noise"
            result="grey"
          />
          <feBlend in="SourceGraphic" in2="grey" mode="soft-light" />
        </filter>

        {/* Ridge hillshading — northwest light source */}
        <radialGradient id="ridge-n" cx="45%" cy="30%">
          <stop offset="0%" stopColor="#5c7a42" stopOpacity={0.5} />
          <stop offset="60%" stopColor="#6d8e50" stopOpacity={0.3} />
          <stop offset="100%" stopColor="#7a9a5c" stopOpacity={0} />
        </radialGradient>

        <radialGradient id="ridge-s" cx="50%" cy="40%">
          <stop offset="0%" stopColor="#5c7a42" stopOpacity={0.4} />
          <stop offset="60%" stopColor="#6d8e50" stopOpacity={0.2} />
          <stop offset="100%" stopColor="#7a9a5c" stopOpacity={0} />
        </radialGradient>

        {/* Forest texture */}
        <pattern id="forest-dots" width="2" height="2" patternUnits="userSpaceOnUse">
          <circle cx={0.5} cy={0.5} r={0.6} fill="#3d6335" opacity={0.4} />
          <circle cx={1.5} cy={1.5} r={0.5} fill="#2d5028" opacity={0.3} />
        </pattern>

        {/* Field pattern — faint diagonal lines */}
        <pattern id="field-lines" width="1.5" height="1.5" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
          <line x1={0} y1={0} x2={0} y2={1.5} stroke="#8a9e5c" strokeWidth={0.15} opacity={0.4} />
        </pattern>
      </defs>

      {/* ── Base terrain with noise texture ── */}
      <rect x={0} y={0} width={100} height={100} fill="#7a9a5c" filter="url(#terrain-noise)" />

      {/* ── Elevation: contour bands on northern ridge (Allied) ── */}
      <ellipse cx={45} cy={32} rx={42} ry={8} fill="url(#ridge-n)" />
      <ellipse cx={45} cy={32} rx={38} ry={6} fill="none" stroke="#5a7a40" strokeWidth={0.15} opacity={0.35} />
      <ellipse cx={45} cy={32} rx={34} ry={4.5} fill="none" stroke="#5a7a40" strokeWidth={0.12} opacity={0.25} />
      <ellipse cx={45} cy={32} rx={30} ry={3} fill="none" stroke="#5a7a40" strokeWidth={0.1} opacity={0.2} />

      {/* ── Elevation: contour bands on southern ridge (French) ── */}
      <ellipse cx={50} cy={73} rx={40} ry={7} fill="url(#ridge-s)" />
      <ellipse cx={50} cy={73} rx={36} ry={5.5} fill="none" stroke="#5a7a40" strokeWidth={0.15} opacity={0.3} />
      <ellipse cx={50} cy={73} rx={32} ry={4} fill="none" stroke="#5a7a40" strokeWidth={0.12} opacity={0.2} />

      {/* ── Valley (lighter, lower ground) ── */}
      <ellipse cx={47} cy={53} rx={42} ry={10} fill="#84a866" opacity={0.25} />

      {/* ── Field / crop patches ── */}
      <rect x={32} y={42} width={10} height={7} fill="url(#field-lines)" opacity={0.5} rx={1} />
      <rect x={55} y={44} width={8} height={6} fill="url(#field-lines)" opacity={0.4} rx={1} />
      <rect x={18} y={40} width={7} height={5} fill="#8a9e5c" opacity={0.2} rx={0.8} />
      <rect x={60} y={56} width={6} height={4} fill="url(#field-lines)" opacity={0.35} rx={0.8} />
      <rect x={35} y={60} width={9} height={5} fill="#8a9e5c" opacity={0.15} rx={1} />
      <rect x={42} y={78} width={7} height={4} fill="url(#field-lines)" opacity={0.3} rx={0.8} />

      {/* ── Ohain sunken lane (east–west along Allied ridge) ── */}
      <path
        d="M 12 37 Q 25 34 38 36 Q 48 38 58 36 Q 68 34 78 37"
        fill="none"
        stroke="#6b5a3a"
        strokeWidth={0.5}
        strokeDasharray="1.5 0.8"
        opacity={0.6}
      />
      <text x={14} y={35.5} fontSize={0.9} fill="#5a4a30" fontStyle="italic" opacity={0.7}>
        Ohain Road
      </text>

      {/* ── Streams ── */}
      {/* River Lasne (east side, flowing south) */}
      <path
        d="M 78 30 Q 80 40 82 48 Q 83 55 80 62 Q 78 68 76 75"
        fill="none"
        stroke="#6b9fc4"
        strokeWidth={0.4}
        strokeLinecap="round"
        opacity={0.6}
      />
      <text x={83} y={50} fontSize={0.8} fill="#4a7a9a" fontStyle="italic" opacity={0.6}>
        R. Lasne
      </text>

      {/* Small brook in valley */}
      <path
        d="M 30 52 Q 38 54 46 52 Q 54 50 62 53"
        fill="none"
        stroke="#6b9fc4"
        strokeWidth={0.25}
        strokeLinecap="round"
        opacity={0.4}
      />

      {/* ── Roads ── */}
      {/* Brussels road (main N–S) */}
      <path
        d="M 47 5 Q 47.5 20 48 35 Q 48.5 50 49 65 Q 49.5 80 50 95"
        fill="none"
        stroke="#b8a07a"
        strokeWidth={0.9}
        strokeDasharray="2.5 1"
      />
      <text x={44} y={12} fontSize={0.9} fill="#8a7a5a" fontStyle="italic" opacity={0.6}>
        Brussels Road
      </text>

      {/* Wavre road (east) */}
      <path
        d="M 48 37 Q 60 40 72 44 Q 82 47 92 50"
        fill="none"
        stroke="#b8a07a"
        strokeWidth={0.6}
        strokeDasharray="2 1"
      />

      {/* Nivelles road (west) */}
      <path
        d="M 48 37 Q 35 33 22 28 Q 14 25 8 23"
        fill="none"
        stroke="#b8a07a"
        strokeWidth={0.6}
        strokeDasharray="2 1"
      />

      {/* Road to Charleroi (south) */}
      <path
        d="M 50 95 Q 52 88 55 82"
        fill="none"
        stroke="#b8a07a"
        strokeWidth={0.5}
        strokeDasharray="1.5 0.8"
        opacity={0.7}
      />

      {/* ── Forests ── */}
      {/* Bois de Paris (Paris Wood) — east */}
      <ellipse cx={90} cy={62} rx={7} ry={14} fill="#3d6335" opacity={0.5} />
      <ellipse cx={90} cy={62} rx={7} ry={14} fill="url(#forest-dots)" />
      <ellipse cx={90} cy={62} rx={6} ry={12} fill="none" stroke="#2d5028" strokeWidth={0.2} opacity={0.4} />
      <text x={90} y={62} textAnchor="middle" fontSize={1.3} fill="#1d3a18" fontStyle="italic" fontWeight={500}>
        Bois de
      </text>
      <text x={90} y={64} textAnchor="middle" fontSize={1.3} fill="#1d3a18" fontStyle="italic" fontWeight={500}>
        Paris
      </text>

      {/* Bois d'Ohain — northeast */}
      <ellipse cx={75} cy={32} rx={5} ry={6} fill="#3d6335" opacity={0.4} />
      <ellipse cx={75} cy={32} rx={5} ry={6} fill="url(#forest-dots)" />
      <text x={75} y={28} textAnchor="middle" fontSize={0.9} fill="#1d3a18" fontStyle="italic" opacity={0.6}>
        Bois d&#39;Ohain
      </text>

      {/* Hougoumont woods/orchard */}
      <ellipse cx={24} cy={55} rx={5} ry={4.5} fill="#3d6335" opacity={0.45} />
      <ellipse cx={24} cy={55} rx={5} ry={4.5} fill="url(#forest-dots)" />
      {/* Orchard south of Hougoumont */}
      <ellipse cx={27} cy={58} rx={2.5} ry={2} fill="#5a8040" opacity={0.3} />
      <circle cx={26} cy={57.5} r={0.3} fill="#3d6335" opacity={0.5} />
      <circle cx={27.5} cy={58} r={0.3} fill="#3d6335" opacity={0.5} />
      <circle cx={26.8} cy={58.8} r={0.3} fill="#3d6335" opacity={0.5} />
      <circle cx={28} cy={57.2} r={0.3} fill="#3d6335" opacity={0.4} />

      {/* ── Buildings (detailed footprints) ── */}

      {/* Hougoumont — walled compound with courtyard */}
      <g>
        {/* Main building */}
        <rect x={25.5} y={50} width={2.2} height={1.8} rx={0.15} fill="#7a6548" stroke="#5a4a30" strokeWidth={0.25} />
        {/* South wing */}
        <rect x={25.5} y={51.8} width={1.2} height={1} rx={0.1} fill="#7a6548" stroke="#5a4a30" strokeWidth={0.2} />
        {/* East wing */}
        <rect x={27.7} y={50} width={0.8} height={2.8} rx={0.1} fill="#7a6548" stroke="#5a4a30" strokeWidth={0.2} />
        {/* Courtyard wall */}
        <rect x={25.3} y={49.8} width={3.5} height={4.2} rx={0.2} fill="none" stroke="#5a4a30" strokeWidth={0.2} strokeDasharray="0.4 0.3" />
        {/* Garden wall north */}
        <rect x={25} y={48.5} width={4} height={1.5} rx={0.15} fill="#6a8a50" opacity={0.25} stroke="#5a7a40" strokeWidth={0.15} />
        <text x={27} y={48} textAnchor="middle" fontSize={1.4} fill="#3a2a10" fontWeight={600}>
          Hougoumont
        </text>
      </g>

      {/* La Haye Sainte — fortified farmhouse */}
      <g>
        <rect x={46.2} y={48.2} width={2} height={1.2} rx={0.1} fill="#7a6548" stroke="#5a4a30" strokeWidth={0.25} />
        <rect x={46.2} y={49.4} width={1} height={0.8} rx={0.1} fill="#7a6548" stroke="#5a4a30" strokeWidth={0.2} />
        {/* Farmyard wall */}
        <rect x={46} y={48} width={2.8} height={2.5} rx={0.15} fill="none" stroke="#5a4a30" strokeWidth={0.18} strokeDasharray="0.3 0.2" />
        <text x={48} y={47.2} textAnchor="middle" fontSize={1.3} fill="#3a2a10" fontWeight={600}>
          La Haye Sainte
        </text>
      </g>

      {/* Papelotte */}
      <g>
        <rect x={66} y={43.5} width={1.8} height={1.2} rx={0.1} fill="#7a6548" stroke="#5a4a30" strokeWidth={0.2} />
        <rect x={67.8} y={43.8} width={0.7} height={0.7} rx={0.1} fill="#7a6548" stroke="#5a4a30" strokeWidth={0.15} />
        <text x={67.2} y={42.8} textAnchor="middle" fontSize={1.1} fill="#3a2a10" fontWeight={500}>
          Papelotte
        </text>
      </g>

      {/* Frichermont */}
      <g>
        <rect x={72} y={40} width={1.3} height={1} rx={0.1} fill="#7a6548" stroke="#5a4a30" strokeWidth={0.15} />
        <text x={72.6} y={39.3} textAnchor="middle" fontSize={0.9} fill="#3a2a10" opacity={0.7}>
          Frichermont
        </text>
      </g>

      {/* La Belle Alliance */}
      <g>
        <rect x={49} y={69.5} width={2} height={1.3} rx={0.1} fill="#7a6548" stroke="#5a4a30" strokeWidth={0.2} />
        <rect x={48.5} y={69.3} width={3} height={1.8} rx={0.15} fill="none" stroke="#5a4a30" strokeWidth={0.15} strokeDasharray="0.3 0.2" />
        <text x={50} y={68.5} textAnchor="middle" fontSize={1.2} fill="#3a2a10" fontWeight={500}>
          La Belle Alliance
        </text>
      </g>

      {/* Plancenoit — village (cluster of buildings) */}
      <g>
        <rect x={70.5} y={63} width={1.8} height={1.3} rx={0.1} fill="#7a6548" stroke="#5a4a30" strokeWidth={0.2} />
        <rect x={72.5} y={63.2} width={1.3} height={1} rx={0.1} fill="#7a6548" stroke="#5a4a30" strokeWidth={0.18} />
        <rect x={71} y={64.5} width={1.5} height={0.8} rx={0.1} fill="#7a6548" stroke="#5a4a30" strokeWidth={0.15} />
        {/* Church marker */}
        <circle cx={72.2} cy={63.7} r={0.3} fill="none" stroke="#5a4a30" strokeWidth={0.15} />
        <text x={72} y={62} textAnchor="middle" fontSize={1.2} fill="#3a2a10" fontWeight={500}>
          Plancenoit
        </text>
      </g>

      {/* Rossomme */}
      <g>
        <rect x={48} y={82} width={1.5} height={1} rx={0.1} fill="#7a6548" stroke="#5a4a30" strokeWidth={0.15} />
        <text x={48.7} y={81.3} textAnchor="middle" fontSize={0.9} fill="#3a2a10" opacity={0.7}>
          Rossomme
        </text>
      </g>

      {/* Mont-Saint-Jean (village at north) */}
      <g>
        <rect x={46.5} y={23.5} width={1.5} height={1} rx={0.1} fill="#7a6548" stroke="#5a4a30" strokeWidth={0.15} />
        <rect x={48.2} y={23.8} width={1} height={0.7} rx={0.1} fill="#7a6548" stroke="#5a4a30" strokeWidth={0.12} />
        <text x={48} y={22.5} textAnchor="middle" fontSize={1.3} fill="#3a2a10" fontStyle="italic" fontWeight={500}>
          Mont-Saint-Jean
        </text>
      </g>

      {/* ── Compass ── */}
      <g transform="translate(10, 85)">
        <circle cx={0} cy={0} r={6.5} fill="white" fillOpacity={0.95} stroke="#5a4a3a" strokeWidth={0.4} />
        <path d="M 0 -3.2 L -0.45 1 L 0.45 1 Z" fill="#2d3a2d" stroke="none" />
        <text x={0} y={-4} textAnchor="middle" fontSize={1.4} fill="#2d3a2d" fontWeight={700}>
          N
        </text>
        <text x={0} y={3.6} textAnchor="middle" fontSize={1.1} fill="#4a5a4a" fontWeight={500}>
          S
        </text>
        <text x={3.8} y={0.35} textAnchor="middle" fontSize={1} fill="#4a5a4a" fontWeight={500}>
          E
        </text>
        <text x={-3.8} y={0.35} textAnchor="middle" fontSize={1} fill="#4a5a4a" fontWeight={500}>
          W
        </text>
      </g>

      {/* ── Scale bar ── */}
      <g transform="translate(78, 93)">
        <rect x={0} y={0} width={16} height={2.5} rx={0.4} fill="white" fillOpacity={0.9} stroke="#5a4a3a" strokeWidth={0.2} />
        <line x1={2} y1={1.8} x2={14} y2={1.8} stroke="#3a2a1a" strokeWidth={0.3} />
        <line x1={2} y1={1.3} x2={2} y2={1.8} stroke="#3a2a1a" strokeWidth={0.2} />
        <line x1={8} y1={1.3} x2={8} y2={1.8} stroke="#3a2a1a" strokeWidth={0.2} />
        <line x1={14} y1={1.3} x2={14} y2={1.8} stroke="#3a2a1a" strokeWidth={0.2} />
        <text x={2} y={1} textAnchor="middle" fontSize={0.7} fill="#3a2a1a">0</text>
        <text x={8} y={1} textAnchor="middle" fontSize={0.7} fill="#3a2a1a">500m</text>
        <text x={14} y={1} textAnchor="middle" fontSize={0.7} fill="#3a2a1a">1km</text>
      </g>

      {/* ── Bottom title ── */}
      <text x={50} y={98} textAnchor="middle" fontSize={1.2} fill="#4a3520" opacity={0.5}>
        Battle of Waterloo — June 18, 1815
      </text>
    </svg>
  );
}

export function BattlefieldMap({ troops }: BattlefieldMapProps) {
  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden border bg-[#7a9a5c] shadow-inner">
      <TerrainSVG />

      <div className="absolute inset-0">
        {troops.map((unit) => (
          <TroopMarker key={unit.id} unit={unit} />
        ))}
      </div>
    </div>
  );
}
