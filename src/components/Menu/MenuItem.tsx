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
  const toggleDrawer = useCallback(() => {
    setOpen((prevOpen) => !prevOpen);
  }, []);

  const pathname = `/${currentPlatform}/${pathHelper(pageNode.route)}/`;
  const current = router.asPath === pathname;

  const currentStyle = current ? 'menu__item--current' : '';
  // const categoryStyle =
  //   level === Levels.Category
  //     ? 'menu__item--category'
  //     : 'menu__item--subcategory';

  let categoryStyle = '';
  switch (level) {
    case Levels.Category:
      categoryStyle = 'menu__item--category';
      break;
    case Levels.Subcategory:
      categoryStyle = 'menu__item--subcategory';
      break;
    default:
      categoryStyle = 'menu__item--page';
      break;
  }

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

  if (pageNode.isExternal) {
    return (
      <li key={pageNode.route}>
        <AmplifyUILink href={pageNode.route} isExternal={true}>
          <View
            className={`menu__item`}
            onClick={level > Levels.Category ? toggleDrawer : undefined}
          >
            <Flex
              justifyContent="space-between"
              alignItems="center"
              className={`menu__item__inner ${categoryStyle} ${currentStyle}`}
            >
              {pageNode.title}
              <IconExternalLink />
            </Flex>
          </View>
        </AmplifyUILink>
      </li>
    );
  } else if (pageNode.platforms.includes(currentPlatform)) {
    return (
      <li key={pageNode.route}>
        <Link
          href={{
            pathname: `/[platform]/${pathHelper(pageNode.route)}`,
            query: { platform: currentPlatform }
          }}
          passHref
        >
          <View
            className={`menu__item ${categoryStyle} ${currentStyle}`}
            onClick={level > Levels.Category ? toggleDrawer : undefined}
          >
            <Flex
              justifyContent="space-between"
              alignItems="center"
              className={`menu__item__inner ${categoryStyle} ${currentStyle}`}
            >
              {pageNode.title}
              {pageNode.children && level !== Levels.Category && (
                <IconChevron className={open ? 'menu__item--open' : ''} />
              )}
            </Flex>
          </View>
        </Link>
        {pageNode.children && (
          <ul
            style={!open && level > Levels.Category ? { display: 'none' } : {}}
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
