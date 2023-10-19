import { ReactElement, useContext } from 'react';
import { View } from '@aws-amplify/ui-react';
import { MenuItem } from './MenuItem';
import { Platform } from '@/data/platforms';
import Link from 'next/link';
import { LayoutContext } from '@/components/Layout';
import { PageNode } from 'src/directory/directory';

type MenuProps = {
  currentPlatform: Platform;
  platformOverviewPage: PageNode | undefined;
};

export function Menu({
  currentPlatform,
  platformOverviewPage
}: MenuProps): ReactElement {
  const { menuOpen, toggleMenuOpen } = useContext(LayoutContext);

  const onLinkClick = () => {
    if (menuOpen) {
      toggleMenuOpen(false);
    }
  };

  return (
    <nav className="menu">
      <ul className="menu__list">
        <li className="menu__list-item">
          <Link
            onClick={onLinkClick}
            className="menu__list-item__link"
            href={{
              pathname: `/[platform]`,
              query: { platform: currentPlatform }
            }}
          >
            <View
              className="menu__list-item__link__inner"
              marginBottom="16px"
              fontWeight={700}
            >
              How Amplify works
            </View>
          </Link>
        </li>
        <ul className="menu__list">
          {platformOverviewPage?.children &&
            platformOverviewPage.children.map((child) => {
              return (
                <MenuItem
                  pageNode={child as PageNode}
                  parentSetOpen={null}
                  level={1}
                  currentPlatform={currentPlatform}
                />
              );
            })}
        </ul>
      </ul>
    </nav>
  );
}
