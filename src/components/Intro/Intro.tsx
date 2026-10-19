import styles from './Intro.module.css';

export interface IntroProps {
  readonly name: string;
  readonly bio: string;
  readonly status: string;
}

export function Intro({ name, bio, status }: IntroProps) {
  return (
    <div className={styles.introContainer}>
      <h1 className={styles.name}>{name}</h1>
      <p className={styles.bio}>{bio}</p>

      <div className={styles.statusWrapper}>
        <span className={styles.statusDot} aria-hidden="true" />
        <p className={styles.statusText}>{status}</p>
      </div>
    </div>
  );
}
