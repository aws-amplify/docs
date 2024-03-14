import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { GetStartedPopover } from '../index';
import userEvent from '@testing-library/user-event';

const routerMock = {
  __esModule: true,
  useRouter: () => {
    return {
      query: { platform: 'react' }
    };
  }
};

jest.mock('next/router', () => routerMock);

describe('GetStartedPopover', () => {
  const component = <GetStartedPopover platform={'react'} />;

  it('should render the GetStartedPopover component', async () => {
    render(component);

    const gettingStartedBtn = await screen.findByRole('link', {
      name: 'Get started'
    });

    expect(gettingStartedBtn).toBeInTheDocument();
  });

  it('should link to the selected platform on click of "Getting started"', async () => {
    render(component);

    const popoverNode = await screen.findByRole('link', {
      name: 'Get started'
    });
    expect(popoverNode.href).toContain(
      '/react/start/getting-started/introduction'
    );
  });

  it('should show platform options on click of split button', async () => {
    render(component);

    const button = await screen.findByRole('button', {
      name: 'Toggle getting started guides navigation'
    });
    const dropdown = await screen.findByRole('navigation', {
      name: 'Getting started guides for other platforms'
    });

    expect(dropdown.classList).not.toContain('popover--expanded');
    userEvent.click(button);
    expect(dropdown.classList).toContain('popover--expanded');
  });

  it('should show each platform option with link to corresponding Getting Started page', async () => {
    render(component);

    const swiftOption = await screen.findByRole('link', { name: 'Swift' });
    const angularOption = await screen.findByRole('link', { name: 'Angular' });
    const nextjsOption = await screen.findByRole('link', { name: 'Next.js' });
    expect(swiftOption.href).toContain(
      '/swift/start/getting-started/introduction'
    );
    expect(angularOption.href).toContain(
      '/angular/start/getting-started/introduction'
    );
    expect(nextjsOption.href).toContain(
      '/nextjs/start/getting-started/introduction'
    );
  });

  it('should minimize dropdown on click outside dropdown', async () => {
    render(component);
    const button = await screen.findByRole('button', {
      name: 'Toggle getting started guides navigation'
    });
    const dropdown = await screen.findByRole('navigation', {
      name: 'Getting started guides for other platforms'
    });

    userEvent.click(button);
    expect(dropdown.classList).toContain('popover--expanded');
    userEvent.click(document.body);
    expect(dropdown.classList).not.toContain('popover--expanded');
  });

  it('should minimize dropdown on tab after last platform option', async () => {
    render(component);
    const button = await screen.findByRole('button', {
      name: 'Toggle getting started guides navigation'
    });
    const dropdown = await screen.findByRole('navigation', {
      name: 'Getting started guides for other platforms'
    });
    const platformOptions =
      document.getElementsByClassName('popover-list__link');

    userEvent.click(button);
    expect(dropdown.classList).toContain('popover--expanded');
    userEvent.tab();
    expect(platformOptions[0].textContent).toBe('React');
    expect(platformOptions[0]).toHaveFocus();
    userEvent.tab();
    expect(platformOptions[1].textContent).toBe('JavaScript');
    expect(platformOptions[1]).toHaveFocus();
    userEvent.tab();
    expect(platformOptions[2].textContent).toBe('Flutter');
    expect(platformOptions[2]).toHaveFocus();
    userEvent.tab();
    expect(platformOptions[3].textContent).toBe('Swift');
    expect(platformOptions[3]).toHaveFocus();
    userEvent.tab();
    expect(platformOptions[4].textContent).toBe('Android');
    expect(platformOptions[4]).toHaveFocus();
    userEvent.tab();
    expect(platformOptions[5].textContent).toBe('React Native');
    expect(platformOptions[5]).toHaveFocus();
    userEvent.tab();
    expect(platformOptions[6].textContent).toBe('Angular');
    expect(platformOptions[6]).toHaveFocus();
    userEvent.tab();
    expect(platformOptions[7].textContent).toBe('Next.js');
    expect(platformOptions[7]).toHaveFocus();
    userEvent.tab();
    expect(platformOptions[8].textContent).toBe('Vue');
    expect(platformOptions[8]).toHaveFocus();
    userEvent.tab();
    expect(dropdown.classList).not.toContain('popover--expanded');
    expect(dropdown).not.toHaveFocus();
  });
});
