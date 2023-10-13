import { ReactElement } from 'react';
import { View, Text } from '@aws-amplify/ui-react';
import { MenuItem } from './MenuItem';
import { PageNode, directory } from './buildDirectory.mjs';
import styles from './Menu.module.scss';
import { Platform } from '@/data/platforms';

type MenuProps = {
  currentPlatform: Platform;
};

export function Menu({ currentPlatform }: MenuProps): ReactElement {
  const rootPage = directory;
  const platformOverviewPage = rootPage.children[0];

  return (
    <nav className={styles['menu']}>
      <View marginBottom="16px">
        <Text fontSize="16px" fontWeight="700">
          How Amplify works
        </Text>
      </View>
      <ul>
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
    </nav>
  );
}
