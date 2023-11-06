import Link, { LinkProps } from 'next/link';
import { ButtonProps } from '@aws-amplify/ui-react';
import classNames from 'classnames';

interface InternalLinkButtonProps extends LinkProps {
  variation?: ButtonProps['variation'];
  size?: ButtonProps['size'];
  children?: React.ReactNode;
  className?: string;
}

export const InternalLinkButton = ({
  variation,
  size,
  href,
  children,
  className,
  ...rest
}: InternalLinkButtonProps) => {
  const classes = classNames(
    'amplify-button',
    'amplify-field-group__control',
    { [`amplify-button--${variation}`]: !!variation },
    { [`amplify-button--${size}`]: !!size },
    className
  );

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
};
