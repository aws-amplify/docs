import { ReactElement } from 'react';
import { MenuItem } from './MenuItem';
import { Platform } from '@/data/platforms';
import { PageNode } from 'src/directory/directory';
import { findDirectoryNode } from '@/utils/findDirectoryNode';
import { BUILD_A_BACKEND, PREV_BUILD_A_BACKEND } from '@/data/routes';

type MenuProps = {
  currentPlatform?: Platform;
  rootMenuNode: PageNode | undefined;
  isPrev?: boolean;
};

const invalidChildren = ['/[platform]/prev'];

export function Menu({
  currentPlatform,
  rootMenuNode,
  isPrev = false
}: MenuProps): ReactElement {
  let childrenNodes = rootMenuNode?.children?.filter((childNode) => {
    return invalidChildren.indexOf(childNode.route) === -1;
  });
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
    <nav className="menu">
      <ul className="menu__list">
        {childrenNodes &&
          childrenNodes.map((child, index) => {
            return (
              <MenuItem
                key={index}
                pageNode={child as PageNode}
                parentSetOpen={null}
                level={1}
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
