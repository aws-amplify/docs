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

export const trackPageFetchException = (): void => {
  if (typeof window !== 'undefined' && typeof s != 'undefined') {
    s.linkTrackVars =
      'prop39,prop41,prop50,prop61,prop62,eVar39,eVar41,eVar50,eVar61,eVar62,eVar69';
    s.tl(true, 'o', 'page fetch exception');
  }
};

export const trackExternalLink = (hrefTo: string): void => {
  if (typeof window !== 'undefined' && typeof s != 'undefined') {
    s.linkTrackVars =
      'prop39,prop41,prop50,prop61,prop62,eVar39,eVar41,eVar50,eVar61,eVar62,eVar69';
    s.tl(true, 'e', hrefTo);
  }
};

export const setSearchQuery = (query: string): void => {
  if (typeof window !== 'undefined' && typeof s != 'undefined') {
    s.eVar26 = query;
  }
};

const triggerNoSearchResults = (query: string): void => {
  const queryBackup: string = s.eVar26;
  const resultCountBackup: number = parseInt(s.eVar27, 10);

  s.eVar26 = query;
  s.eVar27 = '0'; // If it's the number 0, the variable won't be sent
  s.linkTrackVars =
    'prop39,prop41,prop50,prop61,prop62,eVar26,eVar27,eVar39,eVar41,eVar50,eVar61,eVar62,eVar69,events';
  s.linkTrackEvents = 'event2';
  s.events = 'event2';
  s.tl(true, 'o', 'internal search');

  s.eVar26 = queryBackup;
  s.eVar27 = resultCountBackup.toString();
};

let noResultsTimeout: NodeJS.Timeout;
export const setSearchResultCount = (resultCount: number): void => {
  if (typeof window !== 'undefined' && typeof s != 'undefined') {
    s.eVar27 = resultCount.toString();
    s.events = resultCount === 0 ? 'event1' : 'event2';

    if (resultCount === 0) {
      if (noResultsTimeout) {
        clearTimeout(noResultsTimeout);
      }
      noResultsTimeout = setTimeout(
        triggerNoSearchResults.bind(null, s.eVar26),
        1000
      );
    }
  }
};

export const trackSearchQuery = (_input, _event, suggestion): void => {
  if (typeof window !== 'undefined' && typeof s != 'undefined') {
    s.linkTrackVars =
      'prop39,prop41,prop50,prop61,prop62,eVar26,eVar27,eVar39,eVar41,eVar50,eVar61,eVar62,eVar69,events';
    s.linkTrackEvents = 'event1';
    s.events = 'event1';
    s.tl(true, 'o', 'internal search');
  }
  window.location.assign(suggestion.url);
};

export const trackFeedbackSubmission = (feedback: boolean) => {
  const opt = {
    event: {
      type: 'click',
      name: feedback ? 'YesVote' : 'NoVote'
    }
  };

  AWSMA.ready(() => {
    document.dispatchEvent(
      new CustomEvent(AWSMA.TRIGGER_EVENT, { detail: opt })
    );
  });
};

export const trackExpanderOpen = (expanderId) => {
  const opt = {
    event: {
      type: 'click',
      name: `ExpanderOpen.${expanderId}`
    }
  };

  AWSMA.ready(() => {
    document.dispatchEvent(
      new CustomEvent(AWSMA.TRIGGER_EVENT, { detail: opt })
    );
  });
};

export const trackCopyClicks = (data) => {
  const opt = {
    event: {
      type: 'click',
      name: 'CopyCode'
    },
    data: data
  };

  AWSMA.ready(() => {
    document.dispatchEvent(
      new CustomEvent(AWSMA.TRIGGER_EVENT, { detail: opt })
    );
  });
};

// Track the click on the "Whats new" banner component
export const trackWhatsNewBanner = () => {
  const opt = {
    event: {
      type: 'click',
      name: 'WhatsNewBanner'
    }
  };

  AWSMA.ready(() => {
    document.dispatchEvent(
      new CustomEvent(AWSMA.TRIGGER_EVENT, { detail: opt })
    );
  });
};

// Track the click on the Version Switcher component
export const trackVersionChange = (viewOld: boolean) => {
  const opt = {
    event: {
      type: 'click',
      name: `VersionChanged${viewOld ? 'Prev' : 'Current'}`
    }
  };

  AWSMA.ready(() => {
    document.dispatchEvent(
      new CustomEvent(AWSMA.TRIGGER_EVENT, { detail: opt })
    );
  });
};
