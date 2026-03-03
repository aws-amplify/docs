import { ReactElement } from 'react';
import { MenuItem } from './MenuItem';
import { Platform, PLATFORMS } from '@/data/platforms';
import { PageNode } from '@/directory/directory';
import { findDirectoryNode } from '@/utils/findDirectoryNode';
import { TopNavSection } from '@/components/SectionContext/SectionContext';

type MenuProps = {
  currentPlatform?: Platform;
  path: string;
  /** When provided, scopes the sidebar to only show pages within this section */
  section?: TopNavSection;
};

const invalidChildren = [
  '/gen1/[platform]/prev',
  '/gen1/[platform]/tools/cli-legacy',
  '/gen1/[platform]/sdk'
];

/**
 * Extracts the platform from a URL path by checking the first segment
 * against known platforms.
 */
function extractPlatform(path: string): string | null {
  const segments = path.split('/').filter(Boolean);
  if (segments.length === 0) return null;

  // For gen1 paths, platform is the second segment
  if (segments[0] === 'gen1') {
    return segments.length > 1 && PLATFORMS.includes(segments[1] as Platform)
      ? segments[1]
      : null;
  }

  // For gen2 paths, platform is the first segment
  return PLATFORMS.includes(segments[0] as Platform) ? segments[0] : null;
}

export function Menu({
  currentPlatform,
  path,
  section
}: MenuProps): ReactElement {
  // Depending on the the page we're on, we could have the following keywords at these subpaths
  // Split them out so we can figure out what kind of page it is
  const pathSplit = path.split('/');

  // ex: docs.amplify.aws/gen1/...
  const isGen1 = pathSplit[1] === 'gen1';

  // ex: docs.amplify.aws/gen1/[platform]/prev/...
  const isPrev = pathSplit[3] === 'prev';

  // ex: docs.amplify.aws/gen1/[platform]/tools/cli-legacy/...
  const isLegacy = pathSplit[4] === 'cli-legacy';

  // ex: docs.amplify.aws/gen1/[platform]/sdk/...
  const isSDK = pathSplit[3] === 'sdk';

  let rootMenuNode, childrenNodes, baseMenu;

  // When a section is provided (Gen2 section-scoped sidebar), resolve its
  // routePrefix with the actual platform and use that as the directory root
  if (section && !isGen1) {
    const platform = extractPlatform(path);
    if (platform) {
      const resolvedPrefix = section.routePrefix.replace(
        '[platform]',
        platform
      );
      rootMenuNode = findDirectoryNode(resolvedPrefix);
    }

    if (rootMenuNode) {
      childrenNodes = rootMenuNode.children;
    } else {
      // findDirectoryNode returned null — render empty sidebar with message
      return (
        <nav className="menu" aria-label="Main">
          <ul className="menu__list">
            <li className="menu__list-item menu__list-item--empty">
              No pages found for this section.
            </li>
          </ul>
        </nav>
      );
    }
  } else if (isLegacy) {
    rootMenuNode = {
      children: [findDirectoryNode('/gen1/[platform]/tools/cli-legacy')]
    };
    childrenNodes = rootMenuNode.children;
  } else if (isSDK) {
    rootMenuNode = { children: [findDirectoryNode('/gen1/[platform]/sdk')] };
    childrenNodes = rootMenuNode.children;
  } else if (isGen1) {
    rootMenuNode = findDirectoryNode('/gen1/[platform]');
    childrenNodes = rootMenuNode?.children?.filter((childNode) => {
      return (
        invalidChildren.indexOf(childNode.route) === -1 ||
        childNode.isUnfilterable
      );
    });
  } else {
    baseMenu = true;
    rootMenuNode = findDirectoryNode('/[platform]');
    childrenNodes = rootMenuNode?.children;
  }

  if (isPrev) {
    const rootMenuNode = findDirectoryNode('/gen1/[platform]/prev');
    childrenNodes = rootMenuNode?.children;
  }

  return (
    <nav className="menu" aria-label="Main">
      <ul className="menu__list">
        {childrenNodes &&
          childrenNodes.map((child, index) => {
            return (
              <MenuItem
                key={index}
                pageNode={child as PageNode}
                parentSetOpen={null}
                level={1}
                hideChildren={child.hideChildrenOnBase && baseMenu}
                {...(currentPlatform
                  ? { currentPlatform: currentPlatform }
                  : {})}
              />
            );
          })}
      </ul>
    </nav>
  );
}
