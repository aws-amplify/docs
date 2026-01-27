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
  const value = encodeURI(`${parentCommand}-${children}`);

  return (
    <Heading
      className="commands-list__command__subcommands__heading"
      marginTop="medium"
      id={value}
      level={3}
    >
      <Link className="commands-list__link" href={`#${value}`}>
        {children}
      </Link>
    </Heading>
  );
}
