import * as React from 'react';
import { render, screen, within } from '@testing-library/react';
import { GlobalNav, NavMenuItem, NavMenuItemType } from '../GlobalNav';
import { TopNavBar } from '@/components/TopNavBar/TopNavBar';
import { GEN2_SECTIONS } from '@/components/SectionContext/SectionContext';

// jsdom does not implement scrollIntoView
Element.prototype.scrollIntoView = jest.fn();

const routerMock = {
  __esModule: true,
  useRouter: () => ({
    query: { platform: 'react' } as Record<string, string>,
    pathname: '/react/build-a-backend/auth/setup',
    asPath: '/react/build-a-backend/auth/setup'
  })
};

jest.mock('next/router', () => routerMock);

const leftLinks: NavMenuItem[] = [
  {
    type: NavMenuItemType.DEFAULT,
    label: 'UI Library',
    url: '/ui',
    order: 1
  }
];

const rightLinks: NavMenuItem[] = [
  {
    type: NavMenuItemType.DEFAULT,
    label: 'About',
    url: '/about',
    order: 1
  }
];

describe('GenSwitcher preservation (Requirement 6.9)', () => {
  describe('GenSwitcher renders within GlobalNav', () => {
    it('should render GenSwitcher inside GlobalNav for Gen2 pages', () => {
      render(
        <GlobalNav
          leftLinks={leftLinks}
          rightLinks={rightLinks}
          currentSite="Docs"
          isGen1={false}
          mainId="pageMain"
        />
      );

      const globalNav = screen.getByRole('navigation', {
        name: /Amplify Docs/i
      });
      const genSwitcher = within(globalNav).getByRole('button', {
        name: /Gen 2|Open Amplify generation navigation/i
      });
      expect(genSwitcher).toBeInTheDocument();
    });

    it('should render GenSwitcher inside GlobalNav for Gen1 pages', () => {
      render(
        <GlobalNav
          leftLinks={leftLinks}
          rightLinks={rightLinks}
          currentSite="Docs"
          isGen1={true}
          mainId="pageMain"
        />
      );

      const globalNav = screen.getByRole('navigation', {
        name: /Amplify Docs/i
      });
      const genSwitcher = within(globalNav).getByRole('button', {
        name: /Gen 1|Open Amplify generation navigation/i
      });
      expect(genSwitcher).toBeInTheDocument();
    });
  });

  describe('GenSwitcher is NOT inside TopNavBar', () => {
    it('should not contain GenSwitcher within TopNavBar', () => {
      render(
        <TopNavBar
          sections={GEN2_SECTIONS}
          currentSection="Build a Backend"
          isGen1={false}
        />
      );

      const topNav = screen.getByRole('navigation', {
        name: 'Section navigation'
      });
      const genSwitcherButton = within(topNav).queryByRole('button', {
        name: /Gen [12]|Open Amplify generation navigation/i
      });
      expect(genSwitcherButton).not.toBeInTheDocument();
    });
  });

  describe('GenSwitcher behavior is preserved', () => {
    it('should display "Gen 2" trigger button when on Gen2 pages', () => {
      render(
        <GlobalNav
          leftLinks={leftLinks}
          rightLinks={rightLinks}
          currentSite="Docs"
          isGen1={false}
          mainId="pageMain"
        />
      );

      const globalNav = screen.getByRole('navigation', {
        name: /Amplify Docs/i
      });
      const buttons = within(globalNav).getAllByRole('button');
      const genSwitcherButton = buttons.find((btn) =>
        btn.textContent?.includes('Gen 2')
      );
      expect(genSwitcherButton).toBeDefined();
      expect(genSwitcherButton).toHaveTextContent('Gen 2');
    });

    it('should display "Gen 1" trigger button when on Gen1 pages', () => {
      render(
        <GlobalNav
          leftLinks={leftLinks}
          rightLinks={rightLinks}
          currentSite="Docs"
          isGen1={true}
          mainId="pageMain"
        />
      );

      const globalNav = screen.getByRole('navigation', {
        name: /Amplify Docs/i
      });
      // There are two buttons: the GenSwitcher trigger and the mobile nav expander
      const buttons = within(globalNav).getAllByRole('button');
      const genSwitcherButton = buttons.find((btn) =>
        btn.textContent?.includes('Gen 1')
      );
      expect(genSwitcherButton).toBeDefined();
      expect(genSwitcherButton).toHaveTextContent('Gen 1');
    });

    it('should contain Gen1 and Gen2 navigation links', () => {
      render(
        <GlobalNav
          leftLinks={leftLinks}
          rightLinks={rightLinks}
          currentSite="Docs"
          isGen1={false}
          mainId="pageMain"
        />
      );

      const gen1Link = screen.getByRole('link', { name: 'Gen 1' });
      const gen2Link = screen.getByRole('link', { name: 'Gen 2' });
      expect(gen1Link).toBeInTheDocument();
      expect(gen2Link).toBeInTheDocument();
    });
  });
});
