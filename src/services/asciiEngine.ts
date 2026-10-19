import type { GridCell, ShootingStarState, FgPalette } from '../types/ascii';
import type { EffectiveTimeOfDay } from '../types/portfolio';
import {
  ASCII_COLS,
  ASCII_ROWS,
  SKY_LEFT,
  SKY_RIGHT,
  SKY_BOT,
  FG_PALETTE,
  BG_PALETTES,
  STARS,
  TOWERS,
  CITY_WINDOWS,
} from '../constants/asciiConstants';

export class AsciiEngine {
  private readonly grid: GridCell[][];

  constructor() {
    this.grid = Array.from({ length: ASCII_ROWS }, () =>
      Array.from({ length: ASCII_COLS }, () => ({ ch: ' ', color: null, bg: null }))
    );
  }

  public clear(): void {
    for (let r = 0; r < ASCII_ROWS; r++) {
      for (let c = 0; c < ASCII_COLS; c++) {
        const cell = this.grid[r][c];
        cell.ch = ' ';
        cell.color = null;
        cell.bg = null;
      }
    }
  }

  public putChar(r: number, c: number, ch: string, color: string | null, bg: string | null = null): void {
    if (r >= 0 && r < ASCII_ROWS && c >= 0 && c < ASCII_COLS) {
      this.grid[r][c].ch = ch;
      this.grid[r][c].color = color;
      this.grid[r][c].bg = bg;
    }
  }

  public putStr(
    r: number,
    c: number,
    str: string,
    color: string | null,
    transparentSpaces = false,
    bg: string | null = null
  ): void {
    for (let i = 0; i < str.length; i++) {
      const ch = str[i];
      if (transparentSpaces && ch === ' ') continue;
      this.putChar(r, c + i, ch, color, bg);
    }
  }

  public compose(
    tick: number,
    effectiveTod: EffectiveTimeOfDay,
    catPetTimer: number,
    shootingStar: ShootingStarState
  ): void {
    this.clear();

    const fgPal = FG_PALETTE;
    const bgPal = BG_PALETTES[effectiveTod] || BG_PALETTES.night;

    /* 1. SKY & CELESTIAL LAYER */
    if (effectiveTod === 'night') {
      // Twinkling stars
      for (const s of STARS) {
        const phase = (tick + s.phase) % s.period;
        if (phase !== 0) {
          const ch = phase === 1 ? '*' : phase === 2 ? '+' : '.';
          const col = phase === 1 ? '#ffffff' : '#a39b8b';
          this.putChar(s.r, s.c, ch, col);
        }
      }

      // Shooting star
      if (!shootingStar.active && tick % 85 === 30) {
        shootingStar.active = true;
        shootingStar.r = 3;
        shootingStar.c = 46;
        shootingStar.step = 0;
      }
      if (shootingStar.active) {
        const sr = shootingStar.r + shootingStar.step;
        const sc = shootingStar.c - shootingStar.step * 2;
        if (sr < 11 && sc > 20) {
          this.putChar(sr, sc, '*', '#ffffff');
          this.putChar(sr - 1, sc + 2, '/', '#d8c5a3');
          this.putChar(sr - 2, sc + 4, '.', '#786c5c');
          shootingStar.step++;
        } else {
          shootingStar.active = false;
        }
      }

      // Crescent Moon in Upper Right
      const moon = [
        { r: 4, c: 51, str: ' .d8b.', col: '#bfb29c' },
        { r: 5, c: 51, str: "  `:88b", col: '#dfd1b8' },
        { r: 6, c: 51, str: '   :888', col: '#f2e4cb' },
        { r: 7, c: 51, str: '  .d88P', col: '#dfd1b8' },
        { r: 8, c: 50, str: "._d88P'", col: '#bfb29c' },
      ];
      for (const m of moon) {
        this.putStr(m.r, m.c, m.str, m.col, true);
      }
    } else if (effectiveTod === 'dawn') {
      // Soft Morning Horizon Glow
      for (let r = 11; r <= 17; r++) {
        const col = r < 13 ? '#7d463b' : r < 15 ? '#b86449' : '#e08e60';
        for (let c = SKY_LEFT + 1; c < SKY_RIGHT; c++) {
          if ((c + r + Math.floor(tick / 5)) % 5 === 0) {
            this.putChar(r, c, '~', col);
          }
        }
      }

      // Rising Horizon Sun
      const sun = [
        { r: 9, c: 46, str: '  \\  |  /  ', col: '#e76f51' },
        { r: 10, c: 46, str: '  .d888b.  ', col: '#f4a261' },
        { r: 11, c: 46, str: '-:8888888:-', col: '#e9c46a' },
        { r: 12, c: 46, str: ' :8888888: ', col: '#f4a261' },
      ];
      for (const s of sun) {
        this.putStr(s.r, s.c, s.str, s.col, true);
      }

      // Flying Bird Silhouettes Across the Morning Sky
      const flock = [
        { baseR: 5, baseC: 22, speed: 0.25 },
        { baseR: 6, baseC: 19, speed: 0.25 },
        { baseR: 4, baseC: 25, speed: 0.25 },
        { baseR: 7, baseC: 37, speed: 0.18 },
      ];
      for (let i = 0; i < flock.length; i++) {
        const b = flock[i];
        const bc = SKY_LEFT + 2 + Math.floor((b.baseC + tick * b.speed) % 38);
        const wing = (tick + i * 2) % 4 < 2 ? 'v' : '~';
        this.putChar(b.baseR, bc, wing, '#f4a261');
      }
    } else if (effectiveTod === 'day') {
      // Bright Sun with Animated Rays in Upper Sky
      const rayShift = tick % 6 < 3;
      const daySun = [
        { r: 3, c: 49, str: rayShift ? '  \\ | /  ' : '   \\|/   ', col: '#e9c46a' },
        { r: 4, c: 49, str: '  .d8b.  ', col: '#ffca3a' },
        { r: 5, c: 48, str: '--(88888)--', col: '#ffe169' },
        { r: 6, c: 49, str: "  'Y8P'  ", col: '#ffca3a' },
        { r: 7, c: 49, str: rayShift ? '  / | \\  ' : '   /|\\   ', col: '#e9c46a' },
      ];
      for (const s of daySun) {
        this.putStr(s.r, s.c, s.str, s.col, true);
      }

      // Drifting ASCII Clouds Across Window Pane
      const c1 = SKY_LEFT + 1 + Math.floor((10 + tick * 0.08) % 30);
      this.putStr(5, c1, '  .--.  ', '#7f9eb2', true);
      this.putStr(6, c1, '-(    )-', '#9ab8cc', true);

      const c2 = SKY_LEFT + 1 + Math.floor((28 + tick * 0.05) % 30);
      this.putStr(9, c2, ' .-.   ', '#6c8a9c', true);
      this.putStr(10, c2, '(~~~)  ', '#89a7ba', true);

      // Daytime Flying Birds
      const dayBirds = [
        { baseR: 4, baseC: 18, speed: 0.22 },
        { baseR: 8, baseC: 31, speed: 0.16 },
      ];
      for (let i = 0; i < dayBirds.length; i++) {
        const b = dayBirds[i];
        const bc = SKY_LEFT + 2 + Math.floor((b.baseC + tick * b.speed) % 36);
        const wing = (tick + i * 2) % 4 < 2 ? 'v' : '~';
        this.putChar(b.baseR, bc, wing, '#9ab8cc');
      }
    } else if (effectiveTod === 'dusk') {
      // Warm Amber/Crimson Horizon Sky Bands
      for (let r = 8; r <= 15; r++) {
        const col = r < 10 ? '#6d597a' : r < 13 ? '#b56576' : '#e56b6f';
        for (let c = SKY_LEFT + 1; c < SKY_RIGHT; c++) {
          if ((c + r * 2) % 4 === 0) {
            this.putChar(r, c, '-', col);
          }
        }
      }

      // Drifting Evening Clouds
      const dc1 = SKY_LEFT + 1 + Math.floor((14 + tick * 0.06) % 32);
      this.putStr(5, dc1, ' .--.  ', '#9e6b72', true);
      this.putStr(6, dc1, '(~~~~) ', '#c98474', true);

      // Low Setting Sun Sinking Behind the Skyline
      const duskSun = [
        { r: 10, c: 44, str: '  .d8888b.  ', col: '#ff9f1c' },
        { r: 11, c: 44, str: ' d88888888b ', col: '#ffbf69' },
        { r: 12, c: 44, str: ':8888888888:', col: '#f77f00' },
        { r: 13, c: 44, str: ':8888888888:', col: '#d62828' },
      ];
      for (const s of duskSun) {
        this.putStr(s.r, s.c, s.str, s.col, true);
      }
    }

    /* 2. CITY SKYLINE LAYER */
    for (const t of TOWERS) {
      for (let r = t.top; r <= SKY_BOT; r++) {
        for (let c = t.left; c <= t.right; c++) {
          if (r === t.top) {
            this.putChar(r, c, c === t.left || c === t.right ? '+' : '-', bgPal.towerEdge, bgPal.towerFill);
          } else if (c === t.left || c === t.right) {
            this.putChar(r, c, '|', bgPal.towerEdge, bgPal.towerFill);
          } else {
            this.putChar(r, c, ' ', null, bgPal.towerFill);
          }
        }
      }
    }

    // Rooftop Spire Details
    this.putChar(11, 41, '.', bgPal.towerEdge);
    this.putChar(12, 41, '|', bgPal.towerEdge);
    this.putChar(12, 42, ':', bgPal.winLit);
    this.putChar(13, 54, '|', bgPal.towerEdge);

    // City Windows
    for (const w of CITY_WINDOWS) {
      if (effectiveTod === 'day') {
        this.putStr(w.r, w.c, '.'.repeat(w.str.length), bgPal.winLit, false, bgPal.towerFill);
        continue;
      }
      let isLit = true;
      if (effectiveTod === 'dawn') {
        isLit = w.seed % 4 === 0;
      } else if (effectiveTod === 'dusk') {
        isLit = (w.seed + Math.floor(tick / 14)) % 3 !== 0;
      } else {
        isLit = (tick + w.seed * 19) % 90 > 2;
      }

      if (isLit) {
        const warmPulse = (tick + w.seed * 7) % 23 === 0;
        this.putStr(w.r, w.c, w.str, warmPulse ? bgPal.winWarm : bgPal.winLit, false, bgPal.towerFill);
      } else {
        this.putStr(w.r, w.c, '.'.repeat(w.str.length), bgPal.winOff, false, bgPal.towerFill);
      }
    }

    /* 3. ARCHITECTURAL WINDOW FRAME, CURTAIN, PLANT & COFFEE MUG */
    // Top Window Header Lintel
    this.putStr(1, 13, '+==================================================+', fgPal.frameInner);
    this.putStr(0, 14, '..................................................', fgPal.frameOuter);

    // Left & Right Window Frame Jambs
    for (let r = 2; r <= 27; r++) {
      this.putStr(r, 15, '||', fgPal.frameInner);
      this.putStr(r, 62, '||', fgPal.frameInner);
      this.putChar(r, 64, ':', fgPal.frameOuter);
    }

    // Draped Curtain along Left Window Frame
    const sway = Math.sin(tick * 0.08) > 0.65 ? 1 : 0;
    for (let r = 2; r <= 22; r++) {
      const taper = Math.floor((22 - r) / 5);
      const cLeft = 8 + Math.floor(taper / 2);
      const cRight = 13 + taper + (r > 12 ? sway : 0);

      this.putChar(r, cLeft, '/', fgPal.curtainEdge, '#0c0c0c');
      for (let c = cLeft + 1; c < cRight; c++) {
        this.putChar(r, c, (r + c) % 2 === 0 ? ':' : '.', fgPal.curtainFill, '#0c0c0c');
      }
      this.putChar(r, cRight, '|', fgPal.curtainEdge, '#0c0c0c');
    }
    // Curtain tie-back
    this.putStr(13, 9, '===', fgPal.frameInner, false, '#0c0c0c');

    // Leafy Potted Plant on Left Side of Sill
    const rustle = tick % 18 < 4;
    const foliage = [
      { r: 19, c: 3, str: rustle ? '  .\\ | /.  ' : '  .\\|/..  ', col: fgPal.plantBright },
      { r: 20, c: 2, str: rustle ? ' .--\\|/--. ' : ' .--\\|/--. ', col: fgPal.plantBright },
      { r: 21, c: 2, str: " `-._|_.-' ", col: fgPal.plantLeaf },
      { r: 22, c: 3, str: '   \\|/   ', col: fgPal.plantLeaf },
    ];
    for (const f of foliage) {
      this.putStr(f.r, f.c, f.str, f.col, true);
    }

    // Plant Pot
    this.putStr(23, 4, '[======]', fgPal.pot, false, '#0c0c0c');
    this.putStr(24, 5, '| :: |', fgPal.pot, false, '#0c0c0c');
    this.putStr(25, 5, '| :: |', fgPal.pot, false, '#0c0c0c');
    this.putStr(26, 5, '| .. |', fgPal.pot, false, '#0c0c0c');
    this.putStr(27, 5, '|____|', fgPal.pot, false, '#0c0c0c');

    // Warm Coffee Mug on Sill + Rising Steam
    const steamTick = Math.floor(tick / 3) % 4;
    if (steamTick === 0) {
      this.putChar(23, 15, '(', fgPal.steam);
      this.putChar(22, 16, '~', fgPal.steam);
    } else if (steamTick === 1) {
      this.putChar(23, 16, ')', fgPal.steam);
      this.putChar(22, 15, '(', fgPal.steam);
    } else if (steamTick === 2) {
      this.putChar(23, 15, '~', fgPal.steam);
    } else {
      this.putChar(22, 16, '.', fgPal.steam);
    }

    this.putStr(25, 13, ' .==.', fgPal.mug, true, '#0c0c0c');
    this.putStr(26, 13, 'c|::|', fgPal.mug, true, '#0c0c0c');
    this.putStr(27, 13, ' `--`', fgPal.mug, true, '#0c0c0c');

    // Windowsill
    this.putStr(28, 2, '[==============================================================]', fgPal.sill, false, '#0c0c0c');
    this.putStr(29, 3, '`-============================================================-`', fgPal.sillShadow, false, '#0c0c0c');

    /* 4. SILHOUETTE CAT */
    const earTwitch = tick % 36 === 0 || tick % 36 === 1;
    const tailStep = Math.floor(tick / 4) % 4;

    const silhouetteCat = [
      { r: 17, c: 27, str: earTwitch ? '/\\   _/' : '/\\   /\\' },
      { r: 18, c: 26, str: '/  \\_/  \\' },
      { r: 19, c: 26, str: '|       |=' },
      { r: 20, c: 26, str: '|       :=' },
      { r: 21, c: 25, str: '/       :0:' },
      { r: 22, c: 24, str: '/        :88' },
      { r: 23, c: 23, str: ':          88:' },
      { r: 24, c: 23, str: '|          :88' },
      { r: 25, c: 23, str: '|          :88' },
      { r: 26, c: 24, str: '\\         :88' },
      { r: 27, c: 25, str: "'_       :88:" },
    ];
    this.drawCatRows(silhouetteCat, fgPal);

    // Swaying tail hanging below windowsill
    const tailFrames = [
      [
        { r: 28, c: 35, s: "'880." },
        { r: 29, c: 37, s: ':88' },
        { r: 30, c: 37, s: ':80' },
        { r: 31, c: 35, s: "._.'" },
      ],
      [
        { r: 28, c: 35, s: "'880." },
        { r: 29, c: 38, s: ':88' },
        { r: 30, c: 38, s: ':80' },
        { r: 31, c: 36, s: "._.'" },
      ],
      [
        { r: 28, c: 35, s: "'880." },
        { r: 29, c: 37, s: ':88' },
        { r: 30, c: 37, s: ':80' },
        { r: 31, c: 35, s: "._.'" },
      ],
      [
        { r: 28, c: 35, s: "'880." },
        { r: 29, c: 36, s: ':88' },
        { r: 30, c: 36, s: ':80' },
        { r: 31, c: 34, s: "._.'" },
      ],
    ];
    for (const t of tailFrames[tailStep]) {
      this.putStr(t.r, t.c, t.s, fgPal.catOutline, true, '#0c0c0c');
    }

    // Heart particle on pet
    if (catPetTimer > 0) {
      const floatR = 14 - (catPetTimer < 16 ? 1 : 0);
      this.putStr(floatR, 29, catPetTimer % 4 < 2 ? '<3' : ' * ', '#ff758f', true);
    }
  }

  private drawCatRows(rows: { r: number; c: number; str: string }[], pal: FgPalette): void {
    for (const row of rows) {
      for (let i = 0; i < row.str.length; i++) {
        const ch = row.str[i];
        const c = row.c + i;
        if (ch === ' ') {
          this.putChar(row.r, c, ' ', null, pal.catFill);
        } else {
          const isRim = i >= row.str.length - 3 || ch === '8' || ch === '0' || ch === '=';
          this.putChar(row.r, c, ch, isRim ? pal.catOutline : pal.catDetail, pal.catFill);
        }
      }
    }
  }

  public render(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    cellW: number,
    cellH: number,
    fontSizePx: number
  ): void {
    ctx.clearRect(0, 0, width, height);

    ctx.font = `500 ${fontSizePx.toFixed(2)}px "JetBrains Mono", monospace`;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';

    for (let r = 0; r < ASCII_ROWS; r++) {
      const cy = (r + 0.5) * cellH;
      for (let c = 0; c < ASCII_COLS; c++) {
        const cell = this.grid[r][c];
        const cx = (c + 0.5) * cellW;

        if (cell.bg) {
          ctx.fillStyle = cell.bg;
          ctx.fillRect(c * cellW - 0.5, r * cellH - 0.5, cellW + 1, cellH + 1);
        }

        if (cell.ch !== ' ' && cell.color) {
          ctx.fillStyle = cell.color;
          ctx.fillText(cell.ch, cx, cy);
        }
      }
    }
  }
}
