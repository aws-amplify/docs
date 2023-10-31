import { CliCommand, CliCommandFlag } from '@/data/cli-commands';
import { Heading, Text, Flex, View } from '@aws-amplify/ui-react';
import { MDXCode } from '../MDXComponents';
import { CommandHeading, SubCommandHeading } from './CommandHeading';

export function Command({
  name,
  description,
  usage,
  flags,
  subCommands
}: CliCommand) {
  return (
    <Flex className="commands-list__command">
      <Heading id={name} level={2}>
        <CommandHeading>{name}</CommandHeading>
      </Heading>
      <Text>{description}</Text>
      <MDXCode language="terminal" codeString={usage} />
      {flags && flags.length > 0 && (
        <Flex className="commands-list__command__flags">
          {flags.map((flag: CliCommandFlag) => (
            <>
              <code className="commands-list__command__flags__code">
                {flag.short && <span>-{flag.short}|</span>}
                <span>--{flag.long}</span>
              </code>
              <Text>{flag.description}</Text>
            </>
          ))}
        </Flex>
      )}
      {subCommands && subCommands.length > 0 && (
        <Flex className="commands-list__command__subcommands">
          {subCommands.map((subCommand) => (
            <>
              <Heading id={encodeURI(`${name}-${subCommand.name}`)} level={3}>
                <SubCommandHeading parentCommand={name}>
                  {subCommand.name}
                </SubCommandHeading>
              </Heading>
              <Text>{subCommand.description}</Text>
              <MDXCode
                language="terminal"
                codeString={`amplify ${name} ${subCommand.name}`}
              />
            </>
          ))}
        </Flex>
      )}
    </Flex>
  );
}
