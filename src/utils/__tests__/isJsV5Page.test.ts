import { PLATFORM_VERSIONS, Platform } from '@/data/platforms';
import { isJsV5Page } from '../isJsV5Page';

describe('isJsV5Page', () => {
  it('returns true for gen1 JS platform prev routes', () => {
    expect(isJsV5Page('/gen1/javascript/prev/build-a-backend/auth/')).toBe(
      true
    );
    expect(isJsV5Page('/gen1/react/prev/')).toBe(true);
    expect(isJsV5Page('/gen1/react-native/prev/start/getting-started/')).toBe(
      true
    );
    expect(isJsV5Page('/gen1/nextjs/prev')).toBe(true);
    expect(isJsV5Page('/gen1/angular/prev/')).toBe(true);
    expect(isJsV5Page('/gen1/vue/prev/')).toBe(true);
  });

  it('returns false for non-JS platform prev routes', () => {
    expect(isJsV5Page('/gen1/swift/prev/build-a-backend/auth/')).toBe(false);
    expect(isJsV5Page('/gen1/android/prev/')).toBe(false);
    expect(isJsV5Page('/gen1/flutter/prev/')).toBe(false);
  });

  it('returns false for current-version (v6) routes', () => {
    expect(isJsV5Page('/gen1/javascript/build-a-backend/auth/')).toBe(false);
    expect(isJsV5Page('/react/build-a-backend/')).toBe(false);
    expect(isJsV5Page('/react/prev/build-a-backend/')).toBe(false);
  });

  it('handles empty and non-docs paths', () => {
    expect(isJsV5Page('')).toBe(false);
    expect(isJsV5Page('/')).toBe(false);
    expect(isJsV5Page('/contribute/')).toBe(false);
    expect(isJsV5Page('/gen1/not-a-platform/prev/')).toBe(false);
  });

  // Guards against the banner outliving v5: it must follow PLATFORM_VERSIONS
  // rather than assuming "JS platform + prev" always means v5.
  it('tracks PLATFORM_VERSIONS rather than assuming prev means v5', () => {
    Object.keys(PLATFORM_VERSIONS).forEach((platform) => {
      const isV5 = PLATFORM_VERSIONS[platform as Platform].prev === 'v5';

      expect(isJsV5Page(`/gen1/${platform}/prev/build-a-backend/`)).toBe(isV5);
    });
  });
});
