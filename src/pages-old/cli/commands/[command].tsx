import { getCustomStaticPath } from '@/utils/getCustomStaticPath';
        
import {
  Table,
  TableCell,
  TableBody,
export const getStaticPaths = async () => {
  return getCustomStaticPath(meta.platforms);
};
      
export function getStaticProps(context) {
  return {
    props: {
      platform: context.params.platform,
      meta
    }
  };
}
  TableHead,
  TableRow
} from '@aws-amplify/ui-react';
import Page from '../../../components/Page';
import { commands } from '../../../data/cli-commands.mjs';
import type { CliCommandFlag, CliCommand } from '../../../data/cli-commands';

/**
 * Create SEO metadata for a command
 * @TODO restructure command data to remove command.command in favor of command.name
 * @param command Amplify CLI command JSON
 * @returns
 */
const createCommandMeta = (command: CliCommand) => {
  const title = command.name;
  const description = command.description;
  return {
    title,
    description
  };
};

function CommandPageFlagsTable({ flags }: { flags: CliCommandFlag[] }) {
  return (
    <Table caption={null} highlightOnHover={false}>
      <TableHead>
        <TableRow>
          <TableCell width={'12rem'}>Flag</TableCell>
          <TableCell>Description</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {flags.map((flag) => (
          <TableRow key={flag.long}>
            <TableCell>
              {/* <code>{display}</code> \ */}
              <code>
                {flag.short && <span>-{flag.short}|</span>}
                <span>--{flag.long}</span>
              </code>
            </TableCell>
            <TableCell>{flag.description}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

/**
 * Page for a single Amplify CLI command. It aims to display:
 * - Command name
 * - Command description
 * - Command usage
 * - Command flags and their descriptions
 * - Command examples
 * - Command subcommands (with the same information as listed above: name, description, usage, flags, examples)
 */
function CommandPage({ meta, command }) {
  /**
   * Heading to mimic MDX page headings
   */
  const CommandPageHeading = ({
    anchor,
    children,
    level,
    title
  }: {
    anchor?: string;
    children: any;
    level?: number;
    title?: string;
  }) => {
    const createAnchorString = (str) => str.toLowerCase().replace(/ /g, '-');
    const Heading = `h${level || 2}` as keyof JSX.IntrinsicElements;
    const _anchor = anchor || createAnchorString(title || children);
    return (
      <a href={`/cli/commands/${command.name}/#${_anchor}`}>
        <Heading id={_anchor}>{children}</Heading>
      </a>
    );
  };

  const createSubcommandAnchor = (subcommandName) => {
    return `${command.name}-${subcommandName}`;
  };

  /**
   * Heading for subcommands where they will be rendered as the full "amplify" command but we need to have more control over the anchor
   */
  const CommandPageSubcommandHeading = ({ children }) => {
    return (
      <CommandPageHeading
        level={3}
        title={children}
        anchor={createSubcommandAnchor(children)}
      >
        <code>{`amplify ${command.name} ${children}`}</code>
      </CommandPageHeading>
    );
  };

  return (
    <Page meta={meta}>
      <p>{command.description}</p>
      <CommandPageHeading>Usage</CommandPageHeading>
      <p>
        <code>{command.usage}</code>
      </p>
      {command.flags.length > 0 && (
        <>
          <CommandPageHeading>Flags</CommandPageHeading>
          <CommandPageFlagsTable flags={command.flags} />
        </>
      )}
      {command.subCommands.length > 0 && (
        <>
          <CommandPageHeading>Subcommands</CommandPageHeading>
          <Table caption={null} highlightOnHover={false}>
            <TableHead>
              <TableRow>
                <TableCell width={'12rem'}>Subcommand</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {command.subCommands.map((subCommand) => (
                <TableRow key={subCommand.name}>
                  <TableCell>
                    <a href={`#${createSubcommandAnchor(subCommand.name)}`}>
                      <code>{subCommand.name}</code>
                    </a>
                  </TableCell>
                  <TableCell>{subCommand.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {command.subCommands.map((subCommand) => (
            <div key={subCommand.name}>
              <CommandPageSubcommandHeading>
                {subCommand.name}
              </CommandPageSubcommandHeading>
              <p>{subCommand.description}</p>
              {/* @todo fix subcommand usage from cli \ */}
              {/* <CommandPageHeading level={4}>Usage</CommandPageHeading>
              <p>
                <code>{command.usage}</code>
              </p> \ */}
              {command.subCommands.flags?.length > 0 && (
                <>
                  <CommandPageHeading level={4}>Flags</CommandPageHeading>
                  <CommandPageFlagsTable flags={subCommand.flags} />
                </>
              )}
            </div>
          ))}
        </>
      )}
    </Page>
  );
}

export function getStaticPaths() {
  const paths = commands.map(({ name }) => ({
    params: { command: name }
  }));
  return {
    paths,
    fallback: false
  };
}

export function getStaticProps({ params }) {
  const command = commands.find((command) => command.name === params.command);
  if (!command) {
    throw new Error(`Command not found: ${params.command}`);
  }
  const meta = createCommandMeta(command);
  return {
    props: {
      meta,
      command
    }
  };
}

export default CommandPage;
