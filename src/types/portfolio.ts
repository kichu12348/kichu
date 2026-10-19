export interface Project {
  readonly id: string;
  readonly name: string;
  readonly tag: string;
  readonly desc: string;
  readonly metrics: readonly string[];
  readonly stack: string;
  readonly link?: string;
}

export interface ExperienceItem {
  readonly company: string;
  readonly roleAndPeriod: string;
  readonly desc: string;
}

export type EffectiveTimeOfDay = 'night' | 'dawn' | 'day' | 'dusk';

export interface ClockInfo {
  readonly formatted: string;
  readonly effectiveTod: EffectiveTimeOfDay;
  readonly badgeText: string;
}
