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
const libLegacy = directory['lib-v1'].items;
const libLegacyPaths: string[] = [];
const libPaths: string[] = [];
const libItemsAndPaths: [object, string[]][] = [
  [lib, libPaths],
  [libLegacy, libLegacyPaths]
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
libLegacyPaths.push('/lib-v1');
libPaths.push('/lib');

export function LibVersionSwitcher({
  url,
  legacyVersion,
  latestVersion
}: {
  url: string;
  legacyVersion: string;
  latestVersion: string;
}) {
  let rightActive;
  let urlEnd;
  const filter = url.includes('/platform')
    ? 'q/platform' + url.split('/platform')[1]
    : '';

  if (url.includes('/lib-v1')) {
    rightActive = false;
    urlEnd = url.split('/lib-v1')[1];
  } else {
    rightActive = true;
    urlEnd = url.split('/lib')[1];
  }

  // Function to remove query string parameters before checking if href is included in the list of possibilities.
  // This is so we are only comparing the paths without the query string parameters to avoid false negatives.
  function isHrefIncluded(href: string, paths: string[]) {
    href = href.split('#')[0];
    if (href.endsWith('/')) {
      href = href.substring(0, href.length - 1);
    }
    return paths.includes(href);
  }

  const leftHref = '/lib-v1' + urlEnd;
  const leftOption = {
    title: legacyVersion,
    href: isHrefIncluded(leftHref, libLegacyPaths)
      ? leftHref
      : '/lib-v1/' + filter
  };

  const rightHref = '/lib' + urlEnd;
  const rightOption = {
    title: `${latestVersion} (latest)`,
    href: isHrefIncluded(rightHref, libPaths) ? rightHref : '/lib/' + filter
  };

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
