/**
 * so that we can be certain that our data is specified correctly below,
 * without losing any specificity in the inferred type
 */

export interface FilterOptionMetadata {
  label: string;
  graphicURI: string;
}

type FilterMetadataByOption<T extends readonly string[]> = Record<
  T[number],
  FilterOptionMetadata
>;

/**
 * platform filter constants
 */

export const PLATFORM_FILTER_OPTIONS = [
  "js",
  "android",
  "ios",
  "flutter",
] as const;

export const platformFilterMetadataByOption: FilterMetadataByOption<typeof PLATFORM_FILTER_OPTIONS> = {
  js: {
    label: "JavaScript",
    graphicURI: "/assets/integrations/js.svg",
  },
  android: {
    label: "Android",
    graphicURI: "/assets/integrations/android.svg",
  },
  ios: {
    label: "iOS",
    graphicURI: "/assets/integrations/ios.svg",
  },
  flutter: {
    label: "Flutter",
    graphicURI: "/assets/integrations/flutter.svg",
  },
} as const;

/**
 * framework filter constants
 */

export const FRAMEWORK_FILTER_OPTIONS = [
  "react",
  "react-native",
  "angular",
  "vue",
  "ionic",
  "next",
] as const;

export const frameworkFilterMetadataByOption: FilterMetadataByOption<typeof FRAMEWORK_FILTER_OPTIONS> = {
  react: {
    label: "React",
    graphicURI: "/assets/integrations/react.svg",
  },
  "react-native": {
    label: "React Native",
    graphicURI: "/assets/integrations/react-native.svg",
  },
  angular: {
    label: "Angular",
    graphicURI: "/assets/integrations/angular.svg",
  },
  vue: {
    label: "Vue",
    graphicURI: "/assets/integrations/vue.svg",
  },
  ionic: {
    label: "Ionic",
    graphicURI: "/assets/integrations/ionic.svg",
  },
  next: {
    label: "Next.js",
    graphicURI: "/assets/integrations/next.svg",
  },
} as const;

export const mobileFilterMetadataByOption = {
  android: platformFilterMetadataByOption.android,
  ios: platformFilterMetadataByOption.ios,
  "react-native": frameworkFilterMetadataByOption["react-native"],
  ionic: frameworkFilterMetadataByOption.ionic,
  flutter: platformFilterMetadataByOption.flutter,
};

export const webFilterMetadataByOption = {
  js: platformFilterMetadataByOption.js,
  react: frameworkFilterMetadataByOption.react,
  angular: frameworkFilterMetadataByOption.angular,
  vue: frameworkFilterMetadataByOption.vue,
  next: frameworkFilterMetadataByOption.next,
};

/**
 * integration framework constants (a combo of platform & filter constants)
 */

export const integrationFilterOptions = [
  ...PLATFORM_FILTER_OPTIONS,
  ...FRAMEWORK_FILTER_OPTIONS,
] as const;

export const integrationFilterMetadataByOption: FilterMetadataByOption<typeof integrationFilterOptions> = {
  ...platformFilterMetadataByOption,
  ...frameworkFilterMetadataByOption,
};

/**
 * make the metadata accessible via this dictionary
 */

export const filterMetadataByOptionByName = {
  platform: platformFilterMetadataByOption,
  framework: frameworkFilterMetadataByOption,
  integration: integrationFilterMetadataByOption,
} as const;

/**
 * for use in both the Capi config & client, anywhere we need to iterate through options x key
 */

export const filterOptionsByName = {
  platform: PLATFORM_FILTER_OPTIONS,
  framework: FRAMEWORK_FILTER_OPTIONS,
  integration: integrationFilterOptions,
};
