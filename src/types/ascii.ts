export interface GridCell {
  ch: string;
  color: string | null;
  bg?: string | null;
}

export interface Star {
  readonly r: number;
  readonly c: number;
  readonly period: number;
  readonly phase: number;
}

export interface Tower {
  readonly left: number;
  readonly right: number;
  readonly top: number;
}

export interface CityWindow {
  readonly r: number;
  readonly c: number;
  readonly str: string;
  readonly seed: number;
}

export interface FgPalette {
  readonly frameOuter: string;
  readonly frameInner: string;
  readonly sill: string;
  readonly sillShadow: string;
  readonly curtainEdge: string;
  readonly curtainFill: string;
  readonly plantLeaf: string;
  readonly plantBright: string;
  readonly pot: string;
  readonly mug: string;
  readonly steam: string;
  readonly catOutline: string;
  readonly catFill: string;
  readonly catDetail: string;
}

export interface BgPalette {
  readonly towerEdge: string;
  readonly towerFill: string;
  readonly winLit: string;
  readonly winWarm: string;
  readonly winOff: string;
}

export interface ShootingStarState {
  active: boolean;
  r: number;
  c: number;
  step: number;
}
