import type { ExperienceItem } from '../../types/portfolio';
import styles from './Experience.module.css';

export interface ExperienceProps {
  readonly items: readonly ExperienceItem[];
}

export function Experience({ items }: ExperienceProps) {
  return (
    <div>
      <h2 className={styles.heading}>previously</h2>
      {items.map((item) => (
        <div key={item.company} className={styles.experienceRow}>
          <span className={styles.company}>{item.company}</span>
          <span className={styles.dash}>—</span>
          <span className={styles.desc}>{item.desc}</span>
        </div>
      ))}
    </div>
  );
}
