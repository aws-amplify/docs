import Link from 'next/link';
import { ActiveSwitchStyle, SwitchStyle } from './styles';
import directory from '../../../directory/directory.mjs';

const Option = function({ href, title, isActive }) {
  const SwitchStyle = isActive ? ActiveSwitchStyle : 'a';
  return (
    <div>
      <Link href={href} legacyBehavior>
        <SwitchStyle href={href}>
          <span>{title}</span>
        </SwitchStyle>
      </Link>
    </div>
  );
};

const lib = directory['lib'].items;
const libAlt = directory['lib-v1'].items;
const libAlternativePaths: string[] = [];
const libPaths: string[] = [];
const libItemsAndPaths: [object, string[]][] = [
  [lib, libPaths],
  [libAlt, libAlternativePaths]
];
for (const [dirItems, paths] of libItemsAndPaths) {
  for (const [_, value] of Object.entries(dirItems)) {
    const { items } = value;
    items.forEach((item) => {
      const { route, filters } = item;
      filters.forEach((filter) => {
        const path = route + '/q/platform/' + filter;
        paths.push(path);
      });
      paths.push(route);
    });
  }
}
libAlternativePaths.push('/lib-v1');
libPaths.push('/lib');

export function LibVersionSwitcher({
  url,
  alternativeVersion,
  primaryVersion
}: {
  url: string;
  alternativeVersion: string;
  primaryVersion: string;
}) {
  let primaryActive;
  let urlEnd;

  function hrefWithoutParams(href) {
    href = href.split('#')[0];
    if (href.endsWith('/')) {
      href = href.substring(0, href.length - 1);
    }
    return href;
  }

  const filter = url.includes('/platform')
    ? 'q/platform' + hrefWithoutParams(url).split('/platform')[1]
    : '';

  const alternativeLib = '/lib-v1';
  const primaryLib = '/lib';

  if (url.includes(alternativeLib)) {
    primaryActive = false;
    urlEnd = url.split(alternativeLib)[1];
  } else {
    primaryActive = true;
    urlEnd = url.split(primaryLib)[1];
  }

  // Function to remove query string parameters before checking if href is included in the list of possibilities.
  // This is so we are only comparing the paths without the query string parameters to avoid false negatives.
  function isHrefIncluded(href: string, paths: string[]) {
    href = hrefWithoutParams(href);
    return paths.includes(href);
  }

  const alternativeHref = alternativeLib + urlEnd;
  const alternativeOption = {
    title: !isJsFilter(filter)
      ? alternativeVersion
      : `${alternativeVersion} (preview)`,
    href: isHrefIncluded(alternativeHref, libAlternativePaths)
      ? alternativeHref
      : '/lib-v1/' + filter
  };

  const primaryHref = primaryLib + urlEnd;

  const primaryOptionDescription = isJsFilter(filter) ? 'preview' : 'latest';
  const primaryOption = {
    title: isJsFilter(filter) ? primaryVersion : `${primaryVersion} (latest)`,
    href: isHrefIncluded(primaryHref, libPaths) ? primaryHref : '/lib/' + filter
  };

  const leftOption = isJsFilter(filter) ? primaryOption : alternativeOption;
  const rightOption = isJsFilter(filter) ? alternativeOption : primaryOption;
  const rightActive = isJsFilter(filter) ? !primaryActive : primaryActive;

  return (
    <SwitchStyle>
      <Option
        href={leftOption.href}
        title={leftOption.title}
        isActive={!rightActive}
      />
      <Option
        href={rightOption.href}
        title={rightOption.title}
        isActive={rightActive}
      />
    </SwitchStyle>
  );
}

function isJsFilter(filter: string) {
  return filter === 'q/platform/react-native' || filter === 'q/platform/js';
}
