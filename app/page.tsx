"use client";

import { useCallback, useState } from "react";
import { timelineEvents } from "@/data/timeline-events";
import { BattlefieldMap } from "@/components/battlefield-map";
import { TimelineSlider } from "@/components/timeline-slider";
import { DetailPanel } from "@/components/detail-panel";
import { Header } from "@/components/header";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [panelOpen, setPanelOpen] = useState(true);

  const handleIndexChange = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const event = timelineEvents[currentIndex];

  return (
    <div className="h-dvh flex flex-col overflow-hidden">
      <Header
        panelOpen={panelOpen}
        onTogglePanel={() => setPanelOpen((p) => !p)}
      />

      <div className="flex-1 flex overflow-hidden min-h-0">
        <div className="flex-1 p-2 sm:p-3 min-w-0">
          <BattlefieldMap troops={event.troops} />
        </div>
        <DetailPanel event={event} isOpen={panelOpen} />
      </div>

      <TimelineSlider
        events={timelineEvents}
        currentIndex={currentIndex}
        onChange={handleIndexChange}
      />
    </div>
  );
}
