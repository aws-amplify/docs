import { Platform } from '@/data/platforms';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

// Custom hook to return the current platform
export function useCurrentPlatform() {
  const router = useRouter();
  const platform = useMemo(() => {
    const p = router.query.platform;
    if (p === '/gen1') {
      return undefined;
    }
    return p;
  }, [router]);
  return platform as Platform;
}
