import { useCallback } from "react";
import styles from "./SocialLinks.module.css";

export interface SocialLinksProps {
  readonly email: string;
  readonly githubUrl: string;
  readonly linkedinUrl: string;
  readonly resumeUrl?: string;
  readonly tagline: string;
  readonly onShowToast: (message: string) => void;
}

export function SocialLinks({
  email,
  githubUrl,
  linkedinUrl,
  resumeUrl,
  tagline,
  onShowToast,
}: SocialLinksProps) {
  const handleEmailCopy = useCallback(async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(email);
        onShowToast(`copied ${email} to clipboard`);
      } else {
        const tempInput = document.createElement("textarea");
        tempInput.value = email;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
        onShowToast(`copied ${email} to clipboard`);
      }
    } catch {
      onShowToast(`email: ${email}`);
    }
  }, [email, onShowToast]);

  return (
    <div className={styles.container}>
      <div className={styles.linksRow}>
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          github
        </a>
        <span className={styles.separator} aria-hidden="true">
          /
        </span>
        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          linkedin
        </a>
        {resumeUrl && (
          <>
            <span className={styles.separator} aria-hidden="true">
              /
            </span>
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              résumé
            </a>
          </>
        )}
        <span className={styles.separator} aria-hidden="true">
          /
        </span>
        <button
          type="button"
          id="email-copy-btn"
          className={styles.link}
          onClick={handleEmailCopy}
        >
          email
        </button>
      </div>
      <p className={styles.tagline}>{tagline}</p>
    </div>
  );
}
