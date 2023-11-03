import { ReactElement, useContext } from 'react';
import { View } from '@aws-amplify/ui-react';
import { MenuItem } from './MenuItem';
import { Platform } from '@/data/platforms';
import Link, { LinkProps } from 'next/link';
import { LayoutContext } from '@/components/Layout';
import { PageNode } from 'src/directory/directory';

type MenuProps = {
  currentPlatform?: Platform;
  rootMenuNode: PageNode | undefined;
  menuTitle: string;
  menuHref: LinkProps['href'];
};

const invalidChildren = ["/[platform]/prev"];

export function Menu({
  currentPlatform,
  rootMenuNode,
  menuTitle,
  menuHref
}: MenuProps): ReactElement {
  const { menuOpen, toggleMenuOpen } = useContext(LayoutContext);

  const onLinkClick = () => {
    if (menuOpen) {
      toggleMenuOpen(false);
    }
  };

  let childrenNodes = rootMenuNode?.children?.filter((childNode) => {
    return invalidChildren.indexOf(childNode.route) === -1;
  });

  return (
    <nav className="menu">
      <ul className="menu__list">
        <li className="menu__list-item">
          <Link
            onClick={onLinkClick}
            className="menu__list-item__link"
            href={menuHref}
          >
            <View
              className="menu__list-item__link__inner"
              marginBottom="16px"
              fontWeight={700}
            >
              {menuTitle}
            </View>
          </Link>
        </li>
        <ul className="menu__list">
          {childrenNodes &&
            childrenNodes.map((child, index) => {
              const route = child.route;
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
      </ul>
    </nav>
  );
}
