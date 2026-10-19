import type { Star, Tower, CityWindow, FgPalette, BgPalette } from '../types/ascii';
import type { EffectiveTimeOfDay } from '../types/portfolio';

export const ASCII_COLS = 68;
export const ASCII_ROWS = 34;

export const SKY_TOP = 2;
export const SKY_BOT = 27;
export const SKY_LEFT = 17;
export const SKY_RIGHT = 61;

export const FG_PALETTE: FgPalette = {
  frameOuter: '#544e46',
  frameInner: '#82786a',
  sill: '#8c8070',
  sillShadow: '#4d463e',
  curtainEdge: '#807567',
  curtainFill: '#4a443c',
  plantLeaf: '#90846f',
  plantBright: '#b5a58b',
  pot: '#786c5c',
  mug: '#9e8f7a',
  steam: '#665f55',
  catOutline: '#d8c5a3',
  catFill: '#0c0c0c',
  catDetail: '#9e8e74',
};

export const BG_PALETTES: Record<EffectiveTimeOfDay, BgPalette> = {
  night: {
    towerEdge: '#282623',
    towerFill: '#111110',
    winLit: '#d99b43',
    winWarm: '#f3c979',
    winOff: '#221f1b',
  },
  dawn: {
    towerEdge: '#382e29',
    towerFill: '#161210',
    winLit: '#e09f5a',
    winWarm: '#f3c979',
    winOff: '#261f1c',
  },
  day: {
    towerEdge: '#454f57',
    towerFill: '#1b2024',
    winLit: '#657785',
    winWarm: '#859aa8',
    winOff: '#2a3238',
  },
  dusk: {
    towerEdge: '#3b2824',
    towerFill: '#16100e',
    winLit: '#e09f45',
    winWarm: '#f3c979',
    winOff: '#291c18',
  },
};

export const STARS: readonly Star[] = [
  { r: 4, c: 22, period: 16, phase: 1 },
  { r: 3, c: 33, period: 22, phase: 5 },
  { r: 6, c: 28, period: 14, phase: 2 },
  { r: 5, c: 41, period: 19, phase: 9 },
  { r: 8, c: 24, period: 25, phase: 4 },
  { r: 9, c: 36, period: 17, phase: 11 },
  { r: 11, c: 30, period: 21, phase: 7 },
  { r: 7, c: 46, period: 15, phase: 3 },
  { r: 12, c: 43, period: 20, phase: 14 },
];

export const TOWERS: readonly Tower[] = [
  { left: 18, right: 24, top: 19 },
  { left: 25, right: 31, top: 16 },
  { left: 32, right: 37, top: 20 },
  { left: 38, right: 45, top: 13 },
  { left: 46, right: 50, top: 18 },
  { left: 51, right: 57, top: 14 },
  { left: 58, right: 61, top: 17 },
];

export const CITY_WINDOWS: readonly CityWindow[] = [
  { r: 21, c: 20, str: '::', seed: 1 },
  { r: 23, c: 21, str: '##', seed: 2 },
  { r: 18, c: 27, str: '::', seed: 3 },
  { r: 20, c: 26, str: '#', seed: 4 },
  { r: 20, c: 29, str: '#', seed: 5 },
  { r: 22, c: 27, str: '==', seed: 6 },
  { r: 22, c: 34, str: '::', seed: 7 },
  { r: 15, c: 40, str: '::', seed: 8 },
  { r: 17, c: 40, str: '##', seed: 9 },
  { r: 17, c: 43, str: ':', seed: 10 },
  { r: 19, c: 39, str: '#', seed: 11 },
  { r: 19, c: 42, str: '##', seed: 12 },
  { r: 21, c: 40, str: '===', seed: 13 },
  { r: 23, c: 39, str: '::', seed: 14 },
  { r: 23, c: 42, str: '##', seed: 15 },
  { r: 25, c: 41, str: '##', seed: 16 },
  { r: 20, c: 48, str: ':', seed: 17 },
  { r: 23, c: 47, str: '==', seed: 18 },
  { r: 16, c: 53, str: '##', seed: 19 },
  { r: 18, c: 52, str: ':', seed: 20 },
  { r: 18, c: 54, str: '##', seed: 21 },
  { r: 20, c: 52, str: '##', seed: 22 },
  { r: 20, c: 55, str: ':', seed: 23 },
  { r: 22, c: 53, str: '===', seed: 24 },
  { r: 24, c: 52, str: '##', seed: 25 },
  { r: 24, c: 55, str: '#', seed: 26 },
  { r: 26, c: 53, str: '::', seed: 27 },
  { r: 19, c: 59, str: ':', seed: 28 },
  { r: 21, c: 59, str: '#', seed: 29 },
  { r: 24, c: 59, str: ':', seed: 30 },
];
