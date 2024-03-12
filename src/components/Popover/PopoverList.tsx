import { View, ViewProps } from '@aws-amplify/ui-react';
import classNames from 'classnames';
import { usePopover } from './usePopover';

interface PopoverListProps extends ViewProps {
  anchor?: 'left' | 'right';
  fullWidth?: boolean;
  /**
   * @description
   * Accessible label for the nav item. Required since we are using a <nav> element.
   */
  ariaLabel: string;
}

export const PopoverList = ({
  ariaLabel,
  children,
  className,
  anchor = 'right',
  fullWidth = false,
  testId,
  ...rest
}: PopoverListProps) => {
  const { navId, expanded, contentRef, handleBlur } = usePopover();
  return (
    <View
      className={classNames(
        'popover',
        `popover--anchor-${anchor}`,
        {
          'popover--expanded': expanded,
          'popover--fullWidth': fullWidth
        },
        className
      )}
      as="nav"
      aria-label={ariaLabel}
      id={navId}
      tabIndex={-1}
      ref={contentRef}
      onBlur={handleBlur}
      testId={testId}
      {...rest}
    >
      <ul className="popover-list">{children}</ul>
    </View>
  );
};
