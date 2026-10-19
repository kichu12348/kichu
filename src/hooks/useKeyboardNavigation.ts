import { useEffect } from 'react';

export interface UseKeyboardNavigationOptions {
  readonly isModalOpen: boolean;
  readonly onCloseModal: () => void;
  readonly onOpenModal: () => void;
  readonly onNextProject: () => void;
  readonly onPrevProject: () => void;
}

export function useKeyboardNavigation({
  isModalOpen,
  onCloseModal,
  onOpenModal,
  onNextProject,
  onPrevProject,
}: UseKeyboardNavigationOptions): void {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        return;
      }

      if (e.key === 'Escape') {
        if (isModalOpen) {
          e.preventDefault();
          onCloseModal();
        }
        return;
      }

      if (e.key === 'ArrowDown' || e.key.toLowerCase() === 'j') {
        e.preventDefault();
        onNextProject();
        return;
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        onPrevProject();
        return;
      }

      if (e.key === 'Enter' && !isModalOpen) {
        // If an interactive element like button or anchor has focus, let default action happen
        if (target && (target.tagName === 'BUTTON' || target.tagName === 'A')) {
          return;
        }
        e.preventDefault();
        onOpenModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, onCloseModal, onOpenModal, onNextProject, onPrevProject]);
}
