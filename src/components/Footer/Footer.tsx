import { useState, useCallback } from 'react';
import type { EffectiveTimeOfDay } from '../../types/portfolio';
import styles from './Footer.module.css';

export interface FooterProps {
  readonly effectiveTod: EffectiveTimeOfDay;
  readonly toastMessage: string;
  readonly isToastVisible: boolean;
}

export function Footer({
  effectiveTod,
  toastMessage,
  isToastVisible,
}: FooterProps) {
  const [isHeartPulsing, setIsHeartPulsing] = useState<boolean>(false);

  const handleMadeByClick = useCallback(() => {
    setIsHeartPulsing(false);
    requestAnimationFrame(() => {
      setIsHeartPulsing(true);
    });
  }, []);

  const renderTodIcon = () => {
    switch (effectiveTod) {
      case 'dawn':
        return (
          <svg
            className={styles.iconSvg}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M17 18a5 5 0 0 0-10 0" />
            <line x1="12" y1="2" x2="12" y2="9" />
            <line x1="4.22" y1="10.22" x2="5.64" y2="11.64" />
            <line x1="1" y1="18" x2="3" y2="18" />
            <line x1="21" y1="18" x2="23" y2="18" />
            <line x1="18.36" y1="11.64" x2="19.78" y2="10.22" />
            <line x1="23" y1="22" x2="1" y2="22" />
            <polyline points="8 6 12 2 16 6" />
          </svg>
        );
      case 'day':
        return (
          <svg
            className={styles.iconSvg}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        );
      case 'dusk':
        return (
          <svg
            className={styles.iconSvg}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M17 18a5 5 0 0 0-10 0" />
            <line x1="12" y1="9" x2="12" y2="2" />
            <line x1="4.22" y1="10.22" x2="5.64" y2="11.64" />
            <line x1="1" y1="18" x2="3" y2="18" />
            <line x1="21" y1="18" x2="23" y2="18" />
            <line x1="18.36" y1="11.64" x2="19.78" y2="10.22" />
            <line x1="23" y1="22" x2="1" y2="22" />
            <polyline points="16 5 12 9 8 5" />
          </svg>
        );
      case 'night':
      default:
        return (
          <svg
            className={styles.iconSvg}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        );
    }
  };

  return (
    <footer className={styles.footer}>
      {/* Toast Notification */}
      <div
        id="status-toast"
        className={`${styles.statusToast} ${isToastVisible ? styles.statusToastVisible : ''}`}
        role="status"
        aria-live="polite"
      >
        {toastMessage}
      </div>

      {/* Centered subtle footer credit with pulsing heart on click */}
      <div
        className={styles.madeBy}
        onClick={handleMadeByClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleMadeByClick();
          }
        }}
        aria-label="Made Wid love by kichu"
      >
        <span>Made Wid</span>
        <svg
          className={`${styles.heartIcon} ${isHeartPulsing ? styles.heartPulse : ''}`}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          onAnimationEnd={() => setIsHeartPulsing(false)}
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
        <span>by kithu</span>
      </div>

      {/* Real-time Indicator */}
      <div className={styles.realtimeIndicator} title={`Current time of day: ${effectiveTod}`} suppressHydrationWarning>
        <span id="tod-icon-container" className={styles.iconContainer}>
          {renderTodIcon()}
        </span>
        <span className={styles.todLabel} suppressHydrationWarning>{effectiveTod}</span>
      </div>
    </footer>
  );
}
