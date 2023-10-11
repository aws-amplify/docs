import { ReactElement, useCallback, useEffect, useState } from 'react';
import { Icon, View, Text } from '@aws-amplify/ui-react';
import Link from 'next/link';
import { directory } from './buildDirectory.mjs';
import styles from './Menu.module.scss';
import { useRouter } from 'next/router';
import classNames from 'classnames';

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
            return generateListItem(child, null, 1);
          })}
      </ul>
    </nav>
  );
}

const CATEGORY_LEVEL = 1;

function generateListItem(pageNode, parentSetOpen, level): ReactElement {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  // const [current, setCurrent] = useState(false);
  const toggleDrawer = useCallback(() => {
    setOpen((prevOpen) => !prevOpen);
  }, []);

  const pathname = `/${router.query.platform}/${pathHelper(pageNode.route)}/`;

  const current = router.asPath === pathname;

  const currentStyle = current ? styles['current'] : '';
  const categoryStyle =
    level === CATEGORY_LEVEL ? styles['category'] : styles['subcategory'];

  useEffect(() => {
    if (current) {
      if (pageNode.children && pageNode.children.length > 0) {
        setOpen(true);
      }

      console.log('open parent');
      if (parentSetOpen) {
        /** Don't think this scales well with deeply nested menus, what are some better ways to do this? */
        parentSetOpen(true);
      }
    }
  }, []);

  if (!pageNode) {
    return <></>;
  }

  return (
    <li key={pageNode.route} className={styles['category-container']}>
      <Link
        href={{
          pathname: `/[platform]/${pathHelper(pageNode.route)}`,
          query: { platform: router.query.platform }
        }}
        passHref
      >
        <div
          className={`${styles['heading']} ${categoryStyle} ${currentStyle}`}
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
        </div>
      </Link>
      {pageNode.children && (
        <ul style={!open && level > CATEGORY_LEVEL ? { display: 'none' } : {}}>
          {pageNode.children.map((child) =>
            generateListItem(child, setOpen, level + 1)
          )}
        </ul>
      )}
    </li>
  );
}

const pathHelper = (path: string) => {
  const prefix = 'pages/[platform]/';

  const pathNoPrefix = path.slice(prefix.length).split('.')[0];

  const lastIndex = pathNoPrefix.lastIndexOf('/index');

  if (lastIndex > -1) {
    return pathNoPrefix.substring(0, lastIndex);
  } else {
    return pathNoPrefix;
  }
};
