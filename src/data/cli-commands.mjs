import { commandsInfo } from '@aws-amplify/amplify-cli-core/lib/help/commands-info.js';

/**
 * Get and transform command data
 * @returns {import('./cli-commands').CliCommand[]} Array of commands
 */
export function getCliCommands() {
  const result = [];
  for (const command of commandsInfo) {
    const { subCommands } = command;
    result.push({
      name: command.command,
      description: command.commandDescription,
      usage: command.commandUsage,
      flags: command.commandFlags.length
        ? command.commandFlags.map((flag) => ({
            short: flag.short,
            long: flag.long,
            description: flag.flagDescription
          }))
        : [],
      subCommands: subCommands.length
        ? subCommands
            .map((subCommand) => ({
              name: subCommand.subCommand,
              description: subCommand.subCommandDescription,
              usage: subCommand.subCommandUsage,
              flags: subCommand.subCommandFlags.length
                ? subCommand.subCommandFlags.map((flag) => ({
                    short: flag.short,
                    long: flag.long,
                    description: flag.flagDescription
                  }))
                : []
            }))
            .reduce((acc, subCommand) => {
              /** @todo remove this .reduce() after duplicates are removed from the data set */
              if (!acc.find((cmd) => cmd.name === subCommand.name)) {
                acc.push(subCommand);
              }
              return acc;
            }, [])
        : []
    });
  }
  return result;
}

export const commands = getCliCommands();
