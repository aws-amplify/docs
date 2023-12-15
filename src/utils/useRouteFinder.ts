import flatDirectory from 'src/directory/flatDirectory.json';
import { useRouter } from 'next/router';
import { Platform } from '@/data/platforms';

export const useRouteFinder = (platform: Platform, isPrev: boolean) => {
  const router = useRouter();
  const path = router.pathname;
  const newRoute = isPrev
    ? path.replace('/[platform]/prev', '/[platform]')
    : path.replace('/[platform]', '/[platform]/prev');
  const pageNode = flatDirectory[newRoute];
  if (pageNode && pageNode.platforms && pageNode.platforms.includes(platform)) {
    return newRoute;
  }
};
