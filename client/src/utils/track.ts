import Auth from "@aws-amplify/auth";
import Analytics from "@aws-amplify/analytics";
import awsexports from "../aws-exports";
import {Build} from "@stencil/core";

let configured = false;
if (!configured) {
  Auth.configure(awsexports);
  Analytics.configure(awsexports);
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
