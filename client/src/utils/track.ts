import Auth from "@aws-amplify/auth";
import Analytics from "@aws-amplify/analytics";
import awsexports from "../aws-exports";
import {Build} from "@stencil/core";

let configured = false;
let firstPageOfVisit = true;
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
    if (typeof s != "undefined") s.trackExternalLinks = false;
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
  if (Build.isBrowser && typeof s != "undefined" && !firstPageOfVisit) {
    // @ts-ignore
    s.pageURL = window.location.href;
    // @ts-ignore
    s.t();
  }
  firstPageOfVisit = false;
};

export const trackPageFetchException = (): void => {
  // @ts-ignore
  if (Build.isBrowser && typeof s != "undefined") {
    // @ts-ignore
    s.linkTrackVars =
      "prop39,prop41,prop50,prop61,prop62,eVar39,eVar41,eVar50,eVar61,eVar62,eVar69";
    // @ts-ignore
    s.tl(true, "o", "page fetch exception");
  }
};

export const trackExternalLink = (hrefTo: string): void => {
  // @ts-ignore
  if (Build.isBrowser && typeof s != "undefined") {
    // @ts-ignore
    s.tl(true, "e", hrefTo);
  }
};

export const setSearchQuery = (query: string): void => {
  // @ts-ignore
  if (Build.isBrowser && typeof s != "undefined") {
    // @ts-ignore
    s.eVar26 = query;
  }
};

const triggerNoSearchResults = (query: string): void => {
  // @ts-ignore
  const queryBackup: string = s.eVar26;
  // @ts-ignore
  const resultCountBackup: number = s.eVar27;

  // @ts-ignore
  s.eVar26 = query;
  // @ts-ignore
  s.eVar27 = "0"; // If it's the number 0, the variable won't be sent
  // @ts-ignore
  s.linkTrackVars =
    "prop39,prop41,prop50,prop61,prop62,eVar26,eVar27,eVar39,eVar41,eVar50,eVar61,eVar62,eVar69,events";
  // @ts-ignore
  s.linkTrackEvents = "event2";
  // @ts-ignore
  s.events = "event2";
  // @ts-ignore
  s.tl(true, "o", "internal search");

  // @ts-ignore
  s.eVar26 = queryBackup;
  // @ts-ignore
  s.eVar27 = resultCountBackup;
};

let noResultsTimeout: NodeJS.Timeout;
export const setSearchResultCount = (resultCount: number): void => {
  // @ts-ignore
  if (Build.isBrowser && typeof s != "undefined") {
    // @ts-ignore
    s.eVar27 = resultCount;
    // @ts-ignore
    s.events = resultCount === 0 ? "event1" : "event2";

    if (resultCount === 0) {
      if (noResultsTimeout) {
        clearTimeout(noResultsTimeout);
      }
      noResultsTimeout = setTimeout(
        // @ts-ignore
        triggerNoSearchResults.bind(null, s.eVar26),
        1000,
      );
    }
  }
};

export const trackSearchQuery = (
  _input,
  _event,
  suggestion,
  _datasetNumber,
  _context,
): void => {
  // @ts-ignore
  if (Build.isBrowser && typeof s != "undefined") {
    // @ts-ignore
    s.linkTrackVars =
      "prop39,prop41,prop50,prop61,prop62,eVar26,eVar27,eVar39,eVar41,eVar50,eVar61,eVar62,eVar69,events";
    // @ts-ignore
    s.linkTrackEvents = "event1";
    // @ts-ignore
    s.events = "event1";
    // @ts-ignore
    s.tl(true, "o", "internal search");
  }
  window.location.assign(suggestion.url);
};
