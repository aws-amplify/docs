import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Layout } from '../index';
import userEvent from '@testing-library/user-event';

const routerState: { asPath: string; pathname: string } = {
  asPath: '/[platform]/start/getting-started/introduction/',
  pathname: '/[platform]/start/getting-started/introduction/'
};

const routerMock = {
  __esModule: true,
  useRouter: () => {
    return {
      query: { platform: 'react' },
      pathname: routerState.pathname,
      asPath: routerState.asPath
    };
  }
};

jest.mock('next/router', () => routerMock);

describe('Layout', () => {
  const layoutComponent = (
    <Layout
      pageTitle="Title"
      pageDescription="Description"
      pageType="home"
      platform="react"
      hasTOC={true}
      useCustomTitle={false}
      showBreadcrumbs={true}
      showLastUpdatedDate={true}
    >
      <></>
    </Layout>
  );

  beforeEach(() => {
    routerState.asPath = '/[platform]/start/getting-started/introduction/';
    routerState.pathname = '/[platform]/start/getting-started/introduction/';
  });

  it('should render the Layout component', async () => {
    render(layoutComponent);
    const layout = await screen.getByRole('main', { name: 'Main content' });
    expect(layout).toBeInTheDocument();
  });

  it('should show Layout with system color mode', async () => {
    render(layoutComponent);

    const nav = await screen.getByRole('navigation', {
      name: 'Amplify Docs - External links to additional Amplify resources'
    });

    const themeWrapper = nav.parentElement?.parentElement;

    expect(themeWrapper).toHaveAttribute('data-amplify-color-mode', 'system');
  });

  it('should show Layout with dark color mode', async () => {
    localStorage.setItem('colorMode', 'dark');
    render(layoutComponent);

    const nav = await screen.getByRole('navigation', {
      name: 'Amplify Docs - External links to additional Amplify resources'
    });

    const themeWrapper = nav.parentElement?.parentElement;

    expect(themeWrapper).toHaveAttribute('data-amplify-color-mode', 'dark');
  });

  it('should open menu on click of Menu button in mobile', async () => {
    render(layoutComponent);
    const menuButton = await screen.getByRole('button', { name: 'Menu' });
    const closeButton = await screen.getByRole('button', {
      name: 'Close menu'
    });
    expect(closeButton.classList).not.toContain(
      'layout-sidebar__mobile-toggle--open'
    );
    userEvent.click(menuButton);
    expect(closeButton.classList).toContain(
      'layout-sidebar__mobile-toggle--open'
    );
  });

  it('should close menu on click of Close button in mobile', async () => {
    render(layoutComponent);
    const menuButton = await screen.getByRole('button', { name: 'Menu' });
    const closeButton = await screen.getByRole('button', {
      name: 'Close menu'
    });
    userEvent.click(menuButton);
    userEvent.click(closeButton);
    expect(closeButton.classList).not.toContain(
      'layout-sidebar__mobile-toggle--open'
    );
    expect(menuButton).toHaveFocus();
  });

  it('should close menu on click outside of menu in mobile', async () => {
    render(layoutComponent);
    const menuButton = await screen.getByRole('button', { name: 'Menu' });
    const closeButton = await screen.getByRole('button', {
      name: 'Close menu'
    });
    const outsideMenu = document.getElementsByClassName(
      'layout-sidebar__backdrop--expanded'
    );
    userEvent.click(menuButton);
    userEvent.click(outsideMenu[0]);

    expect(closeButton.classList).not.toContain(
      'layout-sidebar__mobile-toggle--open'
    );
  });

  describe('PinpointEOLBanner', () => {
    it('is not rendered for the Customer Profiles push-notifications client pages', async () => {
      routerState.asPath =
        '/react/frontend/push-notifications/customer-profiles/';
      render(layoutComponent);
      expect(document.body.textContent).not.toContain('Amazon Pinpoint');
    });

    it('is not rendered for the Customer Profiles push-notifications child pages', async () => {
      routerState.asPath =
        '/react/frontend/push-notifications/customer-profiles/register-device/';
      render(layoutComponent);
      expect(document.body.textContent).not.toContain('Amazon Pinpoint');
    });

    it('is rendered for the legacy (gen1) push-notifications pages', async () => {
      routerState.asPath =
        '/gen1/react/build-a-backend/push-notifications/set-up-push-notifications/';
      render(layoutComponent);
      expect(document.body.textContent).toContain('Amazon Pinpoint');
    });

    it('is rendered for analytics pages', async () => {
      routerState.asPath = '/react/build-a-backend/add-aws-services/analytics/';
      render(layoutComponent);
      expect(document.body.textContent).toContain('Amazon Pinpoint');
    });
  });
});
