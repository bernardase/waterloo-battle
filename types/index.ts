export type Faction = "french" | "allied" | "prussian";

export type UnitStatus =
  | "fresh"
  | "engaged"
  | "advancing"
  | "retreating"
  | "routed";

export interface TroopUnit {
  id: string;
  name: string;
  faction: Faction;
  commander: string;
  strength: string;
  lat: number;
  lng: number;
  status: UnitStatus;
  tooltip: string;
}

export interface TimelinePhase {
  id: string;
  index: number;
  time: string;
  title: string;
  phase: string;
  weather: string;
  overview: string;
  keyEvents: string[];
  troopStrength: {
    french: string;
    allied: string;
    prussian: string;
  };
  troops: TroopUnit[];
}

export interface FactionConfig {
  id: Faction;
  label: string;
  color: string;
  darkColor: string;
}
