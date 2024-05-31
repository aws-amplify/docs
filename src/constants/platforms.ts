export const JS_PLATFORMS = {
  angular: 'Angular',
  javascript: 'JavaScript',
  nextjs: 'Next.js',
  react: 'React',
  'react-native': 'React Native',
  vue: 'Vue'
} as const;

export const MOBILE_PLATFORMS = {
  android: 'Android',
  flutter: 'Flutter',
  swift: 'Swift'
} as const;

export const PLATFORMS = {
  ...JS_PLATFORMS,
  ...MOBILE_PLATFORMS
} as const;

export const DEFAULT_PLATFORM: Platform = 'react';

export type JSPlatform = keyof typeof JS_PLATFORMS;
export type Platform = keyof typeof PLATFORMS;

type PlatformVersion = {
  prev: `v${number}`;
  current: `v${number}`;
};

export const PLATFORM_VERSIONS: Record<Platform, PlatformVersion> = {
  android: {
    prev: 'v1',
    current: 'v2'
  },
  swift: {
    prev: 'v1',
    current: 'v2'
  },
  flutter: {
    prev: 'v1',
    current: 'v2'
  },
  javascript: {
    prev: 'v5',
    current: 'v6'
  },
  'react-native': {
    prev: 'v5',
    current: 'v6'
  },
  react: {
    prev: 'v5',
    current: 'v6'
  },
  angular: {
    prev: 'v5',
    current: 'v6'
  },
  vue: {
    prev: 'v5',
    current: 'v6'
  },
  nextjs: {
    prev: 'v5',
    current: 'v6'
  }
} as const;
