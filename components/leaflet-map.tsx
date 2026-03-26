"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Tooltip, useMap, LayersControl } from "react-leaflet";
import { TroopUnit } from "@/types";
import { getFactionColor } from "@/data/factions";

interface LeafletMapProps {
  troops: TroopUnit[];
}

const BATTLEFIELD_CENTER: L.LatLngTuple = [50.678, 4.410];
const BATTLEFIELD_BOUNDS: L.LatLngBoundsExpression = [
  [50.658, 4.370],
  [50.698, 4.450],
];

const LOCATIONS: { name: string; lat: number; lng: number; type: "building" | "village" }[] = [
  { name: "Hougoumont", lat: 50.673, lng: 4.388, type: "building" },
  { name: "La Haye Sainte", lat: 50.678, lng: 4.408, type: "building" },
  { name: "La Belle Alliance", lat: 50.670, lng: 4.413, type: "building" },
  { name: "Papelotte", lat: 50.681, lng: 4.422, type: "building" },
  { name: "Plancenoit", lat: 50.670, lng: 4.430, type: "village" },
  { name: "Mont-Saint-Jean", lat: 50.685, lng: 4.408, type: "village" },
  { name: "Rossomme", lat: 50.664, lng: 4.410, type: "building" },
];

function getUnitType(id: string): "cavalry" | "infantry" | "garrison" {
  if (id.includes("cav")) return "cavalry";
  if (id.includes("hougoumont") || id.includes("lhs")) return "garrison";
  return "infantry";
}

function createNatoSvg(unitType: "cavalry" | "infantry" | "garrison", color: string, isRouted: boolean) {
  const opacity = isRouted ? 0.4 : 1;
  const w = 22;
  const h = 14;
  let innerSvg = "";
  if (unitType === "infantry") {
    innerSvg = `<line x1="2" y1="2" x2="${w - 2}" y2="${h - 2}" stroke="white" stroke-width="1.2"/>
                <line x1="${w - 2}" y1="2" x2="2" y2="${h - 2}" stroke="white" stroke-width="1.2"/>`;
  } else if (unitType === "cavalry") {
    innerSvg = `<line x1="2" y1="${h - 2}" x2="${w - 2}" y2="2" stroke="white" stroke-width="1.2"/>`;
  } else {
    innerSvg = `<circle cx="${w / 2}" cy="${h / 2}" r="3" fill="none" stroke="white" stroke-width="1.2"/>`;
  }
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" style="opacity:${opacity}">
    <rect x="1" y="1" width="${w - 2}" height="${h - 2}" rx="1.5" fill="${color}" stroke="white" stroke-width="1.2"/>
    ${innerSvg}
  </svg>`;
}

function createTroopIcon(unit: TroopUnit) {
  const color = getFactionColor(unit.faction);
  const isRouted = unit.status === "routed";
  const unitType = getUnitType(unit.id);
  const natoSvg = createNatoSvg(unitType, color, isRouted);
  const label = unit.name.length > 18 ? unit.name.slice(0, 16) + "…" : unit.name;

  const isEngaged = unit.status === "engaged";
  const pulseHtml = isEngaged
    ? `<span style="position:absolute;inset:-3px;border-radius:4px;background:${color};opacity:0.3;" class="animate-pulse-ring"></span>`
    : "";

  return L.divIcon({
    className: "",
    iconAnchor: [11, 7],
    html: `
      <div style="display:flex;flex-direction:column;align-items:center;cursor:pointer;position:relative;">
        <span style="font-size:8px;font-weight:600;white-space:nowrap;margin-bottom:1px;color:${color};text-shadow:1px 1px 2px rgba(255,255,255,0.95),-1px -1px 2px rgba(255,255,255,0.95),0 0 6px rgba(255,255,255,0.9);pointer-events:none;user-select:none;">${label}</span>
        <div style="position:relative;">
          ${pulseHtml}
          ${natoSvg}
        </div>
      </div>
    `,
  });
}

function createLocationIcon(type: "building" | "village") {
  const size = type === "village" ? 8 : 6;
  return L.divIcon({
    className: "",
    iconAnchor: [size / 2, size / 2],
    html: `<div style="width:${size}px;height:${size}px;background:#5a4a30;border:1px solid #3a2a10;border-radius:${type === "village" ? "1px" : "0"};opacity:0.7;"></div>`,
  });
}

function AnimatedMarker({ unit }: { unit: TroopUnit }) {
  const markerRef = useRef<L.Marker>(null);

  useEffect(() => {
    if (markerRef.current) {
      const target = L.latLng(unit.lat, unit.lng);
      const current = markerRef.current.getLatLng();
      if (!current.equals(target)) {
        markerRef.current.setLatLng(target);
      }
      markerRef.current.setIcon(createTroopIcon(unit));
    }
  }, [unit]);

  return (
    <Marker
      ref={markerRef}
      position={[unit.lat, unit.lng]}
      icon={createTroopIcon(unit)}
    >
      <Tooltip direction="top" offset={[0, -10]} opacity={0.95} className="troop-tooltip">
        <div style={{ minWidth: 220, maxWidth: 300 }}>
          <div style={{ fontWeight: 600 }}>{unit.name}</div>
          {unit.commander !== "—" && (
            <div style={{ opacity: 0.7 }}>Cmd: {unit.commander}</div>
          )}
          <div style={{ opacity: 0.7 }}>
            {unit.strength} &middot; <span style={{ textTransform: "capitalize" }}>{unit.status}</span>
          </div>
          <div style={{ opacity: 0.9, marginTop: 2 }}>{unit.tooltip}</div>
        </div>
      </Tooltip>
    </Marker>
  );
}

function InvalidateSize() {
  const map = useMap();
  useEffect(() => {
    const timer = setTimeout(() => map.invalidateSize(), 100);
    return () => clearTimeout(timer);
  }, [map]);
  return null;
}

export default function LeafletMap({ troops }: LeafletMapProps) {
  return (
    <MapContainer
      center={BATTLEFIELD_CENTER}
      zoom={14}
      minZoom={13}
      maxZoom={16}
      maxBounds={BATTLEFIELD_BOUNDS}
      maxBoundsViscosity={1.0}
      scrollWheelZoom={true}
      className="w-full h-full rounded-lg"
      attributionControl={true}
      zoomControl={true}
    >
      <InvalidateSize />

      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="Satellite">
          <TileLayer
            attribution='&copy; <a href="https://www.esri.com/">Esri</a> &mdash; World Imagery'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            maxZoom={18}
            opacity={0.4}
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Topographic">
          <TileLayer
            attribution='&copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
            url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
            maxZoom={17}
            opacity={0.7}
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Altitude">
          <TileLayer
            attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://stamen.com/">Stamen Design</a>'
            url="https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}.png"
            maxZoom={18}
            opacity={0.7}
          />
        </LayersControl.BaseLayer>
      </LayersControl>

      {LOCATIONS.map((loc) => (
        <Marker
          key={loc.name}
          position={[loc.lat, loc.lng]}
          icon={createLocationIcon(loc.type)}
        >
          <Tooltip direction="bottom" offset={[0, 4]} permanent opacity={0.85} className="location-label">
            <span style={{ fontSize: 11, fontWeight: 600, color: "#3a2a10" }}>{loc.name}</span>
          </Tooltip>
        </Marker>
      ))}

      {troops.map((unit) => (
        <AnimatedMarker key={unit.id} unit={unit} />
      ))}
    </MapContainer>
  );
}
