import flatDirectory from '@/directory/flatDirectory.json';
import { useRouter } from 'next/router';
import { Platform } from '@/data/platforms';

/**
 * Hook to find other version url for the Version switcher.
 * If you are on a v6 url, then it will return a v5 url,
 * vice versa if you're on a v5 url.
 */
export const useVersionSwitcherPath = (platform: Platform) => {
  const router = useRouter();
  const path = router.pathname;
  const newRoute =
    path.indexOf('/prev') >= 0
      ? path.replace('/[platform]/prev', '/[platform]')
      : path.replace('/[platform]', '/[platform]/prev');
  const pageNode = flatDirectory[newRoute];
  if (pageNode && pageNode.platforms && pageNode.platforms.includes(platform)) {
    return newRoute;
  }
};
