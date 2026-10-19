import type { EffectiveTimeOfDay } from '../types/portfolio';

export const GLOW_STYLES: Record<EffectiveTimeOfDay, string> = {
  night: 'radial-gradient(circle, rgba(230, 180, 101, 0.19) 0%, rgba(12, 12, 12, 0) 70%)',
  dawn: 'radial-gradient(circle, rgba(244, 162, 97, 0.22) 0%, rgba(12, 12, 12, 0) 72%)',
  day: 'radial-gradient(circle, rgba(142, 202, 230, 0.18) 0%, rgba(12, 12, 12, 0) 72%)',
  dusk: 'radial-gradient(circle, rgba(231, 111, 81, 0.24) 0%, rgba(12, 12, 12, 0) 72%)',
};
