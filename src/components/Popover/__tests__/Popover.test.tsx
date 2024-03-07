import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Popover } from '../Popover';

describe('Popover', () => {
  const popoverTestId = 'popoverTestId';

  const popover = (
    <Popover testId={popoverTestId}>
      <Popover.Trigger>Popover trigger</Popover.Trigger>
      <Popover.List aria-label="Test list">
        <Popover.ListItem href="/test1">List item 1</Popover.ListItem>
        <Popover.ListItem href="/test2">List item 2</Popover.ListItem>
        <Popover.ListItem href="/test3">List item 3</Popover.ListItem>
      </Popover.List>
    </Popover>
  );

  it('should render a popover', async () => {
    render(popover);

    const popoverWrapper = screen.getByTestId(popoverTestId);
    const popoverTrigger = screen.getByRole('button', {
      name: 'Popover trigger'
    });
    const popoverList = screen.getByRole('nav');
    expect(popoverWrapper).toBeInTheDocument();
    expect(popoverTrigger).toBeInTheDocument();
    expect(popoverList).toBeInTheDocument();
  });
});
