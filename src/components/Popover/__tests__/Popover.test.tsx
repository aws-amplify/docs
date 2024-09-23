import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Popover } from '../Popover';
import userEvent from '@testing-library/user-event';

describe('Popover', () => {
  const popoverTestId = 'popoverTestId';
  const popoverListTestId = 'popoverListTestId';
  const triggerLabel = 'Popover trigger';
  const popover = (
    <Popover testId={popoverTestId}>
      <Popover.Trigger>{triggerLabel}</Popover.Trigger>
      <Popover.List testId={popoverListTestId}>
        <Popover.ListItem href="">List item 1</Popover.ListItem>
        <Popover.ListItem href="">List item 2</Popover.ListItem>
        <Popover.ListItem href="">List item 3</Popover.ListItem>
      </Popover.List>
    </Popover>
  );

  it('should render a popover', async () => {
    render(popover);

    const popoverWrapper = screen.getByTestId(popoverTestId);
    const popoverTrigger = screen.getByRole('button', {
      name: triggerLabel
    });
    const popoverList = screen.getByTestId(popoverListTestId);

    expect(popoverWrapper).toBeInTheDocument();
    expect(popoverTrigger).toBeInTheDocument();
    expect(popoverList).toBeInTheDocument();
  });

  it('should minimize Popover on click outside', async () => {
    render(popover);
    const button = await screen.findByRole('button', {
      name: triggerLabel
    });
    const dropdown = screen.getByTestId(popoverListTestId);

    userEvent.click(button);
    expect(dropdown.classList).toContain('popover--expanded');
    expect(button.getAttribute('aria-expanded')).toEqual('true');
    userEvent.click(document.body);
    expect(dropdown.classList).not.toContain('popover--expanded');
    expect(button.getAttribute('aria-expanded')).toEqual('false');
  });

  it('should keep Popover minimized when not expanded and user clicks outside', async () => {
    render(popover);
    const button = await screen.findByRole('button', {
      name: triggerLabel
    });
    const dropdown = screen.getByTestId(popoverListTestId);

    userEvent.click(document.body);
    expect(dropdown.classList).not.toContain('popover--expanded');
    expect(button.getAttribute('aria-expanded')).toEqual('false');
  });

  it('should minimize dropdown on tab after last platform option', async () => {
    render(
      <div>
        {popover}
        <button>External button</button>
      </div>
    );
    const button = await screen.findByRole('button', {
      name: triggerLabel
    });
    const dropdown = screen.getByTestId(popoverListTestId);
    const externalButton = await screen.findByRole('button', {
      name: 'External button'
    });
    const links = screen.queryAllByRole('link');

    userEvent.click(button);
    userEvent.tab();
    expect(links[0]).toHaveFocus();
    expect(dropdown.classList).toContain('popover--expanded');
    expect(button.getAttribute('aria-expanded')).toEqual('true');
    userEvent.tab();
    expect(links[1]).toHaveFocus();
    userEvent.tab();
    expect(links[2]).toHaveFocus();
    userEvent.tab();
    expect(externalButton).toHaveFocus();
    expect(dropdown.classList).not.toContain('popover--expanded');
    expect(button.getAttribute('aria-expanded')).toEqual('false');
    expect(dropdown).not.toHaveFocus();
  });
  it('should keep popover collapsed when tabbing past it', async () => {
    render(
      <div>
        {popover}
        <button>External button</button>
      </div>
    );
    const button = await screen.findByRole('button', {
      name: triggerLabel
    });
    const dropdown = screen.getByTestId(popoverListTestId);
    const externalButton = await screen.findByRole('button', {
      name: 'External button'
    });

    /* 
      Currently userEvent.tab()/.click() doesn't ignore hidden elements (like
      our links which have a display: none wrapped around them) so we have to tab 
      through each link to get to the button outside of the popover */
    userEvent.tab(); // Tab to button
    userEvent.tab(); // Tab to Link 1
    userEvent.tab(); // Tab to Link 2
    userEvent.tab(); // Tab to Link 3
    userEvent.tab(); // Tab to externalButton
    expect(externalButton).toHaveFocus();
    expect(dropdown.classList).not.toContain('popover--expanded');
    expect(button.getAttribute('aria-expanded')).toEqual('false');
  });
});
