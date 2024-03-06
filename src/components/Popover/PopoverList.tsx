import { View } from '@aws-amplify/ui-react';
import classNames from 'classnames';
import { usePopover } from './usePopover';

interface PopoverListProps {
  children?: React.ReactNode;
}

export const PopoverList = ({ children, ...rest }: PopoverListProps) => {
  const { expanded, contentRef, handleBlur } = usePopover();
  return (
    <View
      className={classNames('popover', {
        'popover--expanded': expanded
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
