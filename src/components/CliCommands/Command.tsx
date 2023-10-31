import { CliCommand, CliCommandFlag } from '@/data/cli-commands';
import { Heading, Text, Flex, View } from '@aws-amplify/ui-react';
import { MDXCode } from '../MDXComponents';
import { CommandHeading, SubCommandHeading } from './CommandHeading';
import { Fragment } from 'react';

export function Command({
  name,
  description,
  usage,
  flags,
  subCommands
}: CliCommand) {
  return (
    <Flex className="commands-list__command">
      <CommandHeading>{name}</CommandHeading>
      <Text>{description}</Text>
      <MDXCode language="terminal" codeString={usage} showLineNumbers={false} />
      {flags && flags.length > 0 && (
        <Flex className="commands-list__command__flags">
          {flags.map((flag: CliCommandFlag) => (
            <Fragment key={`${name}-${flag.short}`}>
              <code className="commands-list__command__flags__code">
                {flag.short && <span>-{flag.short}|</span>}
                <span>--{flag.long}</span>
              </code>
              <Text>{flag.description}</Text>
            </Fragment>
          ))}
        </Flex>
      )}
      {subCommands && subCommands.length > 0 && (
        <Flex className="commands-list__command__subcommands">
          {subCommands.map((subCommand) => (
            <Fragment key={`${name}-${subCommand.name}`}>
              <SubCommandHeading parentCommand={name}>
                {subCommand.name}
              </SubCommandHeading>
              <Text>{subCommand.description}</Text>
              <MDXCode
                language="terminal"
                codeString={`amplify ${name} ${subCommand.name}`}
                showLineNumbers={false}
              />
            </Fragment>
          ))}
        </Flex>
      )}
    </Flex>
  );
}
