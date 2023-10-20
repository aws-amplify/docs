import { useRef, useEffect } from 'react';

export function useClickOutside(callBack) {
  const ref = useRef<HTMLDivElement>(null);
  const refCallBack = useRef(callBack);

  useEffect(() => {
    refCallBack.current = callBack;
    const handler = (e) => {
      const element = ref.current;
      if (element && !element.contains(e.target)) {
        refCallBack.current(e);
      }
    };

    document.addEventListener('click', handler);

    return () => {
      document.removeEventListener('click', handler);
    };
  }, [callBack]);

  return ref;
}
