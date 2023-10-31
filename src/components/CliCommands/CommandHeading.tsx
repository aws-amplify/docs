import { Link } from '@aws-amplify/ui-react';
import { ReactNode } from 'react';

type CommandHeadingProps = {
  children: ReactNode;
};

type SubCommandHeadingProps = {
  children: ReactNode;
  parentCommand: string;
};

export function CommandHeading({ children }: CommandHeadingProps) {
  return <Link href={`#${children}`}>{children}</Link>;
}

export function SubCommandHeading({
  parentCommand,
  children
}: SubCommandHeadingProps) {
  return (
    <Link href={encodeURI(`#${parentCommand}-${children}`)}>{children}</Link>
  );
}
