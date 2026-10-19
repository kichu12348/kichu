import type { ClockInfo } from "../../types/portfolio";
import styles from "./Header.module.css";

export interface HeaderProps {
  readonly clockInfo: ClockInfo;
  readonly onPromptClick: () => void;
  readonly location?: string;
}

export function Header({
  clockInfo,
  onPromptClick,
  location = "Chengannur",
}: HeaderProps) {
  return (
    <header className={styles.header}>
      <button
        type="button"
        id="terminal-prompt-btn"
        title="Toggle terminal hint"
        className={styles.promptBtn}
        onClick={onPromptClick}
      >
        [kichu
        <span className={styles.cursorBlink}>_</span>]
      </button>

      <div className={styles.statusContainer}>
        {clockInfo.badgeText ? (
          <span id="mode-badge" className={styles.modeBadge} suppressHydrationWarning>
            {clockInfo.badgeText}
          </span>
        ) : null}
        <div className={styles.locationClock}>
          <span>{location}</span>
          <span className={styles.spacer}></span>
          <span id="clock-display" className={styles.clockDisplay} suppressHydrationWarning>
            {clockInfo.formatted}
          </span>
        </div>
      </div>
    </header>
  );
}
