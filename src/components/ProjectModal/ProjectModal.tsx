import { useEffect, useRef, type MouseEvent } from 'react';
import type { Project } from '../../types/portfolio';
import styles from './ProjectModal.module.css';

export interface ProjectModalProps {
  readonly project: Project | null;
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

export function ProjectModal({
  project,
  isOpen,
  onClose,
}: ProjectModalProps) {
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      contentRef.current?.focus();
    }
  }, [isOpen]);

  if (!isOpen || !project) {
    return null;
  }

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      id="project-modal"
      className={styles.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={contentRef}
        tabIndex={-1}
        className={styles.modalContent}
      >
        <div className={styles.modalHeader}>
          <div className={styles.titleArea}>
            <span className={styles.statusDot} aria-hidden="true">
              ●
            </span>
            <h3 id="modal-title" className={styles.modalTitle}>
              {project.name}
            </h3>
            <span id="modal-tag" className={styles.modalTag}>
              {project.tag}
            </span>
          </div>
          <button
            type="button"
            id="close-modal-btn"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close modal"
          >
            [esc]
          </button>
        </div>

        <p id="modal-desc" className={styles.description}>
          {project.desc}
        </p>

        <div id="modal-metrics" className={styles.metricsBox}>
          {project.metrics.map((metric, idx) => (
            <div key={idx} className={styles.metricItem}>
              {metric}
            </div>
          ))}
        </div>

        <div className={styles.modalFooter}>
          <span id="modal-stack" className={styles.modalStack}>
            {project.stack}
          </span>
          <a
            id="modal-link"
            href={project.link || 'https://github.com'}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.sourceLink}
            aria-label={`View source for ${project.name}`}
            title="view source"
          >
            <span className={styles.desktopLinkText}>
              <span>view source</span>
              <span aria-hidden="true">→</span>
            </span>
            <span className={styles.mobileLinkIcon} aria-hidden="true">
              <svg
                className={styles.globeIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
