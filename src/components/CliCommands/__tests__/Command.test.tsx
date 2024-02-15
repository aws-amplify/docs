import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Command } from '../index';

describe('Command', () => {
  it('should render the Command component', async () => {
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

    render(component);

    const commandNode = await screen.findByText(
      'Adds a resource for an Amplify category in your local backend'
    );
    expect(commandNode).toBeInTheDocument();
  });
});
