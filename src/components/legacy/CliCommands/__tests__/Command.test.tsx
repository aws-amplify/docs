import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Command } from '../index';

describe('Command', () => {
  const command = {
    name: 'add',
    description:
      'Adds a resource for an Amplify category in your local backend',
    usage: 'amplify add <category>',
    flags: [
      {
        description:
          'Shows verbose details, including cloudformation differences',
        long: 'verbose',
        short: 'v'
      },
      {
        description: 'Automatically accept publish prompt',
        long: 'yes',
        short: 'y'
      }
    ],
    subCommands: [
      {
        name: 'project',
        description: 'Configure the attributes of your project',
        usage: 'amplify configure project'
      }
    ]
  };
  const component = <Command key={command.name} {...command} />;

  it('should render the Command component', async () => {
    render(component);
    const commandNode = await screen.findByText(
      'Adds a resource for an Amplify category in your local backend'
    );
    expect(commandNode).toBeInTheDocument();
  });

  it('should render a table if flags are passed', async () => {
    render(component);
    const flagsTable = await screen.getByRole('table');
    expect(flagsTable.tagName).toBe('TABLE');

    const flag = await screen.getByRole('cell', { name: '-v| --verbose' });
    const description = flag.nextElementSibling;
    expect(description?.tagName).toBe('TD');
    expect(description?.textContent).toBe(
      'Shows verbose details, including cloudformation differences'
    );
  });

  it('should render a code block if usage is passed', async () => {
    render(component);
    const heading = await screen.getByRole('heading', { name: 'add' });
    const command = heading.parentElement;

    const codeBlock = await screen.getByText('code example');
    expect(command).toContainElement(codeBlock);
  });

  it('should render subcommands', async () => {
    render(component);
    const heading = await screen.getByRole('heading', { level: 3 });
    const subCommand = heading.parentElement;

    expect(subCommand?.classList).toContain(
      'commands-list__command__subcommands'
    );
  });
});
