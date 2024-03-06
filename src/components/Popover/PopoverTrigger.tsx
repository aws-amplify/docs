import { Button, ButtonProps } from '@aws-amplify/ui-react';
import classNames from 'classnames';
import { usePopover } from './usePopover';
import { IconChevron } from '@/components/Icons';

interface PopoverTriggerProps extends ButtonProps {}

export const PopoverTrigger = ({ children, ...rest }: PopoverTriggerProps) => {
  const { triggerRef, handleExpansion, expanded } = usePopover();

  return (
    <Button
      onClick={() => handleExpansion(expanded)}
      ref={triggerRef}
      {...rest}
    >
      {children}
      <IconChevron
        aria-hidden="true"
        className={classNames('popover-icon', {
          'icon-rotate-180-reverse': expanded
        })}
      />
    </Button>
  );
};
