import { PLATFORMS } from '@/data/platforms';

export const getCustomStaticPath = (platforms: string[] | string) => {
  const platformsArr = Array.isArray(platforms)
    ? platforms
    : platforms.includes('all')
    ? PLATFORMS
    : platforms.split('|');

  return {
    paths: platformsArr.map((platform) => ({ params: { platform } })),
    fallback: false
  };
};
