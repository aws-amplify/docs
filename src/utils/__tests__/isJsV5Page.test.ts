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
  });
});
