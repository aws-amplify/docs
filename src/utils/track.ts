let configured = false;
let AWSCShortbread;
let s;
let AWSMA;

if (
  typeof window !== 'undefined' &&
  typeof window.AWSCShortbread !== 'undefined'
) {
  AWSCShortbread = window.AWSCShortbread;
  AWSMA = window.AWSMA;
  s = window.s;

  if (!configured) {
    AWSCShortbread({
      domain: '.amplify.aws'
    }).checkForCookieConsent();
    if (typeof s != 'undefined') s.trackExternalLinks = false;
    configured = true;
  }
}

export enum AnalyticsEventType {
  PAGE_VISIT = 'PAGE_VISIT',
  INTERNAL_LINK_CLICK = 'INTERNAL_LINK_CLICK',
  EXTERNAL_LINK_CLICK = 'EXTERNAL_LINK_CLICK',
  PAGE_DATA_FETCH_EXCEPTION = 'PAGE_DATA_FETCH_EXCEPTION'
}

export const trackPageVisit = (): void => {
  if (typeof window !== 'undefined' && typeof s != 'undefined') {
    s.pageName = window.location.href;
    s.pageURL = window.location.href;
    s.t();
  }
};

export const trackExternalLink = (hrefTo: string): void => {
  if (typeof window !== 'undefined' && typeof s != 'undefined') {
    s.linkTrackVars =
      'prop39,prop41,prop50,prop61,prop62,eVar39,eVar41,eVar50,eVar61,eVar62,eVar69';
    s.tl(true, 'e', hrefTo);
  }
};

export const trackFeedbackSubmission = (feedback: boolean) => {
  const opt = {
    event: {
      type: 'click',
      name: feedback ? 'YesVote' : 'NoVote'
    }
  };

  if (AWSMA) {
    AWSMA.ready(() => {
      document.dispatchEvent(
        new CustomEvent(AWSMA.TRIGGER_EVENT, { detail: opt })
      );
    });
  }
};

export const trackExpanderOpen = (expanderId) => {
  const opt = {
    event: {
      type: 'click',
      name: `ExpanderOpen.${expanderId}`
    }
  };

  if (AWSMA) {
    AWSMA.ready(() => {
      document.dispatchEvent(
        new CustomEvent(AWSMA.TRIGGER_EVENT, { detail: opt })
      );
    });
  }
};

export const trackCopyClicks = (data) => {
  const opt = {
    event: {
      type: 'click',
      name: 'CopyCode'
    },
    data: data
  };

  if (AWSMA) {
    AWSMA.ready(() => {
      document.dispatchEvent(
        new CustomEvent(AWSMA.TRIGGER_EVENT, { detail: opt })
      );
    });
  }
};

// Track the click on the "Whats new" banner component
export const trackWhatsNewBanner = () => {
  const opt = {
    event: {
      type: 'click',
      name: 'WhatsNewBanner'
    }
  };

  if (AWSMA) {
    AWSMA.ready(() => {
      document.dispatchEvent(
        new CustomEvent(AWSMA.TRIGGER_EVENT, { detail: opt })
      );
    });
  }
};

// Track the click on the Version Switcher component
export const trackVersionChange = (viewOld: boolean) => {
  const opt = {
    event: {
      type: 'click',
      name: `VersionChanged${viewOld ? 'Prev' : 'Current'}`
    }
  };

  if (AWSMA) {
    AWSMA.ready(() => {
      document.dispatchEvent(
        new CustomEvent(AWSMA.TRIGGER_EVENT, { detail: opt })
      );
    });
  }
};
