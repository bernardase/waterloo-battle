"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { TimelinePhase } from "@/types";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Legend } from "./legend";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";

interface TimelineSliderProps {
  events: TimelinePhase[];
  currentIndex: number;
  onChange: (index: number) => void;
}

export function TimelineSlider({
  events,
  currentIndex,
  onChange,
}: TimelineSliderProps) {
  const [playing, setPlaying] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const stop = useCallback(() => {
    setPlaying(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const play = useCallback(() => {
    setPlaying(true);
  }, []);

  useEffect(() => {
    if (!playing) return;

    intervalRef.current = setInterval(() => {
      onChange(currentIndex >= events.length - 1 ? 0 : currentIndex + 1);
    }, 3000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [playing, currentIndex, events.length, onChange]);

  const prev = () => {
    if (currentIndex > 0) onChange(currentIndex - 1);
  };

  const next = () => {
    if (currentIndex < events.length - 1) onChange(currentIndex + 1);
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (currentIndex > 0) onChange(currentIndex - 1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        if (currentIndex < events.length - 1) onChange(currentIndex + 1);
      } else if (e.key === " ") {
        e.preventDefault();
        playing ? stop() : play();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [currentIndex, events.length, onChange, playing, stop, play]);

  const current = events[currentIndex];

  return (
    <div className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="px-4 pt-3 pb-1">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-muted-foreground font-mono hidden sm:block">
            {events[0].time}
          </span>
          <div className="text-center min-w-0 flex-1 sm:flex-none">
            <span className="text-sm font-semibold">{current.time}</span>
            <span className="text-xs text-muted-foreground ml-2 hidden sm:inline">
              {current.title}
            </span>
            <span className="text-xs text-muted-foreground ml-1.5 sm:hidden truncate">
              {current.title.length > 22
                ? current.title.slice(0, 20) + "…"
                : current.title}
            </span>
          </div>
          <span className="text-xs text-muted-foreground font-mono hidden sm:block">
            {events[events.length - 1].time}
          </span>
        </div>

        <Slider
          min={0}
          max={events.length - 1}
          step={1}
          value={[currentIndex]}
          onValueChange={(val) => {
            const v = Array.isArray(val) ? val[0] : val;
            onChange(v);
          }}
        />
      </div>

      <div className="flex items-center justify-between px-4 pb-2.5 pt-1">
        <div className="hidden sm:flex items-center gap-1">
          {events.map((event, i) => (
            <button
              key={event.id}
              onClick={() => onChange(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === currentIndex
                  ? "w-4 bg-primary"
                  : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/60"
              }`}
              aria-label={`Go to ${event.time} — ${event.title}`}
            />
          ))}
        </div>
        <span className="sm:hidden text-xs text-muted-foreground tabular-nums">
          {currentIndex + 1}/{events.length}
        </span>

        <div className="md:hidden">
          <Legend />
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={prev}
            disabled={currentIndex === 0}
            aria-label="Previous phase"
          >
            <SkipBack className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={playing ? stop : play}
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? (
              <Pause className="h-3.5 w-3.5" />
            ) : (
              <Play className="h-3.5 w-3.5" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={next}
            disabled={currentIndex === events.length - 1}
            aria-label="Next phase"
          >
            <SkipForward className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
