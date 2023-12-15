import Link from 'next/link';
import { Breadcrumbs } from '@aws-amplify/ui-react';
import { findDirectoryNode as findNode } from '@/utils/findDirectoryNode';
import classNames from 'classnames';
import { PLATFORM_DISPLAY_NAMES } from '@/data/platforms';

type BreadcrumbItem = {
  href: { pathname: string; query?: { platform: string } };
  label: string;
  isDisabled?: boolean;
};

type Props = {
  route: string;
  platform: string;
};

const overrides = {
  '/': 'Home',
  '/javascript/prev': 'V5',
  '/swift/prev': 'V1',
  '/android/prev': 'V1',
  '/flutter/prev': 'V0',
  '/react/prev': 'V5',
  '/react-native/prev': 'V5',
  '/angular/prev': 'V5',
  '/nextjs/prev': 'V5',
  '/vue/prev': 'V5',
  '/javascript': PLATFORM_DISPLAY_NAMES['javascript'],
  '/react': PLATFORM_DISPLAY_NAMES['react'],
  '/flutter': PLATFORM_DISPLAY_NAMES['flutter'],
  '/swift': PLATFORM_DISPLAY_NAMES['swift'],
  '/android': PLATFORM_DISPLAY_NAMES['android'],
  '/react-native': PLATFORM_DISPLAY_NAMES['react-native'],
  '/angular': PLATFORM_DISPLAY_NAMES['angular'],
  '/nextjs': PLATFORM_DISPLAY_NAMES['nextjs'],
  '/vue': PLATFORM_DISPLAY_NAMES['vue']
};

function generateBreadcrumbs(
  route: string,
  platform: string
): BreadcrumbItem[] {
  const breadcrumbs: BreadcrumbItem[] = [];

  const pieces = route.split('/').filter((str) => str);
  const urls: string[] = [];
  for (let i = 1; i <= pieces.length; i++) {
    urls.push(`/${pieces.slice(0, i).join('/')}`);
  }

  urls.forEach((url) => {
    const directoryEntry = findNode(url);
    const href = {
      pathname: url
    };
    if (url.includes('[platform]')) {
      href['query'] = { platform };
    }
    let label = directoryEntry ? directoryEntry.title : url;
    const override = overrides[url]
      ? overrides[url]
      : overrides[url.replace('[platform]', platform)];

    if (override) {
      label = override;
    }

    breadcrumbs.push({
      href,
      label
    });
  });

  return breadcrumbs;
}

function BreadcrumbsComponent({ route, platform }: Props) {
  const items = generateBreadcrumbs(route, platform);
  return items.length > 1 ? (
    <div className={'breadcrumb__container'}>
      <Breadcrumbs.Container>
        {items?.map(({ href, label }, i) => {
          const isCurrent = i === items.length - 1;
          return (
            <Breadcrumbs.Item key={href.pathname} className="breadcrumb__item">
              <Link
                href={href}
                passHref
                className={classNames(
                  'amplify-link',
                  'amplify-breadcrumbs__link',
                  { 'amplify-breadcrumbs__link--current': isCurrent }
                )}
                aria-current={isCurrent || undefined}
              >
                {label}
              </Link>
              {isCurrent ? null : <Breadcrumbs.Separator />}
            </Breadcrumbs.Item>
          );
        })}
      </Breadcrumbs.Container>
    </div>
  ) : (
    <></>
  );
}

export { BreadcrumbsComponent as Breadcrumbs };
