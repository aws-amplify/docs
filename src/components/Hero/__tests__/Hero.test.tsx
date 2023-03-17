import * as React from 'react';
import { render, screen } from '@testing-library/react';
import Hero from '../index';

describe('Hero', () => {
  it('should render the hero component', async () => {
    const child = <span>Hero Child</span>;
    render(<Hero>{child}</Hero>);

    const heroNode = await screen.findByText('Hero Child');
    expect(heroNode).toBeInTheDocument();
  });
});
