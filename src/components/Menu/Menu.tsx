import { ReactElement } from 'react';
import { MenuItem } from './MenuItem';
import { Platform } from '@/data/platforms';
import { PageNode } from '@/directory/directory';
import { findDirectoryNode } from '@/utils/findDirectoryNode';

type MenuProps = {
  currentPlatform?: Platform;
  path: string;
};

const invalidChildren = [
  '/legacy/gen1/[platform]/prev',
  '/legacy/gen1/[platform]/tools/cli-legacy',
  '/legacy/gen1/[platform]/sdk'
];

export function Menu({ currentPlatform, path }: MenuProps): ReactElement {
  // Depending on the the page we're on, we could have the following keywords at these subpaths
  // Split them out so we can figure out what kind of page it is
  const pathSplit = path.split('/');

  const isLegacy = pathSplit[1] === 'legacy'
  // ex: docs.amplify.aws/legacy/gen1/...
  const isGen1 = pathSplit[2] === 'gen1';

  // ex: docs.amplify.aws/legacy/gen1/[platform]/prev/...
  const isPrev = pathSplit[4] === 'prev';

  // ex: docs.amplify.aws/legacy/gen1/[platform]/tools/cli-legacy/...
  const isCLILegacy = pathSplit[5] === 'cli-legacy';

  // ex: docs.amplify.aws/legacy/gen1/[platform]/sdk/...
  const isSDK = pathSplit[4] === 'sdk';

  let rootMenuNode, childrenNodes, baseMenu;
  if (isCLILegacy) {
    rootMenuNode = {
      children: [findDirectoryNode('/legacy/gen1/[platform]/tools/cli-legacy')]
    };
    childrenNodes = rootMenuNode.children;
  } else if (isSDK) {
    rootMenuNode = {
      children: [findDirectoryNode('/legacy/gen1/[platform]/sdk')]
    };
    childrenNodes = rootMenuNode.children;
  } else if (isGen1) {
    rootMenuNode = findDirectoryNode('/legacy/gen1/[platform]');
    childrenNodes = rootMenuNode?.children?.filter((childNode) => {
      return (
        invalidChildren.indexOf(childNode.route) === -1 ||
        childNode.isUnfilterable
      );
    });
  } else if(isLegacy) {
    rootMenuNode = findDirectoryNode('/legacy/[platform]');
    childrenNodes = rootMenuNode?.children;
  } else {
    rootMenuNode = findDirectoryNode('/');
    childrenNodes = rootMenuNode?.children.filter((childNode) => !childNode.route.startsWith('/legacy'));
    baseMenu = true;
  }

  if (isPrev) {
    const rootMenuNode = findDirectoryNode('/legacy/gen1/[platform]/prev');
    childrenNodes = rootMenuNode?.children;
  }

  return (
    <nav className="menu " aria-label="Main">
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
