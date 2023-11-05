import { ReactElement, useContext } from 'react';
import { MenuItem } from './MenuItem';
import { Platform } from '@/data/platforms';
import { PageNode } from 'src/directory/directory';

type MenuProps = {
  currentPlatform?: Platform;
  rootMenuNode: PageNode | undefined;
};

const invalidChildren = ["/[platform]/prev"];

export function Menu({
  currentPlatform,
  rootMenuNode
}: MenuProps): ReactElement {
  let childrenNodes = rootMenuNode?.children?.filter((childNode) => {
    return invalidChildren.indexOf(childNode.route) === -1;
  });

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
