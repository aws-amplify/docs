import { Text, Link } from '@aws-amplify/ui-react';
import { Dispatch, SetStateAction } from 'react';
import { IconLink, ExternalLink } from './icons';
import { NavMenuItem } from '../GlobalNav';

export function NavMenuLink({
  navMenuItem,
  currentMenuItem = ''
}: {
  navMenuItem: NavMenuItem;
  currentMenuItem: string;
  hasSecondaryNav?: boolean;
  isMobile?: boolean;
  setShowGlobalNav?: Dispatch<SetStateAction<boolean>>;
}) {
  const label: string = navMenuItem.label;
  const linkContent: JSX.Element =
    navMenuItem.type === 'EXTERNAL' ? (
      <ExternalLink>{label}</ExternalLink>
    ) : (
      <Text as="span" color="inherit" className="icon-link">
        <IconLink iconType={navMenuItem.icon ? navMenuItem.icon : ''} />
      </Text>
    );

  if (navMenuItem.type === 'DEFAULT') {
    return (
      <Link
        className={`navbar-menu-item ${
          navMenuItem.label === currentMenuItem
            ? 'navbar-menu-item--current'
            : ''
        }`}
        href={navMenuItem.url}
      >
        {label}
      </Link>
    );
  } else {
    return (
      <Link
        isExternal={true}
        aria-label={label + ' (opens in new tab)'}
        className="navbar-menu-item"
        href={navMenuItem.url}
      >
        {linkContent}
      </Link>
    );
  }
}
