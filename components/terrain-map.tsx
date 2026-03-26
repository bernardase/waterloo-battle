"use client";

import { useState, useCallback, useMemo } from "react";
import { DeckGL } from "@deck.gl/react";
import { TerrainLayer } from "@deck.gl/geo-layers";
import { ScatterplotLayer, TextLayer } from "@deck.gl/layers";
import type { MapViewState, PickingInfo, ViewStateChangeParameters } from "@deck.gl/core";
import { TroopUnit } from "@/types";

interface TerrainMapProps {
  troops: TroopUnit[];
}

const INITIAL_VIEW_STATE: MapViewState = {
  latitude: 50.678,
  longitude: 4.41,
  zoom: 13.5,
  pitch: 45,
  bearing: -15,
  maxZoom: 16,
  minZoom: 12,
};

const ELEVATION_DECODER = {
  rScaler: 256,
  gScaler: 1,
  bScaler: 1 / 256,
  offset: -32768,
};

const LOCATIONS = [
  { name: "Hougoumont", lat: 50.673, lng: 4.388 },
  { name: "La Haye Sainte", lat: 50.678, lng: 4.408 },
  { name: "La Belle Alliance", lat: 50.67, lng: 4.413 },
  { name: "Papelotte", lat: 50.681, lng: 4.422 },
  { name: "Plancenoit", lat: 50.67, lng: 4.43 },
  { name: "Mont-Saint-Jean", lat: 50.685, lng: 4.408 },
  { name: "Rossomme", lat: 50.664, lng: 4.41 },
];

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

const FACTION_COLORS: Record<string, [number, number, number]> = {
  french: hexToRgb("#2563eb"),
  allied: hexToRgb("#dc2626"),
  prussian: hexToRgb("#1f2937"),
};

function getFactionRgb(faction: string): [number, number, number] {
  return FACTION_COLORS[faction] ?? [107, 114, 128];
}

export default function TerrainMap({ troops }: TerrainMapProps) {
  const [viewState, setViewState] = useState<MapViewState>(INITIAL_VIEW_STATE);

  const onViewStateChange = useCallback(
    (params: ViewStateChangeParameters) => {
      setViewState(params.viewState as MapViewState);
    },
    [],
  );

  const terrainLayer = useMemo(
    () =>
      new TerrainLayer({
        id: "terrain",
        elevationData:
          "https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png",
        texture:
          "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        elevationDecoder: ELEVATION_DECODER,
        meshMaxError: 2.0,
        color: [255, 255, 255],
        operation: "terrain+draw",
      }),
    [],
  );

  const markerLayer = useMemo(
    () =>
      new ScatterplotLayer<TroopUnit>({
        id: "troop-markers",
        data: troops,
        getPosition: (d) => [d.lng, d.lat, 20],
        getRadius: (d) => {
          if (d.status === "routed") return 60;
          if (d.status === "engaged") return 100;
          return 80;
        },
        getFillColor: (d) => {
          const rgb = getFactionRgb(d.faction);
          return d.status === "routed" ? [...rgb, 100] : [...rgb, 220];
        },
        getLineColor: [255, 255, 255, 200],
        lineWidthMinPixels: 1.5,
        stroked: true,
        filled: true,
        radiusUnits: "meters",
        pickable: true,
        antialiasing: true,
        transitions: {
          getPosition: { duration: 700, easing: (t: number) => t * (2 - t) },
        },
      }),
    [troops],
  );

  const labelLayer = useMemo(
    () =>
      new TextLayer<TroopUnit>({
        id: "troop-labels",
        data: troops,
        getPosition: (d) => [d.lng, d.lat, 30],
        getText: (d) =>
          d.name.length > 16 ? d.name.slice(0, 14) + "…" : d.name,
        getSize: 11,
        getColor: (d) => {
          const rgb = getFactionRgb(d.faction);
          return d.status === "routed" ? [...rgb, 120] : [...rgb, 255];
        },
        getTextAnchor: "middle",
        getAlignmentBaseline: "bottom",
        getPixelOffset: [0, -14],
        fontFamily: "Inter, system-ui, sans-serif",
        fontWeight: 600,
        outlineWidth: 3,
        outlineColor: [255, 255, 255, 230],
        billboard: true,
        sizeUnits: "pixels",
        pickable: false,
        transitions: {
          getPosition: { duration: 700, easing: (t: number) => t * (2 - t) },
        },
      }),
    [troops],
  );

  const locationLayer = useMemo(
    () =>
      new TextLayer({
        id: "location-labels",
        data: LOCATIONS,
        getPosition: (d: (typeof LOCATIONS)[number]) => [d.lng, d.lat, 10],
        getText: (d: (typeof LOCATIONS)[number]) => d.name,
        getSize: 12,
        getColor: [60, 40, 20, 200],
        getTextAnchor: "middle" as const,
        getAlignmentBaseline: "center" as const,
        fontFamily: "Inter, system-ui, sans-serif",
        fontWeight: 700,
        fontSettings: { sdf: true },
        outlineWidth: 4,
        outlineColor: [255, 255, 255, 200],
        billboard: true,
        sizeUnits: "pixels" as const,
        pickable: false,
      }),
    [],
  );

  const getTooltip = useCallback((info: PickingInfo) => {
    if (!info.object) return null;
    const d = info.object as TroopUnit;
    if (!d.faction) return null;
    return {
      html: `
        <div style="font-family:Inter,system-ui,sans-serif;font-size:13px;max-width:300px;">
          <div style="font-weight:600;margin-bottom:2px;">${d.name}</div>
          ${d.commander !== "—" ? `<div style="opacity:0.7;">Cmd: ${d.commander}</div>` : ""}
          <div style="opacity:0.7;">${d.strength} · <span style="text-transform:capitalize">${d.status}</span></div>
          <div style="margin-top:3px;">${d.tooltip}</div>
        </div>
      `,
      style: {
        backgroundColor: "white",
        borderRadius: "8px",
        padding: "10px 12px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
        border: "1px solid #e5e7eb",
      },
    };
  }, []);

  const layers = [terrainLayer, markerLayer, labelLayer, locationLayer];

  return (
    <DeckGL
      viewState={viewState}
      onViewStateChange={onViewStateChange}
      controller={true}
      layers={layers}
      getTooltip={getTooltip}
      deviceProps={{ waitForPageLoad: false }}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
