import * as React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BlockSwitcherErrorMessage } from '../BlockSwitcher';
import { BlockSwitcher } from '../index';
import { Block } from '../index';

describe('BlockSwitcher', () => {
  const blockAContent = 'JS Block sample content';
  const blockBContent = 'TS Block sample content';
  const blockCContent = 'X Block sample content';
  const component = (
    <BlockSwitcher>
      <Block name="JavaScript">{blockAContent}</Block>
      <Block name="TypeScript">{blockBContent}</Block>
      <Block name="X">{blockCContent}</Block>
    </BlockSwitcher>
  );

  it('should render the BlockSwitcher component', async () => {
    render(component);
    const blockSwitcher = await screen.findByText(blockAContent);
    expect(blockSwitcher).toBeInTheDocument();
  });

  it('should have more than one Block', async () => {
    render(component);
    expect(component.props.children.length).toBeGreaterThan(1);
  });

  it('should show the first Block as default', async () => {
    render(component);
    const tabs = await screen.getAllByRole('tab');
    const panels = await screen.getAllByRole('tabpanel');

    expect(tabs[0]).toHaveClass('amplify-tabs__item--active');
    expect(tabs[1]).not.toHaveClass('amplify-tabs__item--active');
    expect(tabs[2]).not.toHaveClass('amplify-tabs__item--active');
    expect(panels[0]).toHaveClass('amplify-tabs__panel--active');
    expect(panels[1]).not.toHaveClass('amplify-tabs__panel--active');
    expect(panels[2]).not.toHaveClass('amplify-tabs__panel--active');
  });

  it('should load all Blocks to the DOM', async () => {
    render(component);
    const blockA = await screen.findByText(blockAContent);
    const blockB = await screen.findByText(blockBContent);
    const blockC = await screen.findByText(blockCContent);
    expect(blockA).toBeInTheDocument();
    expect(blockB).toBeInTheDocument();
    expect(blockC).toBeInTheDocument();
  });

  it('should switch tabs upon click', async () => {
    render(component);
    const tabs = await screen.getAllByRole('tab');
    const panels = await screen.getAllByRole('tabpanel');

    expect(tabs[0]).toHaveClass('amplify-tabs__item--active');
    expect(tabs[1]).not.toHaveClass('amplify-tabs__item--active');
    expect(tabs[2]).not.toHaveClass('amplify-tabs__item--active');
    expect(panels[0]).toHaveClass('amplify-tabs__panel--active');
    expect(panels[1]).not.toHaveClass('amplify-tabs__panel--active');
    expect(panels[2]).not.toHaveClass('amplify-tabs__panel--active');

    userEvent.click(tabs[1]);
    await waitFor(() => {
      expect(tabs[0]).not.toHaveClass('amplify-tabs__item--active');
      expect(tabs[1]).toHaveClass('amplify-tabs__item--active');
      expect(tabs[2]).not.toHaveClass('amplify-tabs__item--active');
      expect(panels[0]).not.toHaveClass('amplify-tabs__panel--active');
      expect(panels[1]).toHaveClass('amplify-tabs__panel--active');
      expect(panels[2]).not.toHaveClass('amplify-tabs__panel--active');
    });

    userEvent.click(tabs[2]);
    await waitFor(() => {
      expect(tabs[0]).not.toHaveClass('amplify-tabs__item--active');
      expect(tabs[1]).not.toHaveClass('amplify-tabs__item--active');
      expect(tabs[2]).toHaveClass('amplify-tabs__item--active');
      expect(panels[0]).not.toHaveClass('amplify-tabs__panel--active');
      expect(panels[1]).not.toHaveClass('amplify-tabs__panel--active');
      expect(panels[2]).toHaveClass('amplify-tabs__panel--active');
    });
  });

  it('should throw an error if only a single block exists', () => {
    const singleBlock = (
      <BlockSwitcher>
        <Block name="JavaScript">{blockAContent}</Block>
      </BlockSwitcher>
    );
    expect(() => render(singleBlock)).toThrow(BlockSwitcherErrorMessage);
  });
});
