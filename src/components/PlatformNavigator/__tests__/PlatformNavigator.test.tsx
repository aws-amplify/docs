import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { PlatformNavigator } from '../index';
import userEvent from '@testing-library/user-event';

const routerMock = {
  __esModule: true,
  useRouter: () => {
    return {
      pathname: ''
    };
  }
};

jest.mock('next/router', () => routerMock);

describe('PlatformNavigator', () => {
  const component = (
    <PlatformNavigator currentPlatform={'react'} isPrev={true} />
  );

  it('should render the PlatformNavigator component', async () => {
    render(component);

    const navigator = await screen.findByText('Choose your framework/language');
    expect(navigator).toBeInTheDocument();
  });

  it('should show the default platform as React', async () => {
    render(component);

    const platform = await screen.findByRole('button');
    console.log(platform);

    expect(platform.textContent).toBe('React');
  });

  it('should open dropdown on click', async () => {
    render(component);

    const platformButton = await screen.getByRole('button');
    expect(platformButton.getAttribute('aria-expanded')).toBe('false');

    userEvent.click(platformButton);
    expect(platformButton.getAttribute('aria-expanded')).toBe('true');
  });

  it('should change platform on selection', async () => {
    render(component);

    const platformButton = await screen.getByRole('button');
    const popover = await screen.getByRole('navigation');
    const popoverFirstItem = popover.children[0].children[1];
    userEvent.click(platformButton);
    userEvent.tab();
    userEvent.tab();
    expect(popoverFirstItem.children[0]).toHaveFocus();
    expect(popoverFirstItem.textContent).toBe('JavaScript');
    expect(popoverFirstItem.children[0].getAttribute('href')).toBe(
      '/javascript'
    );
  });
});
