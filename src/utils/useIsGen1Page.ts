import { useRouter } from 'next/router';

/**
 * Hook to check if current router is on any gen1 page
 * @returns {boolean} True if on a gen1 page
 */
export function useIsGen1Page() {
  const router = useRouter();

  return router.asPath.startsWith('/legacy/gen1');
}
