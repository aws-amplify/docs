export type Platform = 'android' | 'javascript';
export type Platforms = Platform[];

export const PLATFORMS: Platforms = ['android', 'javascript'];

export const PLATFORM_DISPLAY_NAMES: Record<Platform, string> = {
  android: 'Android',
  javascript: 'JavaScript'
};
