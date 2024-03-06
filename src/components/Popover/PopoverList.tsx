import { View, ViewProps } from '@aws-amplify/ui-react';
import classNames from 'classnames';
import { usePopover } from './usePopover';

interface PopoverListProps extends ViewProps {
  anchor?: 'left' | 'right';
  fullWidth?: boolean;
}

export const PopoverList = ({
  children,
  anchor = 'right',
  fullWidth = false,
  ...rest
}: PopoverListProps) => {
  const { expanded, contentRef, handleBlur } = usePopover();
  return (
    <View
      className={classNames('popover', `popover--anchor-${anchor}`, {
        'popover--expanded': expanded,
        'popover--fullWidth': fullWidth
      })}
      as="nav"
      tabIndex={0}
      ref={contentRef}
      onBlur={handleBlur}
      {...rest}
    >
      <ul className="popover-list">{children}</ul>
    </View>
  );
};
