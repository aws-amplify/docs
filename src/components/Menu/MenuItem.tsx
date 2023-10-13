import { useRouter } from 'next/router';
import { ReactElement, useCallback, useEffect, useState } from 'react';
import { Icon } from '@aws-amplify/ui-react';
import Link from 'next/link';
import styles from './Menu.module.scss';
import { Platform } from '@/data/platforms';

const CATEGORY_LEVEL = 1;

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

type PageNode = {
  title: string;
  route: string;
  isExternal?: boolean;
  platforms: string[];
  children: PageNode[];
};

type MenuItemProps = {
  pageNode: PageNode;
  parentSetOpen: React.Dispatch<React.SetStateAction<boolean>> | null;
  level: number;
  currentPlatform: Platform;
};

export function MenuItem({
  pageNode,
  parentSetOpen,
  level,
  currentPlatform
}: MenuItemProps): ReactElement {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const toggleDrawer = useCallback(() => {
    setOpen((prevOpen) => !prevOpen);
  }, []);

  const pathname = `/${currentPlatform}/${pathHelper(pageNode.route)}/`;
  const current = router.asPath === pathname;

  const currentStyle = current ? styles['current'] : '';
  const categoryStyle =
    level === CATEGORY_LEVEL ? styles['category'] : styles['subcategory'];

  useEffect(() => {
    if (current) {
      if (pageNode.children && pageNode.children.length > 0) {
        // if we're on a heading that has children, open it
        setOpen(true);
      }

      if (parentSetOpen) {
        // Don't think this scales well with deeply nested menus, what are some better ways to do this?
        parentSetOpen(true);
      }
    }
  }, []);

  if (!pageNode) {
    return <></>;
  }
  console.log('currentPlatform', currentPlatform);
  console.log('router', router);

  if (pageNode.platforms.includes(currentPlatform)) {
    return (
      <li key={pageNode.route} className={styles['category-container']}>
        <Link
          href={{
            pathname: `/[platform]/${pathHelper(pageNode.route)}`,
            query: { platform: currentPlatform }
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
                    d: 'M3.96289 0.75L2.99954 1.71335L7.28566 6L2.99954 10.2867L3.96289 11.25L9.21289 6L3.96289 0.75Z',
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
          <ul
            style={!open && level > CATEGORY_LEVEL ? { display: 'none' } : {}}
          >
            {pageNode.children.map((child) => (
              <MenuItem
                pageNode={child}
                parentSetOpen={setOpen}
                level={level + 1}
                currentPlatform={currentPlatform}
              />
            ))}
          </ul>
        )}
      </li>
    );
  } else {
    return <></>;
  }
}
