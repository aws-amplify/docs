import Auth from "@aws-amplify/auth";
import Analytics from "@aws-amplify/analytics";
import awsexports from "../aws-exports";
import {Build} from "@stencil/core";

let configured = false;
if (!configured) {
  Auth.configure(awsexports);
  Analytics.configure(awsexports);
  if (Build.isBrowser) {
    // @ts-ignore
    AWSCShortbread({
      domain: ".amplify.aws",
    }).checkForCookieConsent();
  }
  if (Build.isBrowser) {
    // @ts-ignore
    if (typeof(s) != "undefined") s.trackExternalLinks = false;
  }
  configured = true;
}

export enum AnalyticsEventType {
  PAGE_VISIT = "PAGE_VISIT",
  INTERNAL_LINK_CLICK = "INTERNAL_LINK_CLICK",
  EXTERNAL_LINK_CLICK = "EXTERNAL_LINK_CLICK",
  PAGE_DATA_FETCH_EXCEPTION = "PAGE_DATA_FETCH_EXCEPTION",
}

interface AnalyticsEventPageVisit {
  type: AnalyticsEventType.PAGE_VISIT;
  attributes: {
    url: string;
    previousUrl: string;
    referrer: string;
  };
}

interface AnalyticsEventInternalLinkClick {
  type: AnalyticsEventType.INTERNAL_LINK_CLICK;
  attributes: {
    from: string;
    to: string;
  };
}

interface AnalyticsEventExternalLinkClick {
  type: AnalyticsEventType.EXTERNAL_LINK_CLICK;
  attributes: {
    from: string;
    to: string;
  };
}

interface AnalyticsEventPageDataFetchException {
  type: AnalyticsEventType.PAGE_DATA_FETCH_EXCEPTION;
  attributes: {
    url: string;
    exception: Error;
  };
}

type AnalyticsEvent =
  | AnalyticsEventPageVisit
  | AnalyticsEventInternalLinkClick
  | AnalyticsEventExternalLinkClick
  | AnalyticsEventPageDataFetchException;

export const track = (event: AnalyticsEvent): Promise<unknown> | undefined => {
  if (Build.isBrowser) {
    try {
      return Analytics.record(event.type, event.attributes);
    } catch (e) {
      console.error("Failed to execute track.");
    }
  }
};

export const trackPageVisit = (): void => {
  // @ts-ignore
  if (Build.isBrowser && typeof(s) != "undefined") {
    // @ts-ignore
    s.t();
  }
};

export const trackPageFetchException = (): void => {
  // @ts-ignore
  if (Build.isBrowser && typeof(s) != "undefined") {
    // @ts-ignore
    s.tl(true, "o", "page fetch exception");
  }
};

export const trackExternalLink = (): void => {
  // @ts-ignore
  if (Build.isBrowser && typeof(s) != "undefined") {
    // @ts-ignore
    s.tl(true, "e");
  }
};

export const setSearchQuery = (query: string): void => {
  // @ts-ignore
  if (Build.isBrowser && typeof(s) != "undefined") {
    // @ts-ignore
    s.eVar26 = query;
  }
};

export const trackSearchResult = (resultCount: number): void => {
  // @ts-ignore
  if (Build.isBrowser && typeof(s) != "undefined") {
    // @ts-ignore
    s.linkTrackVars = "eVar26,eVar27";
    // @ts-ignore
    s.eVar27 = resultCount;
    // @ts-ignore
    s.events = resultCount === 0 ? "event1" : "event2";
    // @ts-ignore
    s.tl(true, "o", "internal search");
  }
};
