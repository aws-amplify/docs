import Link from 'next/link';
import { Breadcrumbs } from '@aws-amplify/ui-react';
import { findDirectoryNode as findNode } from '@/utils/findDirectoryNode';
import classNames from 'classnames';
import { PLATFORMS } from '@/constants/platforms';

type BreadcrumbItem = {
  href: { pathname: string; query?: { platform: string } };
  label: string;
  isDisabled?: boolean;
};

type Props = {
  route: string;
  platform?: string;
};

const overrides = {
  '/': 'Home',
  '/gen1': 'Gen 1',
  '/gen1/javascript/prev': 'V5',
  '/gen1/swift/prev': 'V1',
  '/gen1/android/prev': 'V1',
  '/gen1/flutter/prev': 'V1',
  '/gen1/react/prev': 'V5',
  '/gen1/react-native/prev': 'V5',
  '/gen1/angular/prev': 'V5',
  '/gen1/nextjs/prev': 'V5',
  '/gen1/vue/prev': 'V5',
  '/gen1/javascript': PLATFORMS['javascript'],
  '/gen1/react': PLATFORMS['react'],
  '/gen1/flutter': PLATFORMS['flutter'],
  '/gen1/swift': PLATFORMS['swift'],
  '/gen1/android': PLATFORMS['android'],
  '/gen1/react-native': PLATFORMS['react-native'],
  '/gen1/angular': PLATFORMS['angular'],
  '/gen1/nextjs': PLATFORMS['nextjs'],
  '/gen1/vue': PLATFORMS['vue'],
  '/javascript': PLATFORMS['javascript'],
  '/react': PLATFORMS['react'],
  '/flutter': PLATFORMS['flutter'],
  '/swift': PLATFORMS['swift'],
  '/android': PLATFORMS['android'],
  '/react-native': PLATFORMS['react-native'],
  '/angular': PLATFORMS['angular'],
  '/nextjs': PLATFORMS['nextjs'],
  '/vue': PLATFORMS['vue']
};

function generateBreadcrumbs(
  route: string,
  platform?: string
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
      : overrides[url.replace('[platform]', platform!)];

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
