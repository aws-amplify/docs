import * as React from 'react';
import { render, screen, within } from '@testing-library/react';
import { GenSwitcher } from '../GenSwitcher';

const routerMock = {
  __esModule: true,
  useRouter: () => {
    return {
      query: {}
    };
  }
};

jest.mock('next/router', () => routerMock);

describe('GenSwitcher', () => {
  it('should render GenSwitcher component', async () => {
    const testId = 'testGenSwitcher';
    render(<GenSwitcher testId={testId} />);

    const genSwitcher = screen.getByTestId(testId);

    expect(genSwitcher).toBeInTheDocument();
  });

  it('should have Gen1 in button label when isGen1 is true', async () => {
    render(<GenSwitcher isGen1={true} />);

    const button = screen.getByRole('button');
    const { getByText } = within(button);

    expect(getByText(/Gen 1/)).toBeInTheDocument();
  });

  it('should have Gen2 in button label when isGen1 is false', async () => {
    render(<GenSwitcher />);

    const button = screen.getByRole('button');
    const { getByText } = within(button);

    expect(getByText(/Gen 2/)).toBeInTheDocument();
  });

  it('should have current class applied to Gen1 link when isGen1 is true ', async () => {
    render(<GenSwitcher isGen1={true} />);

    const gen1Link = screen.getByRole('link', { name: 'Gen 1' });

    expect(gen1Link.classList).toContain('popover-list__link--current');
  });

  it('should have current class applied to Gen2 link when isGen1 is false ', async () => {
    render(<GenSwitcher />);

    const gen1Link = screen.getByRole('link', { name: 'Gen 2' });

    expect(gen1Link.classList).toContain('popover-list__link--current');
  });

  it('should not have specific platform links if on home page', () => {
    render(<GenSwitcher />);

    const gen1Link: HTMLLinkElement = screen.getByRole('link', {
      name: 'Gen 1'
    });
    const gen2Link: HTMLLinkElement = screen.getByRole('link', {
      name: 'Gen 2'
    });

    expect(gen1Link.href).toBe('http://localhost/gen1');
    expect(gen2Link.href).toBe('http://localhost/');
  });

  it('should have current platform in the urls if we are on a specific platform url', async () => {
    routerMock.useRouter = () => {
      return {
        query: { platform: 'swift' }
      };
    };

    render(<GenSwitcher />);

    const gen1Link: HTMLLinkElement = screen.getByRole('link', {
      name: 'Gen 1'
    });
    const gen2Link: HTMLLinkElement = screen.getByRole('link', {
      name: 'Gen 2'
    });

    expect(gen1Link.href).toContain('/gen1/swift');
    expect(gen2Link.href).toContain('/swift');
  });
});
