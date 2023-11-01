import Link from 'next/link';
import { Breadcrumbs } from '@aws-amplify/ui-react';
import { findDirectoryNode as findNode } from '@/utils/findDirectoryNode';
import classNames from 'classnames';

type BreadcrumbItem = {
  href: { pathname: string; query?: { platform: string } };
  label: string;
  isDisabled?: boolean;
  isGen2?: boolean;
};

type Props = {
  route: string;
  platform: string;
};

const overrides = {
  '/': 'Home'
};

function generateBreadcrumbs(
  route: string,
  platform: string
): BreadcrumbItem[] {
  const breadcrumbs: BreadcrumbItem[] = [];

  const pieces = route.split('/').filter((str) => str);
  let urls: string[] = [];
  for (let i = 1; i <= pieces.length; i++) {
    urls.push(`/${pieces.slice(0, i).join('/')}`);
  }
  urls.splice(0, 0, '/');

  urls.forEach((url) => {
    const directoryEntry = findNode(url);
    let href = {
      pathname: url
    };
    if (url.includes('[platform]')) {
      href['query'] = { platform };
    }
    let label = directoryEntry ? directoryEntry.title : url;
    const override = overrides[url.replace('[platform]', platform)];
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
            <Breadcrumbs.Item
              key={href.pathname}
              paddingTop="small"
              className="breadcrumb__item"
            >
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
