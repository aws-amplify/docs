import { Heading, Link } from '@aws-amplify/ui-react';
import { ReactNode } from 'react';

type CommandHeadingProps = {
  children: string;
};

type SubCommandHeadingProps = {
  children: ReactNode;
  parentCommand: string;
};

export function CommandHeading({ children }: CommandHeadingProps) {
  return (
    <Heading id={children} level={2}>
      <Link className="commands-list__link" href={`#${children}`}>
        {children}
      </Link>
    </Heading>
  );
}

export function SubCommandHeading({
  parentCommand,
  children
}: SubCommandHeadingProps) {
  return (
    <Heading id={encodeURI(`${parentCommand}-${children}`)} level={3}>
      <Link
        className="commands-list__link"
        href={encodeURI(`#${parentCommand}-${children}`)}
      >
        {children}
      </Link>
    </Heading>
  );
}
