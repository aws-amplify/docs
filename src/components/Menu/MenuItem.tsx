import { useRouter } from 'next/router';
import { ReactElement, useContext, useEffect, useState } from 'react';
import { Link as AmplifyUILink, Flex } from '@aws-amplify/ui-react';
import { IconExternalLink, IconChevron } from '@/components/Icons';
import Link from 'next/link';
import { Platform } from '@/data/platforms';
import { LayoutContext } from '@/components/Layout';
import { PageNode } from 'src/directory/directory';

enum Levels {
  Category = 1,
  Subcategory = 2,
  Page = 3
}

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
  const { menuOpen, toggleMenuOpen } = useContext(LayoutContext);
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const onLinkClick = () => {
    if (level > Levels.Category) {
      setOpen((prevOpen) => !prevOpen);
    }

    if (menuOpen) {
      toggleMenuOpen(false);
    }
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

  const pathname = pageNode.route.replace('[platform]', currentPlatform) + '/';
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
          onClick={onLinkClick}
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
            pathname: `${pageNode.route}`,
            query: { platform: currentPlatform }
          }}
          onClick={onLinkClick}
          passHref
        >
          <Flex className="menu__list-item__link__inner">
            {pageNode.title}
            {pageNode.children && level !== Levels.Category && (
              <IconChevron className={open ? '' : 'icon-rotate-90-reverse'} />
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
