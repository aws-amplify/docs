interface AdobeS {
  // Configuration properties
  trackExternalLinks: boolean;

  // Variables to set when tracking
  linkTrackVars: string;
  linkTrackEvents: string;
  events: string;
  pageURL: string;
  eVar26: string;
  eVar27: string;

  // Tracking functions
  t: () => void;
  tl: (
    linkObject: true | undefined,
    linkType: string,
    linkName: string,
  ) => void;
}

interface AWSCShortbreadObject {
  checkForCookieConsent: () => void;
}

declare const s: AdobeS;
declare const docsearch: (obj: object) => void;
declare const AWSCShortbread: (obj: object) => AWSCShortbreadObject;
