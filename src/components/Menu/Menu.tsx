import { ReactElement } from 'react';
import { View, Text } from '@aws-amplify/ui-react';
import { MenuItem } from './MenuItem';
import { PageNode, directory } from './buildDirectory.mjs';
import { Platform } from '@/data/platforms';
import Link from 'next/link';

type MenuProps = {
  currentPlatform: Platform;
};

export function Menu({ currentPlatform }: MenuProps): ReactElement {
  const rootPage = directory;
  const platformOverviewPage = rootPage.children[0];

  return (
    <nav className="menu">
      <ul className="menu__list">
        <li className="menu__list-item">
          <Link
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
          {platformOverviewPage.children &&
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
