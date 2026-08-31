import { JS_PLATFORMS, JSPlatform } from '@/data/platforms';

/**
 * Determines whether a route points at Amplify JavaScript v5 documentation.
 *
 * v5 docs are the "prev" version of the JavaScript-family platforms and live
 * under `/gen1/<js-platform>/prev/...` (see PLATFORM_VERSIONS in
 * `@/data/platforms`, where every JS platform maps prev -> v5).
 *
 * @param path A route path such as `/gen1/react/prev/build-a-backend/`
 * @returns True when the path is an Amplify JavaScript v5 page
 */
export function isJsV5Page(path: string): boolean {
  if (!path) return false;

  const [, gen, platform, version] = path.split('/');

  return (
    gen === 'gen1' &&
    version === 'prev' &&
    JS_PLATFORMS.includes(platform as JSPlatform)
  );
}
