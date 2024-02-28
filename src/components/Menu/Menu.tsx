import { ReactElement } from 'react';
import { MenuItem } from './MenuItem';
import { Platform } from '@/data/platforms';
import { PageNode } from '@/directory/directory';
import { findDirectoryNode } from '@/utils/findDirectoryNode';
import { BUILD_A_BACKEND, PREV_BUILD_A_BACKEND } from '@/data/routes';

type MenuProps = {
  currentPlatform?: Platform;
  path: string;
};

const invalidChildren = [
  '/gen1/[platform]/prev',
  '/gen1/[platform]/tools/cli-legacy',
  '/gen1/[platform]/sdk'
];

export function Menu({ currentPlatform, path }: MenuProps): ReactElement {
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
  if (isLegacy) {
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
    // replace build a backend with previous build a backend
    const buildABackend = findDirectoryNode(PREV_BUILD_A_BACKEND);
    childrenNodes = childrenNodes?.map((child) => {
      if (child.route === BUILD_A_BACKEND) {
        return buildABackend;
      }
      return child;
    });
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
