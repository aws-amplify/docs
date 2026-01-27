import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { PlatformNavigator } from '../index';
import userEvent from '@testing-library/user-event';

const routerMock = {
  __esModule: true,
  useRouter: () => {
    return {
      pathname: '/[platform]/build-ui/figma-to-code',
      query: {
        platform: 'react'
      }
    };
  }
};

jest.mock('next/router', () => routerMock);

const flatDirectoryMock = {
  '/[platform]/build-ui/figma-to-code': {
    platforms: ['javascript', 'nextjs', 'react']
  }
};

jest.mock('@/directory/flatDirectory.json', () => flatDirectoryMock);

describe('PlatformNavigator', () => {
  const testId = 'platformNavTestId';
  const popoverTestId = `${testId}-popoverList`;

  const component = (
    <PlatformNavigator
      testId={testId}
      currentPlatform={'react'}
      isGen1={false}
    />
  );

  it('should render the PlatformNavigator component', async () => {
    render(component);

    const navigator = await screen.findByText('Choose your framework/language');
    expect(navigator).toBeInTheDocument();
  });

  it('should show the current platform as React if passed as param', async () => {
    render(component);

    const platform = await screen.findByRole('button');

    expect(platform.textContent).toBe('React');
  });

  it('should show the current platform as Nextjs if passed as param', async () => {
    const component = (
      <PlatformNavigator currentPlatform={'nextjs'} isGen1={false} />
    );

    render(component);

    const platform = await screen.findByRole('button');

    expect(platform.textContent).toBe('Next.js');
  });

  it('should open dropdown on click', async () => {
    render(component);

    const platformButton = await screen.getByRole('button');
    expect(platformButton.getAttribute('aria-expanded')).toBe('false');

    userEvent.click(platformButton);
    expect(platformButton.getAttribute('aria-expanded')).toBe('true');
  });

  it('should tab through platforms in dropdown', async () => {
    render(component);

    const platformButton = await screen.getByRole('button');
    const popover = screen.getByTestId(popoverTestId);
    const popoverFirstItem = popover.children[0].children[1];
    userEvent.click(platformButton);
    userEvent.tab();
    userEvent.tab();
    expect(popoverFirstItem.children[0]).toHaveFocus();
    expect(popoverFirstItem.textContent).toBe('Next.js');
    expect(popoverFirstItem.children[0].getAttribute('href')).toBe(
      '/nextjs/build-ui/figma-to-code'
    );
  });

  it('should use current pathname when platform exists for that path', async () => {
    render(
      <PlatformNavigator
        testId={testId}
        currentPlatform={'react'}
        isGen1={false}
      />
    );

    const popover = screen.getByTestId(popoverTestId);
    const popoverFirstItem = popover.children[0].children[0];
    expect(popoverFirstItem.children[0].getAttribute('href')).toBe(
      '/react/build-ui/figma-to-code'
    );
  });

  it('should use platform root url when platform does not exist for current pathname', async () => {
    render(
      <PlatformNavigator
        testId={testId}
        currentPlatform={'react'}
        isGen1={false}
      />
    );

    const popover = screen.getByTestId(popoverTestId);

    // Flutter
    const popoverFirstItem = popover.children[0].children[6];
    expect(popoverFirstItem.children[0].getAttribute('href')).toBe('/flutter');
  });
});
