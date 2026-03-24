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
    const sectionKeys = Object.keys(SECTIONS) as SectionKey[];
    sectionKeys.forEach((key) => {
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
});
