import { ReactElement, useContext } from 'react';
import { MenuItem } from './MenuItem';
import { Platform } from '@/data/platforms';
import { PageNode } from 'src/directory/directory';

type MenuProps = {
  currentPlatform?: Platform;
  rootMenuNode: PageNode | undefined;
};

export function Menu({
  currentPlatform,
  rootMenuNode
}: MenuProps): ReactElement {
  return (
    <nav className="menu">
      <ul className="menu__list">
        {rootMenuNode?.children &&
          rootMenuNode.children.map((child, index) => {
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
