import Link, { LinkProps } from 'next/link';
import classNames from 'classnames';
import { usePopover } from './usePopover';

interface PopoverListItemProps extends LinkProps {
  children: React.ReactNode;
  current?: boolean;
}

export const PopoverListItem = ({
  children,
  href,
  current
}: PopoverListItemProps) => {
  const { handleExpansion, expanded } = usePopover();
  return (
    <li className="popover-list__item">
      <Link
        className={classNames('popover-list__link', {
          'popover-list__link--current': current
        })}
        onClick={() => handleExpansion(expanded)}
        href={href}
      >
        {children}
      </Link>
    </li>
  );
};
