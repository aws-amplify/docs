import { useState, useEffect, RefObject } from 'react';

// Custom hook to help detect if the "Tab" key was pressed in an element
export function useTabKeyDetection(ref: RefObject<HTMLElement>) {
  const [isTabKeyPressed, setIsTabKeyPressed] = useState<boolean>(false);

  useEffect(() => {
    const element = ref.current;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key && e.key === 'Tab') {
        setIsTabKeyPressed(true);
      }
    };

    const onKeyUp = () => {
      setIsTabKeyPressed(false);
    };

    if (element) {
      element.addEventListener('keydown', onKeyDown);
      element.addEventListener('keyup', onKeyUp);
    }

    return () => {
      if (element) {
        element.removeEventListener('keydown', onKeyDown);
        element.removeEventListener('keyup', onKeyUp);
      }
    };
  }, [ref]);

  return { isTabKeyPressed, setIsTabKeyPressed };
}
