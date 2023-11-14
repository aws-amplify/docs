import { useState, useEffect, useRef, RefObject } from 'react';

// Custom hook to help detect if the "Tab" key was pressed in an element
export function useTabKeyDetection(ref: RefObject<HTMLElement>) {
  const [isTabKeyPressed, setIsTabKeyPressed] = useState<boolean>(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key && e.key === 'Tab') {
        setIsTabKeyPressed(true);
      }
    };

    const onKeyUp = () => {
      setIsTabKeyPressed(false);
    };

    if (ref.current) {
      ref.current.addEventListener('keydown', onKeyDown);
      ref.current.addEventListener('keyup', onKeyUp);
    }

    return () => {
      if (ref.current) {
        ref.current.removeEventListener('keydown', onKeyDown);
        ref.current.removeEventListener('keyup', onKeyUp);
      }
    };
  }, []);

  return { isTabKeyPressed, setIsTabKeyPressed };
}
