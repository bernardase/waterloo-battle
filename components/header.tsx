"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Legend } from "./legend";
import { PanelRightClose, PanelRight } from "lucide-react";

interface HeaderProps {
  panelOpen: boolean;
  onTogglePanel: () => void;
}

export function Header({ panelOpen, onTogglePanel }: HeaderProps) {
  return (
    <header className="h-12 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 flex items-center justify-between px-3 sm:px-4 shrink-0 z-10">
      <div className="flex items-center gap-2 sm:gap-3">
        <h1 className="text-sm font-semibold tracking-tight">
          Battle of Waterloo
        </h1>
        <Badge
          variant="outline"
          className="text-[10px] font-normal hidden sm:flex"
        >
          June 18, 1815
        </Badge>
      </div>

      <div className="hidden md:block">
        <Legend />
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={onTogglePanel}
        aria-label={panelOpen ? "Close detail panel" : "Open detail panel"}
      >
        {panelOpen ? (
          <PanelRightClose className="h-4 w-4" />
        ) : (
          <PanelRight className="h-4 w-4" />
        )}
      </Button>
    </header>
  );
}
