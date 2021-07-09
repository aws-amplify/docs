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
 * filter constants
 */
export const FILTER_OPTIONS = [
  "js",
  "android",
  "ios",
  "flutter",
  "react",
  "react-native",
  "angular",
  "vue",
  "ionic",
  "next",
];

export const filterMetadataByOption: FilterMetadataByOption<typeof FILTER_OPTIONS> = {
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
