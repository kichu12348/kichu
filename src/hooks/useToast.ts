import { useState, useCallback, useRef, useEffect } from 'react';

export interface UseToastReturn {
  readonly message: string;
  readonly isVisible: boolean;
  readonly showToast: (msg: string) => void;
}

export function useToast(): UseToastReturn {
  const [message, setMessage] = useState<string>('copied email to clipboard');
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((msg: string) => {
    setMessage(msg);
    setIsVisible(true);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 2400);
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return { message, isVisible, showToast };
}
