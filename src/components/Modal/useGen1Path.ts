import flatDirectory from '@/directory/flatDirectory.json';
import { useRouter } from 'next/router';
import { Platform } from '@/data/platforms';

/**
 * Hook to find the Gen1 version of the Gen2 path you're on.
 * Defaults to /gen1 if a path cannot be found.
 */
export const useGen1Path = (platform: Platform) => {
  const router = useRouter();
  const path = router.pathname;
  const gen1Path = '/gen1' + path;

  const pageNode = flatDirectory[gen1Path];
  const gen1PageExists =
    pageNode && pageNode.platforms && pageNode.platforms.includes(platform);

  return gen1PageExists
    ? {
        pathname: gen1Path,
        query: { platform: platform }
      }
    : '/gen1';
};
