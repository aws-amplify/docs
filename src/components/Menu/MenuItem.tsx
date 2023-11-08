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
  currentPlatform?: Platform;
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
    // Category shouldn't be collapsible
    if (level > Levels.Category) {
      setOpen((prevOpen) => !prevOpen);
    }

    if (menuOpen) {
      toggleMenuOpen(false);
    }
  };

  const handleFocus = () => {
    if (parentSetOpen) {
      parentSetOpen(true);
    }
  };

  useEffect(() => {
    if (current) {
      if (pageNode.children && pageNode.children.length > 0) {
        // If we're on a heading that has children, open it
        setOpen(true);
      }

      if (parentSetOpen) {
        // Since the menu finds the "current" item based on the Page Node route
        // it doesn't know it's parent unless we explicitly use the parent's setOpen
        parentSetOpen(true);
      }
    }
  }, [router.asPath]);

  // Using this to help open nested menu items
  // When the parent's setOpen gets called in the initial render from the useEffect above,
  // it should cause the parent node to rerender. If this node has a parent too, then we should
  // also open it. The goal is to keep opening the parent whenever we get a
  // "current" menu item that is deeply nested
  useEffect(() => {
    if (open && parentSetOpen) {
      parentSetOpen(true);
    }
  }, [open]);

  let pathname = pageNode.route;

  if (currentPlatform) {
    pathname = pageNode.route.replace('[platform]', currentPlatform) + '/';
  } else {
    pathname += '/';
  }

  const current = router.asPath === pathname;

  const currentStyle = current ? 'menu__list-item__link--current' : '';

  let listItemStyle = '';
  let listItemLinkStyle = '';
  let listItemLinkInnerStyle = '';
  switch (level) {
    case Levels.Category:
      listItemStyle = 'menu__list-item--category';
      listItemLinkStyle = 'menu__list-item__link--category';
      break;
    case Levels.Subcategory:
      listItemLinkStyle = 'menu__list-item__link--subcategory';
      break;
    case Levels.Page:
      listItemLinkStyle = 'menu__list-item__link--page';
      break;
    default:
      listItemLinkStyle = 'menu__list-item__link--page';
      listItemLinkInnerStyle = 'menu__list-item__link__inner--subpage';
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
          <Flex
            className={`menu__list-item__link__inner ${listItemLinkInnerStyle}`}
          >
            {pageNode.title}
            <IconExternalLink />
          </Flex>
        </AmplifyUILink>
      </li>
    );
  } else if (
    (currentPlatform && pageNode?.platforms?.includes(currentPlatform)) ||
    !pageNode.platforms
  ) {
    const href = {
      pathname: `${pageNode.route}`
    };

    if (currentPlatform) {
      href['query'] = { platform: currentPlatform };
    }

    // Check if the page supports the current platform
    // If it doesn't, then it shouldn't be rendered in the menu
    return (
      <li
        onFocus={handleFocus}
        key={pageNode.route}
        className={`menu__list-item ${listItemStyle}`}
      >
        <Link
          className={`menu__list-item__link ${listItemLinkStyle} ${currentStyle}`}
          href={href}
          onClick={onLinkClick}
          passHref
        >
          <Flex
            className={`menu__list-item__link__inner ${listItemLinkInnerStyle}`}
          >
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
            {pageNode.children.map((child, index) => (
              <MenuItem
                key={index}
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
