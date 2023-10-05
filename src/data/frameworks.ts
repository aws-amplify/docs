export type Framework = 'android' | 'javascript';
export type Frameworks = Framework[];

export const FRAMEWORKS: Frameworks = ['android', 'javascript'];

export const FRAMEWORK_DISPLAY_NAMES: Record<Framework, string> = {
  android: 'Android',
  javascript: 'JavaScript'
};
