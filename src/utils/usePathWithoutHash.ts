import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export function usePathWithoutHash() {
  const [path, setPath] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const onRouteChangeComplete = () => {
      // Get everything before the hashmark (#)
      setPath(router.asPath.split('#')[0]);
    };

    router.events.on('routeChangeComplete', onRouteChangeComplete);

    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete);
    };
  }, [router.asPath, router.events]);

  return path;
}
