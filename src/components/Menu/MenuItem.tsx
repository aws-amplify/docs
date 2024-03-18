import { usePathWithoutHash } from '@/utils/usePathWithoutHash';
import { ReactElement, useContext, useEffect, useState, useMemo } from 'react';
import { Link as AmplifyUILink, Flex } from '@aws-amplify/ui-react';
import { IconExternalLink, IconChevron } from '@/components/Icons';
import Link from 'next/link';
import { JS_PLATFORMS, Platform, JSPlatform } from '@/data/platforms';
import { LayoutContext } from '@/components/Layout';
import { PageNode } from '@/directory/directory';

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
  hideChildren?: boolean;
};

function getPathname(route, currentPlatform: Platform | undefined) {
  let pathname = route;

  if (currentPlatform) {
    pathname = pathname.replace('[platform]', currentPlatform) + '/';
  } else {
    pathname += '/';
  }

  return pathname;
}

export function MenuItem({
  pageNode,
  parentSetOpen,
  level,
  currentPlatform,
  hideChildren
}: MenuItemProps): ReactElement {
  const { menuOpen, toggleMenuOpen } = useContext(LayoutContext);
  const asPathWithoutHash = usePathWithoutHash();
  const [open, setOpen] = useState(false);
  const children = useMemo(
    () => (hideChildren ? [] : pageNode.children),
    [hideChildren, pageNode.children]
  );
  const onLinkClick = () => {
    // Category shouldn't be collapsible
    if (
      level > Levels.Category &&
      asPathWithoutHash === getPathname(pageNode.route, currentPlatform)
    ) {
      setOpen((prevOpen) => !prevOpen);
    }

    if (menuOpen) {
      // Close the menu after clicking a link (applies to the mobile menu)
      toggleMenuOpen(false);
    }
  };

  const handleFocus = () => {
    if (parentSetOpen) {
      parentSetOpen(true);
    }
  };

  const pathname = getPathname(pageNode.route, currentPlatform);

  const current = asPathWithoutHash === pathname;

  const currentStyle = current ? 'menu__list-item__link--current' : '';

  let hideAPIResources = false;

  useEffect(() => {
    if (current) {
      if (children && children.length > 0) {
        // If we're on a heading that has children, open it
        setOpen(true);
      }

      if (parentSetOpen) {
        // Since the menu finds the "current" item based on the Page Node route
        // it doesn't know it's parent unless we explicitly use the parent's setOpen
        parentSetOpen(true);
      }
    }
  }, [asPathWithoutHash, current, children, parentSetOpen]);

  useEffect(() => {
    // Using this to help open nested menu items
    // When the parent's setOpen gets called in the initial render from the useEffect above,
    // it should cause the parent node to rerender. If this node has a parent too, then we should
    // also open it. The goal is to keep opening the parent whenever we get a
    // "current" menu item that is deeply nested
    if (open && parentSetOpen) {
      parentSetOpen(true);
    }
  }, [open, parentSetOpen]);

  if (
    currentPlatform &&
    JS_PLATFORMS.includes(currentPlatform as JSPlatform) &&
    asPathWithoutHash.includes('/prev/') &&
    pageNode.route == 'https://aws-amplify.github.io/amplify-js/api/'
  ) {
    hideAPIResources = true;
  }

  let hasVisibleChildren = currentPlatform ? false : true;

  children?.forEach((child) => {
    if (currentPlatform && child.platforms?.includes(currentPlatform)) {
      hasVisibleChildren = true;
    }
  });

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

  if (hideAPIResources) {
    return <></>;
  } else if (
    pageNode.isExternal &&
    ((currentPlatform && pageNode?.platforms?.includes(currentPlatform)) ||
      !pageNode.platforms)
  ) {
    return (
      <li key={pageNode.route} className="menu__list-item">
        <AmplifyUILink
          className={`menu__list-item__link menu__list-item__link--external  ${listItemLinkStyle}`}
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
    !pageNode.hideFromNav &&
    ((currentPlatform && pageNode?.platforms?.includes(currentPlatform)) ||
      !pageNode.platforms)
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
          aria-current={current ? 'page' : null}
          href={href}
          onClick={onLinkClick}
          passHref
        >
          <Flex
            className={`menu__list-item__link__inner ${listItemLinkInnerStyle}`}
          >
            {pageNode.title}
            {children && hasVisibleChildren && level !== Levels.Category && (
              <IconChevron className={open ? '' : 'icon-rotate-90-reverse'} />
            )}
          </Flex>
        </Link>
        {children && (
          <ul
            className={`menu__list ${
              !open && level > Levels.Category ? 'menu__list--hide' : ''
            }`}
          >
            {children.map((child, index) => (
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
