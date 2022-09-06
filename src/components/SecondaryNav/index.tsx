import {
  HostStyle,
  LinkActiveStyle,
  LinkInactiveStyle,
  SecondaryNavStyle,
  SearchBarContainer,
  ShadowStyle
} from './styles';
import {
  IOS_REFERENCE,
  ANDROID_REFERENCE,
  JS_REFERENCE,
  HOSTING_REFERENCE
} from '../../constants/links';
import ExternalLink from '../ExternalLink';
import InternalLink from '../InternalLink';
import { useRouter } from 'next/router';
import { Container } from '../Container';
import { parseLocalStorage } from '../../utils/parseLocalStorage';

import SearchBar from '../SearchBar';
import { useBreakpointValue } from '@aws-amplify/ui-react';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

export default function SecondaryNav() {
  const router = useRouter();
  const path = router.asPath;
  const filterKeys = parseLocalStorage('filterKeys', {});

  let windowInnerWidth;
  if (typeof window === 'undefined') {
    windowInnerWidth = 0;
  } else {
    windowInnerWidth = window.innerWidth;
  }

  const [isMobileState, setIsMobileState] = useState(false);
  const [mobileNavBreakpoint, setMobileNavBreakpoint] = useState(0);
  const [currentWindowInnerWidth, setCurrentWindowInnerWidth] = useState(
    windowInnerWidth
  );

  const navLinksContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (navLinksContainerRef.current !== null) {
      if (
        navLinksContainerRef.current.scrollWidth >
        navLinksContainerRef.current.clientWidth
      ) {
        setIsMobileState(true);
        setMobileNavBreakpoint(window.innerWidth);
      }
    }

    const handleWindowSizeChange = () => {
      setCurrentWindowInnerWidth(window.innerWidth);

      if (navLinksContainerRef.current !== null) {
        if (
          navLinksContainerRef.current.scrollWidth >
          navLinksContainerRef.current.clientWidth
        ) {
          setIsMobileState(true);
          setMobileNavBreakpoint(window.innerWidth);
        }
      }
    };

    window.addEventListener('resize', handleWindowSizeChange);

    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  useLayoutEffect(() => {
    if (currentWindowInnerWidth > mobileNavBreakpoint) {
      setIsMobileState(false);
    }
  }, [currentWindowInnerWidth, mobileNavBreakpoint]);

  return (
    <HostStyle>
      <Container>
        <SecondaryNavStyle
          id="secondary-nav"
          style={{
            flexDirection: isMobileState ? 'column' : 'row',
            alignItems: isMobileState ? 'flex-start' : 'center'
          }}
        >
          <div className="secondary-nav-links" ref={navLinksContainerRef}>
            {[
              {
                label: 'Getting Started',
                url: '/start'
              },
              {
                label: 'Libraries',
                url: '/lib',
                additionalActiveChildRoots: ['/lib', '/sdk']
              },
              {
                label: 'CLI',
                url: '/cli'
              },
              {
                label: 'Studio',
                url: '/console'
              },
              {
                label: 'Hosting',
                url: HOSTING_REFERENCE,
                external: true
              },
              {
                label: 'Guides',
                url: '/guides'
              },
              ...('platform' in filterKeys &&
              (filterKeys as { platform: string }).platform
                ? [
                    {
                      label: 'API Reference',
                      url: (() => {
                        switch ((filterKeys as { platform: string }).platform) {
                          case 'ios': {
                            return IOS_REFERENCE;
                          }
                          case 'android': {
                            return ANDROID_REFERENCE;
                          }
                          default: {
                            return JS_REFERENCE;
                          }
                        }
                      })(),
                      external: true
                    }
                  ]
                : [])
            ].map(({ url, label, external, additionalActiveChildRoots }) => {
              const matchingRoots =
                additionalActiveChildRoots === undefined
                  ? [url]
                  : [url, ...additionalActiveChildRoots];
              const active = matchingRoots.some((root) => {
                return path.startsWith(root);
              });
              const LinkStyle = active ? LinkActiveStyle : LinkInactiveStyle;
              if (external) {
                return (
                  <ExternalLink href={url} key={label} graphic="black">
                    <span>{label}</span>
                  </ExternalLink>
                );
              } else {
                return (
                  <InternalLink href={url} key={label}>
                    <LinkStyle href={url}>{label}</LinkStyle>
                  </InternalLink>
                );
              }
            })}
            <ShadowStyle />
          </div>
          <SearchBarContainer
            style={{
              width: isMobileState ? '100%' : '120px'
            }}
          >
            <SearchBar />
          </SearchBarContainer>
        </SecondaryNavStyle>
      </Container>
    </HostStyle>
  );
}
