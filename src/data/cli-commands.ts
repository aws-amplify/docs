import commandsData from './commands.json';

/**
 * @TODO remove this file in favor of fetching the data from the CLI repo
 * @TODO introduce a `flagDescriptionHtml` field to the command data, this will allow us to render references to other flags as inline code blocks
 */

/**
 * Fetch CLI commands from the aws-amplify/amplify-cli repo
 * @TODO type return data (ideally from types exported by the CLI)
 */
export async function fetchCliCommands(): Promise<any> {
  return commandsData;
}

/**
 * Get and transform command data
 */
export function getCliCommands() {
  // const commandsData = await fetchCliCommands();
  const result: any[] = [];
  for (const command of Object.values(commandsData)) {
    const subCommands = Object.values(command.subCommands);
    result.push({
      name: command.command,
      description: command.commandDescription,
      usage: command.commandUsage,
      learnMoreLink: command.learnMoreLink,
      flags: command.commandFlags.length
        ? command.commandFlags.map((flag) => ({
            short: flag.short,
            long: flag.long,
            description: flag.flagDescription
          }))
        : command.commandFlags,
      subCommands: subCommands.length
        ? subCommands.map((subCommand) => ({
            name: subCommand.subCommand,
            description: subCommand.subCommandDescription,
            usage: subCommand.subCommandUsage,
            learnMoreLink: subCommand.learnMoreLink,
            flags: subCommand.subCommandFlags.length
              ? subCommand.subCommandFlags.map((flag) => ({
                  short: flag.short,
                  long: flag.long,
                  description: flag.flagDescription
                }))
              : subCommand.subCommandFlags
          }))
        : subCommands
    });
  }
  return result;
}

export const commands = getCliCommands();
