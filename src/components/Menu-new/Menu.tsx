import { ReactElement, useCallback, useState } from 'react';
import { Flex, Icon, View, Text } from '@aws-amplify/ui-react';
import { directory } from './buildDirectory.mjs';
import styles from './Menu.module.scss';

export function Menu(): ReactElement {
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
            return generateListItem(child, 1);
          })}
      </ul>
    </nav>
  );
}

const CATEGORY_LEVEL = 1;

function generateListItem(pageNode, level): ReactElement {
  const [open, setOpen] = useState(false);
  const toggleDrawer = useCallback(() => {
    setOpen((prevOpen) => !prevOpen);
  }, []);

  if (!pageNode) {
    return <></>;
  }

  return (
    <li
      tabIndex={0}
      key={pageNode.route}
      className={styles['category-container']}
    >
      <a
        className={`${styles['heading']} ${
          level === CATEGORY_LEVEL ? styles['category'] : styles['subcategory']
        }`}
        onClick={level > CATEGORY_LEVEL ? toggleDrawer : undefined}
      >
        {pageNode.title}
        {pageNode.children && level !== CATEGORY_LEVEL && (
          <Icon
            className={open ? styles['chevron-open'] : ''}
            viewBox={{ width: 12, height: 12 }}
            fill="none"
            width="12"
            height="12"
            paths={[
              {
                d:
                  'M3.96289 0.75L2.99954 1.71335L7.28566 6L2.99954 10.2867L3.96289 11.25L9.21289 6L3.96289 0.75Z',
                fillRule: 'evenodd',
                clipRule: 'evenodd',
                fill: '#000716'
              }
            ]}
          />
        )}
      </a>
      {pageNode.children && (
        <ul style={!open && level > CATEGORY_LEVEL ? { display: 'none' } : {}}>
          {pageNode.children.map((child) => generateListItem(child, level + 1))}
        </ul>
      )}
    </li>
  );
}
