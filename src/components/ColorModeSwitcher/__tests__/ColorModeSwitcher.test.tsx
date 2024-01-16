import * as React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { LayoutProvider } from '../../Layout/LayoutProvider';

describe('ColorModeSwitcher', () => {
  const testId = 'testSwitcher';

  it('can render ColorModeSwitcher', async () => {
    render(<ColorModeSwitcher testId={testId} />);
    const switcher = await screen.findByTestId(testId);
    expect(switcher).toBeInTheDocument();
  });

  it('should use System as default color mode', async () => {
    render(<ColorModeSwitcher testId={testId} />);
    const systemButton = await screen.findByRole('button', { name: /System/i });
    const lightButton = await screen.findByRole('button', { name: /Light/i });
    const darkButton = await screen.findByRole('button', { name: /Dark/i });

    expect(systemButton).toHaveAttribute('aria-pressed', 'true');
    expect(lightButton).toHaveAttribute('aria-pressed', 'false');
    expect(darkButton).toHaveAttribute('aria-pressed', 'false');
  });

  it('should use colorMode passed from LayoutProvider context', async () => {
    render(
      <LayoutProvider
        value={{
          colorMode: 'light'
        }}
      >
        <ColorModeSwitcher />
      </LayoutProvider>
    );

    const systemButton = await screen.findByRole('button', { name: /System/i });
    const lightButton = await screen.findByRole('button', { name: /Light/i });
    const darkButton = await screen.findByRole('button', { name: /Dark/i });

    expect(systemButton).toHaveAttribute('aria-pressed', 'false');
    expect(lightButton).toHaveAttribute('aria-pressed', 'true');
    expect(darkButton).toHaveAttribute('aria-pressed', 'false');
  });

  it('should use handleColorModeChange function passed from LayoutProvider context', async () => {
    const changeColorMode = jest.fn();

    render(
      <LayoutProvider
        value={{
          handleColorModeChange: changeColorMode
        }}
      >
        <ColorModeSwitcher />
      </LayoutProvider>
    );

    const lightButton = await screen.findByRole('button', { name: /Light/i });
    await act(async () => {
      userEvent.click(lightButton);
    });

    expect(changeColorMode).toHaveBeenCalledTimes(1);
  });
});
