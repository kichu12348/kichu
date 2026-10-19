import { useRef, useEffect, useCallback, useMemo } from 'react';
import type { EffectiveTimeOfDay } from '../../types/portfolio';
import type { ShootingStarState } from '../../types/ascii';
import { AsciiEngine } from '../../services/asciiEngine';
import { ASCII_COLS, ASCII_ROWS } from '../../constants/asciiConstants';
import styles from './AsciiStage.module.css';

export interface AsciiStageProps {
  readonly effectiveTod: EffectiveTimeOfDay;
  readonly ambientGlow: string;
  readonly onShowToast: (message: string) => void;
}

export function AsciiStage({
  effectiveTod,
  ambientGlow,
  onShowToast,
}: AsciiStageProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const engine = useMemo(() => new AsciiEngine(), []);
  const catPetTimerRef = useRef<number>(0);
  const tickRef = useRef<number>(0);
  const shootingStarRef = useRef<ShootingStarState>({
    active: false,
    r: 3,
    c: 46,
    step: 0,
  });

  const renderFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const cellW = rect.width / ASCII_COLS;
    const cellH = rect.height / ASCII_ROWS;
    const fontSizePx = Math.min(cellW * 1.62, cellH * 0.88);

    engine.compose(
      tickRef.current,
      effectiveTod,
      catPetTimerRef.current,
      shootingStarRef.current
    );

    if (catPetTimerRef.current > 0) {
      catPetTimerRef.current--;
    }

    engine.render(ctx, rect.width, rect.height, cellW, cellH, fontSizePx);
  }, [engine, effectiveTod]);

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    renderFrame();
  }, [renderFrame]);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  // Main animation loop at 105ms
  useEffect(() => {
    const interval = setInterval(() => {
      tickRef.current++;
      renderFrame();
    }, 105);

    return () => clearInterval(interval);
  }, [renderFrame]);

  const handleCanvasClick = useCallback(() => {
    catPetTimerRef.current = 32;
    onShowToast('purrrr... <3');
    renderFrame();
  }, [onShowToast, renderFrame]);

  return (
    <div className={styles.stageWrapper}>
      <div className={styles.asciiStage}>
        {/* Ambient Backlight Glow */}
        <div
          id="window-glow"
          className={styles.windowGlow}
          style={{ background: ambientGlow }}
        />

        {/* High-Precision Monospace Grid Canvas */}
        <canvas
          ref={canvasRef}
          id="ascii-canvas"
          className={styles.asciiCanvas}
          aria-label="Animated ASCII art of a cat sitting on a windowsill looking out at the Chengannur skyline"
          title="Click or tap the cat to pet"
          onClick={handleCanvasClick}
        />
      </div>
    </div>
  );
}
