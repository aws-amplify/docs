import { CliCommand, CliCommandFlag } from '@/data/cli-commands';
import { Text, Flex } from '@aws-amplify/ui-react';
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
          <table>
            <thead>
              <tr>
                <th>Flag</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {flags.map((flag: CliCommandFlag) => (
                <tr key={`${name}-${flag.short}`}>
                  <td>
                    <code>
                      {flag.short && <span>-{flag.short}|</span>}
                      <span>--{flag.long}</span>
                    </code>
                  </td>
                  <td>{flag.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Flex>
      )}
      {subCommands && subCommands.length > 0 && (
        <Flex
          className="commands-list__command__subcommands"
          alignItems="flex-start"
          gap="small"
        >
          {subCommands.map((subCommand) => (
            <Fragment key={`${name}-${subCommand.name}`}>
              <SubCommandHeading parentCommand={name}>
                {subCommand.name}
              </SubCommandHeading>
              <Text>{subCommand.description}</Text>
              <code>
                amplify {name} {subCommand.name}
              </code>
            </Fragment>
          ))}
        </Flex>
      )}
    </Flex>
  );
}
