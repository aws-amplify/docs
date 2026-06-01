import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { RIGHT_NAV_LINKS } from '@/utils/globalnav';
import { GlobalNav, NavMenuItem } from '@/components/GlobalNav/GlobalNav';
import { SECTIONS, SectionKey } from '@/data/sections';

const routerMock = {
  __esModule: true,
  useRouter: () => {
    return {
      query: { platform: 'react' },
      pathname: '/',
      asPath: '/'
    };
  }
};

jest.mock('next/router', () => routerMock);

describe('GlobalNav', () => {
  const component = (
    <GlobalNav
      rightLinks={RIGHT_NAV_LINKS as NavMenuItem[]}
      currentSite="Docs"
      isGen1={false}
      mainId="pageMain"
      activeSection="backend"
      onSectionChange={() => {}}
      currentPlatform="react"
    />
  );

  it('should render the GlobalNav component', async () => {
    render(component);
    const link = await screen.findByRole('link', {
      name: 'About AWS Amplify (opens in new tab)'
    });
    expect(link).toBeInTheDocument();
  });

  it('should render all section tabs for Gen2', () => {
    render(component);
    const visibleKeys = (Object.keys(SECTIONS) as SectionKey[]).filter(
      (key) => !SECTIONS[key].hideFromNav
    );
    visibleKeys.forEach((key) => {
      expect(screen.getByText(SECTIONS[key].label)).toBeInTheDocument();
    });
  });

  it('should not render section tabs for Gen1', () => {
    render(
      <GlobalNav
        rightLinks={RIGHT_NAV_LINKS as NavMenuItem[]}
        currentSite="Docs"
        isGen1={true}
        mainId="pageMain"
      />
    );
    expect(screen.queryByText('Build a Backend')).not.toBeInTheDocument();
  });

  it('should highlight the active section tab', () => {
    render(component);
    const backendTab = screen.getByText('Build a Backend').closest('a');
    expect(backendTab?.className).toContain('section-nav__tab--active');
  });

  it('should link frontend tab to featureRoute when on a backend page', () => {
    render(
      <GlobalNav
        rightLinks={RIGHT_NAV_LINKS as NavMenuItem[]}
        currentSite="Docs"
        isGen1={false}
        mainId="pageMain"
        activeSection="backend"
        onSectionChange={() => {}}
        currentPlatform="react"
        pageSection="backend"
        featureRoute="/[platform]/frontend/auth"
      />
    );
    const frontendTab = screen.getByText('Frontend Libraries').closest('a');
    expect(frontendTab).toHaveAttribute('href', '/react/frontend/auth');
  });

  it('should link backend tab to featureRoute when on a frontend page', () => {
    render(
      <GlobalNav
        rightLinks={RIGHT_NAV_LINKS as NavMenuItem[]}
        currentSite="Docs"
        isGen1={false}
        mainId="pageMain"
        activeSection="frontend"
        onSectionChange={() => {}}
        currentPlatform="swift"
        pageSection="frontend"
        featureRoute="/[platform]/build-a-backend/auth"
      />
    );
    const backendTab = screen.getByText('Build a Backend').closest('a');
    expect(backendTab).toHaveAttribute('href', '/swift/build-a-backend/auth');
  });

  it('should use default section path when no featureRoute is provided', () => {
    render(component);
    const frontendTab = screen.getByText('Frontend Libraries').closest('a');
    expect(frontendTab).toHaveAttribute('href', '/react/frontend');
  });

  it('should use default path for non-backend/frontend tabs even with featureRoute', () => {
    render(
      <GlobalNav
        rightLinks={RIGHT_NAV_LINKS as NavMenuItem[]}
        currentSite="Docs"
        isGen1={false}
        mainId="pageMain"
        activeSection="backend"
        onSectionChange={() => {}}
        currentPlatform="react"
        pageSection="backend"
        featureRoute="/[platform]/frontend/auth"
      />
    );
    const hostingTab = screen.getByText('Hosting').closest('a');
    expect(hostingTab).toHaveAttribute('href', '/react/deploy-and-host');
  });
});
