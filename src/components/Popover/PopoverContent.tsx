import * as React from 'react';
import { usePopover } from './usePopover';

import classNames from 'classnames';

export interface PopoverContentProps {
  children: React.ReactElement;
  maxWidth?: string;
  minWidth?: string;
  offset?: { x?: string; y?: string };
  position?: 'bottom-left' | 'bottom-center' | 'bottom-right';
  variation?: 'plain';
}

export const PopoverContent = ({
  children,
  minWidth = '200px',
  maxWidth = 'auto',
  offset = { x: '0', y: '0' },
  position = 'bottom-right',
  variation = 'plain'
}: PopoverContentProps) => {
  const { expanded, contentRef, id } = usePopover();
  const { className, ...rest } = children.props;
  const popoverStyles = {
    '--popover-min-width': minWidth,
    '--popover-max-width': maxWidth,
    '--popover-translate-x': offset.x,
    '--popover-translate-y': offset.y,
    ...(position === 'bottom-right' && {
      right: '0px',
      top: '100%'
    })
  };

  const popoverClasses = classNames(
    'popover__content',
    `popover__content--${variation}`,
    {
      'popover__content--expanded': expanded
    },
    className
  );

  return React.cloneElement(children, {
    ...rest,
    className: popoverClasses,
    ref: contentRef,
    style: popoverStyles,
    tabIndex: 0,
    id
  });
};
