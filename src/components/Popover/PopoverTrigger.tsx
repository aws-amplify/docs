import { Button, ButtonProps } from '@aws-amplify/ui-react';
import classNames from 'classnames';
import { usePopover } from './usePopover';
import { IconChevron } from '@/components/Icons';

interface PopoverTriggerProps extends ButtonProps {}

export const PopoverTrigger = ({
  children,
  className,
  testId,
  ...rest
}: PopoverTriggerProps) => {
  const { navId, triggerRef, handleExpansion, expanded } = usePopover();

  return (
    <Button
      className={classNames('popover-trigger', className)}
      onClick={() => handleExpansion(expanded)}
      aria-expanded={expanded}
      aria-controls={navId}
      ref={triggerRef}
      testId={testId}
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
