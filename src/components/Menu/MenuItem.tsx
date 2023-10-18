import { useRouter } from 'next/router';
import { ReactElement, useCallback, useEffect, useState } from 'react';
import { Link as AmplifyUILink, Flex, View } from '@aws-amplify/ui-react';
import { IconExternalLink, IconChevron } from '@/components/Icons';
import Link from 'next/link';
import { Platform } from '@/data/platforms';

enum Levels {
  Category = 1,
  Subcategory = 2,
  Page = 3
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

type PageNode = {
  title: string;
  platforms: string[];
  children: PageNode[];
  route: string;
  isExternal: boolean;
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
  const toggleDrawer = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleFocus = () => {
    if (parentSetOpen && level === 3) {
      parentSetOpen(true);
    }
  };

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

  const pathname = `/${currentPlatform}/${pathHelper(pageNode.route)}/`;
  const current = router.asPath === pathname;

  const currentStyle = current ? 'menu__list-item__link--current' : '';

  let listItemStyle = '';
  let listItemLinkStyle = '';
  switch (level) {
    case Levels.Category:
      listItemStyle = 'menu__list-item--category';
      listItemLinkStyle = 'menu__list-item__link--category';
      break;
    case Levels.Subcategory:
      listItemLinkStyle = 'menu__list-item__link--subcategory';
      break;
    default:
      listItemLinkStyle = 'menu__list-item__link--page';
      break;
  }

  if (!pageNode) {
    return <></>;
  }

  if (pageNode.isExternal) {
    return (
      <li key={pageNode.route} className="menu__list-item">
        <AmplifyUILink
          className={`menu__list-item__link ${listItemLinkStyle} ${currentStyle}`}
          href={pageNode.route}
          isExternal={true}
          onClick={level > Levels.Category ? toggleDrawer : undefined}
        >
          <Flex className="menu__list-item__link__inner">
            {pageNode.title}
            <IconExternalLink />
          </Flex>
        </AmplifyUILink>
      </li>
    );
  } else if (pageNode.platforms.includes(currentPlatform)) {
    return (
      <li
        onFocus={handleFocus}
        key={pageNode.route}
        className={`menu__list-item ${listItemStyle}`}
      >
        <Link
          className={`menu__list-item__link ${listItemLinkStyle} ${currentStyle}`}
          href={{
            pathname: `/[platform]/${pathHelper(pageNode.route)}`,
            query: { platform: currentPlatform }
          }}
          onClick={level > Levels.Category ? toggleDrawer : undefined}
          passHref
        >
          <Flex className="menu__list-item__link__inner">
            {pageNode.title}
            {pageNode.children && level !== Levels.Category && (
              <IconChevron
                className={open ? '' : 'menu__list-item__link__inner--close'}
              />
            )}
          </Flex>
        </Link>
        {pageNode.children && (
          <ul
            className={`menu__list ${
              !open && level > Levels.Category ? 'menu__list--hide' : ''
            }`}
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
