import { Platform } from '@/constants/platforms';
import { useRouter } from 'next/router';

// Custom hook to return the current platform
export function useCurrentPlatform() {
  const router = useRouter();

  return router.query.platform as Platform;
}
