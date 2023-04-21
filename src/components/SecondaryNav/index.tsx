import {
  HostStyle,
  LinkActiveStyle,
  LinkInactiveStyle,
  SecondaryNavStyle,
  SearchBarContainer
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
import { useEffect, useState } from 'react';

export default function SecondaryNav() {
  const router = useRouter();
  const path = router.asPath;
  const [apiUrl, setApiUrl] = useState('');

  useEffect(() => {
    const filterKeys = parseLocalStorage('filterKeys', {});
    if ('platform' in filterKeys) {
      switch ((filterKeys as { platform: string }).platform) {
        case 'ios': {
          setApiUrl(IOS_REFERENCE);
          break;
        }
        case 'android': {
          setApiUrl(ANDROID_REFERENCE);
          break;
        }
        default: {
          setApiUrl(JS_REFERENCE);
        }
      }
    }
  });

  let secondaryNavItems = [
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
    }
  ];

  if (apiUrl) {
    secondaryNavItems.push({
      label: 'API Reference',
      url: apiUrl,
      external: true
    });
  }

  return (
    <HostStyle>
      <Container>
        <SecondaryNavStyle id="secondary-nav">
          <div className="secondary-nav-links">
            {secondaryNavItems.map(
              ({ url, label, external, additionalActiveChildRoots }) => {
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
              }
            )}
          </div>
          <SearchBarContainer>
            <SearchBar />
          </SearchBarContainer>
        </SecondaryNavStyle>
      </Container>
    </HostStyle>
  );
}
