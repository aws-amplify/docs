import Link, { LinkProps } from 'next/link';

interface PopoverListItemProps extends LinkProps {
  children: React.ReactNode;
}

export const PopoverListItem = ({ children, href }: PopoverListItemProps) => {
  return (
    <li className="popover-list__item">
      <Link className="popover-list__link" href={href}>
        {children}
      </Link>
    </li>
  );
};
