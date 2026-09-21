import { PLATFORM_VERSIONS, Platform } from '@/data/platforms';

/**
 * Determines whether a route points at Amplify JavaScript v5 documentation.
 *
 * The previous ("prev") version of each platform lives under
 * `/gen1/<platform>/prev/...`. Which version `prev` actually refers to is
 * platform-specific and defined by PLATFORM_VERSIONS in `@/data/platforms`
 * (v5 for the JavaScript-family platforms, v1 for Android/Swift/Flutter), so
 * the version is read from there rather than inferred from the platform.
 *
 * @param path A route path such as `/gen1/react/prev/build-a-backend/`
 * @returns True when the path is an Amplify JavaScript v5 page
 */
export function isJsV5Page(path: string): boolean {
  if (!path) return false;

  const [, gen, platform, version] = path.split('/');

  if (gen !== 'gen1' || version !== 'prev') return false;

  return PLATFORM_VERSIONS[platform as Platform]?.prev === 'v5';
}
