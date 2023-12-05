export type Platform = 'android' | 'flutter' | 'swift' | JSPlatform;

export type JSPlatform =
  | 'angular'
  | 'javascript'
  | 'nextjs'
  | 'react'
  | 'react-native'
  | 'vue';

export type Platforms = Platform[];
export type JSPlatforms = JSPlatform[];

export const JS_PLATFORMS: JSPlatforms = [
  'angular',
  'javascript',
  'nextjs',
  'react',
  'react-native',
  'vue'
];

export const PLATFORMS: Platforms = [
  'android',
  'flutter',
  'swift',
  ...JS_PLATFORMS
];

export const PLATFORM_DISPLAY_NAMES: Record<Platform, string> = {
  android: 'Android',
  angular: 'Angular',
  flutter: 'Flutter',
  javascript: 'JavaScript',
  nextjs: 'Next.js',
  react: 'React',
  'react-native': 'React Native',
  swift: 'Swift',
  vue: 'Vue'
};

export const PLATFORM_VERSIONS = {
  android: {
    prev: 'v1',
    current: 'v2'
  },
  swift: {
    prev: 'v1',
    current: 'v2'
  },
  flutter: {
    prev: 'v0',
    current: 'v1'
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
};

export const DEFAULT_PLATFORM: Platform = 'react';
