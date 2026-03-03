import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { TopNavBar } from '../TopNavBar';
import { GEN2_SECTIONS } from '@/components/SectionContext/SectionContext';

// jsdom does not implement scrollIntoView
Element.prototype.scrollIntoView = jest.fn();

const routerMock = {
  __esModule: true,
  useRouter: () => {
    return {
      query: { platform: 'react' } as Record<string, string>,
      pathname: '/react/build-a-backend/auth/setup',
      asPath: '/react/build-a-backend/auth/setup'
    };
  }
};

jest.mock('next/router', () => routerMock);

describe('TopNavBar', () => {
  const EXPECTED_LABELS = [
    'Quickstart',
    'Frontend Libraries',
    'Build a Backend',
    'UI Library',
    'Hosting',
    'Reference'
  ];

  describe('Gen2 rendering', () => {
    it('should render all 6 section labels for Gen2 pages', () => {
      render(
        <TopNavBar
          sections={GEN2_SECTIONS}
          currentSection="Build a Backend"
          isGen1={false}
        />
      );

      for (const label of EXPECTED_LABELS) {
        expect(screen.getByText(label)).toBeInTheDocument();
      }
    });

    it('should render a nav element with Section navigation aria-label', () => {
      render(
        <TopNavBar
          sections={GEN2_SECTIONS}
          currentSection="Quickstart"
          isGen1={false}
        />
      );

      const nav = screen.getByRole('navigation', {
        name: 'Section navigation'
      });
      expect(nav).toBeInTheDocument();
    });
  });

  describe('Gen1 behavior', () => {
    it('should return null for Gen1 pages', () => {
      const { container } = render(
        <TopNavBar sections={GEN2_SECTIONS} currentSection="" isGen1={true} />
      );

      expect(container.innerHTML).toBe('');
    });

    it('should not render any section links for Gen1 pages', () => {
      render(
        <TopNavBar sections={GEN2_SECTIONS} currentSection="" isGen1={true} />
      );

      for (const label of EXPECTED_LABELS) {
        expect(screen.queryByText(label)).not.toBeInTheDocument();
      }
    });
  });

  describe('layout positioning', () => {
    it('should render TopNavBar as a separate nav element (not inside GlobalNav)', () => {
      render(
        <TopNavBar
          sections={GEN2_SECTIONS}
          currentSection="Quickstart"
          isGen1={false}
        />
      );

      const nav = screen.getByRole('navigation', {
        name: 'Section navigation'
      });
      expect(nav).toHaveClass('top-nav-bar');
    });
  });

  describe('mobile responsive behavior', () => {
    it('should render the horizontal scroll container with top-nav-bar class', () => {
      render(
        <TopNavBar
          sections={GEN2_SECTIONS}
          currentSection="Quickstart"
          isGen1={false}
        />
      );

      const nav = screen.getByRole('navigation', {
        name: 'Section navigation'
      });
      // The top-nav-bar class applies overflow-x: auto on mobile via CSS
      expect(nav).toHaveClass('top-nav-bar');
    });

    it('should render all section items as non-wrapping list items', () => {
      render(
        <TopNavBar
          sections={GEN2_SECTIONS}
          currentSection="Quickstart"
          isGen1={false}
        />
      );

      const listItems = screen.getAllByRole('listitem');
      expect(listItems).toHaveLength(6);
      for (const item of listItems) {
        expect(item).toHaveClass('top-nav-bar__item');
      }
    });
  });

  describe('active section indicator', () => {
    it('should apply active class to the current section', () => {
      render(
        <TopNavBar
          sections={GEN2_SECTIONS}
          currentSection="Build a Backend"
          isGen1={false}
        />
      );

      const activeLink = screen.getByText('Build a Backend');
      expect(activeLink).toHaveClass('top-nav-item--active');
    });

    it('should set aria-current="page" on the active section link', () => {
      render(
        <TopNavBar
          sections={GEN2_SECTIONS}
          currentSection="Build a Backend"
          isGen1={false}
        />
      );

      const activeLink = screen.getByText('Build a Backend');
      expect(activeLink).toHaveAttribute('aria-current', 'page');
    });

    it('should not set aria-current on inactive section links', () => {
      render(
        <TopNavBar
          sections={GEN2_SECTIONS}
          currentSection="Build a Backend"
          isGen1={false}
        />
      );

      const inactiveLink = screen.getByText('Quickstart');
      expect(inactiveLink).not.toHaveAttribute('aria-current');
    });

    it('should not apply active class to inactive sections', () => {
      render(
        <TopNavBar
          sections={GEN2_SECTIONS}
          currentSection="Hosting"
          isGen1={false}
        />
      );

      const inactiveLink = screen.getByText('Build a Backend');
      expect(inactiveLink).not.toHaveClass('top-nav-item--active');

      const activeLink = screen.getByText('Hosting');
      expect(activeLink).toHaveClass('top-nav-item--active');
    });

    it('should highlight Quickstart for a /react/start URL', () => {
      routerMock.useRouter = () => ({
        query: { platform: 'react' },
        pathname: '/react/start',
        asPath: '/react/start'
      });

      render(
        <TopNavBar
          sections={GEN2_SECTIONS}
          currentSection="Quickstart"
          isGen1={false}
        />
      );

      const link = screen.getByText('Quickstart');
      expect(link).toHaveClass('top-nav-item--active');
    });

    it('should highlight Frontend Libraries for a /react/frontend URL', () => {
      routerMock.useRouter = () => ({
        query: { platform: 'react' },
        pathname: '/react/frontend/auth/sign-in',
        asPath: '/react/frontend/auth/sign-in'
      });

      render(
        <TopNavBar
          sections={GEN2_SECTIONS}
          currentSection="Frontend Libraries"
          isGen1={false}
        />
      );

      const link = screen.getByText('Frontend Libraries');
      expect(link).toHaveClass('top-nav-item--active');
    });

    it('should highlight Reference for a /swift/reference URL', () => {
      routerMock.useRouter = () => ({
        query: { platform: 'swift' },
        pathname: '/swift/reference',
        asPath: '/swift/reference'
      });

      render(
        <TopNavBar
          sections={GEN2_SECTIONS}
          currentSection="Reference"
          isGen1={false}
        />
      );

      const link = screen.getByText('Reference');
      expect(link).toHaveClass('top-nav-item--active');
    });
  });

  describe('section link hrefs', () => {
    it('should resolve section hrefs with the current platform', () => {
      routerMock.useRouter = () => ({
        query: { platform: 'react' },
        pathname: '/react/build-a-backend/auth/setup',
        asPath: '/react/build-a-backend/auth/setup'
      });

      render(
        <TopNavBar
          sections={GEN2_SECTIONS}
          currentSection="Build a Backend"
          isGen1={false}
        />
      );

      const quickstartLink = screen.getByText('Quickstart').closest('a');
      expect(quickstartLink).toHaveAttribute('href', '/react/start');

      const backendLink = screen.getByText('Build a Backend').closest('a');
      expect(backendLink).toHaveAttribute('href', '/react/build-a-backend');
    });

    it('should default to react when platform is not in URL', () => {
      routerMock.useRouter = () => ({
        query: {},
        pathname: '/',
        asPath: '/'
      });

      render(
        <TopNavBar sections={GEN2_SECTIONS} currentSection="" isGen1={false} />
      );

      const quickstartLink = screen.getByText('Quickstart').closest('a');
      expect(quickstartLink).toHaveAttribute('href', '/react/start');
    });
  });
});
