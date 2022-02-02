import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlockSwitcher from '..';
import Block from '../../Block';
import CodeBlockProvider from '../../CodeBlockProvider';

describe('BlockSwitcher', () => {
  it('renders BlockSwitcher with tabs', () => {
    const component = (
      <CodeBlockProvider>
        <BlockSwitcher>
          <Block name="child 1">text for child 1</Block>
          <Block name="child 2">text for child 2</Block>
          <Block name="child 3">text for child 3</Block>
        </BlockSwitcher>
      </CodeBlockProvider>
    );

    render(component);

    const tab1 = screen.getByText('child 1');
    const tab2 = screen.getByText('child 2');
    const tab3 = screen.getByText('child 3');

    expect(tab1).toBeInTheDocument();
    expect(tab2).toBeInTheDocument();
    expect(tab3).toBeInTheDocument();
  });

  it('switches to tab when clicked', () => {
    const component = (
      <CodeBlockProvider>
        <BlockSwitcher>
          <Block name="child 1">text for child 1</Block>
          <Block name="child 2">text for child 2</Block>
          <Block name="child 3">text for child 3</Block>
        </BlockSwitcher>
      </CodeBlockProvider>
    );

    render(component);

    // After first render, the first tab should be active.
    expect(screen.getByText('text for child 1')).toBeInTheDocument();

    // Click the second tab.
    const child1 = screen.getByRole('button', { name: 'child 2' });
    userEvent.click(child1);

    expect(screen.getByText('text for child 2')).toBeInTheDocument();
  });
});
