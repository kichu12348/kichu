import { useState, useEffect, useMemo } from "react";
import type { EffectiveTimeOfDay, ClockInfo } from "../types/portfolio";
import { GLOW_STYLES } from "../data/timeOfDay";

export interface UseTimeOfDayReturn {
  readonly effectiveTod: EffectiveTimeOfDay;
  readonly clockInfo: ClockInfo;
  readonly ambientGlow: string;
}

export function getLiveTime(): {
  formatted: string;
  tod: EffectiveTimeOfDay;
} {
  const now = new Date();
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
  const istDate = new Date(utcMs + 5.5 * 3600000);
  const hours = istDate.getHours();
  const minutes = istDate.getMinutes();
  const formatted = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;

  let tod: EffectiveTimeOfDay = "night";
  if (hours >= 5 && hours < 10) tod = "dawn";
  else if (hours >= 10 && hours < 17) tod = "day";
  else if (hours >= 17 && hours < 20) tod = "dusk";
  else tod = "night";

  return { formatted, tod };
}

// Consistent baseline state ensuring SSR HTML and initial client hydration match 100%
const DEFAULT_INITIAL_STATE: { formatted: string; tod: EffectiveTimeOfDay } = {
  formatted: "20:47",
  tod: "night",
};

export function useTimeOfDay(): UseTimeOfDayReturn {
  const [liveState, setLiveState] = useState<{
    formatted: string;
    tod: EffectiveTimeOfDay;
  }>(DEFAULT_INITIAL_STATE);

  useEffect(() => {
    // Immediately synchronize with client real-time after initial hydration pass
    setLiveState(getLiveTime());
    const interval = setInterval(() => {
      setLiveState(getLiveTime());
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const effectiveTod = liveState.tod;

  const clockInfo: ClockInfo = useMemo(() => {
    return {
      formatted: liveState.formatted,
      effectiveTod,
      badgeText: `[${effectiveTod}]`,
    };
  }, [effectiveTod, liveState.formatted]);

  const ambientGlow = useMemo(() => {
    return GLOW_STYLES[effectiveTod] || GLOW_STYLES.night;
  }, [effectiveTod]);

  return {
    effectiveTod,
    clockInfo,
    ambientGlow,
  };
}
