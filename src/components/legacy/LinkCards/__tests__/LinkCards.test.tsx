import * as React from 'react';
import { render, screen } from '@testing-library/react';
import LinkCards from '../index';

describe('LinkCards', () => {
  const component = <LinkCards platform={'react'} />;
  it('should render the LinkCards component', async () => {
    render(component);
    const linkCardNode = await screen.findByRole('link', {
      name: 'React Libraries on GitHub (opens in new tab)'
    });
    expect(linkCardNode).toBeInTheDocument();
  });

  it('should link each card to external href', async () => {
    render(component);
    const githubCard = await screen.findByRole('link', {
      name: 'React Libraries on GitHub (opens in new tab)'
    });
    const discordCard = await screen.findByRole('link', {
      name: 'Amplify Discord (opens in new tab)'
    });
    const learnCard = await screen.findByRole('link', {
      name: 'Amplify Learn (opens in new tab)'
    });

    expect(githubCard.href).toBe('https://github.com/aws-amplify/amplify-ui');
    expect(githubCard.target).toBe('_blank');
    expect(discordCard.href).toBe('https://discord.gg/amplify');
    expect(discordCard.target).toBe('_blank');
    expect(learnCard.href).toBe('https://amplify.aws/learn');
    expect(learnCard.target).toBe('_blank');
  });
});
