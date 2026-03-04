import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { LayoutHeader } from '../LayoutHeader';
import { LayoutContext } from '../LayoutProvider';
import { SectionProvider } from '@/components/SectionContext/SectionContext';

// Capture the props passed to DocSearch so we can assert on searchParameters
let capturedDocSearchProps: Record<string, unknown> = {};

jest.mock('@docsearch/react', () => ({
  DocSearch: (props: Record<string, unknown>) => {
    capturedDocSearchProps = props;
    return <div data-testid="docsearch-mock" />;
  }
}));

jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: () => ({
    query: { platform: 'react' },
    pathname: '/react/build-a-backend/auth/setup',
    asPath: '/react/build-a-backend/auth/setup'
  })
}));

jest.mock('@/directory/flatDirectory.json', () => ({}), { virtual: true });

jest.mock('@/utils/usePathWithoutHash', () => ({
  usePathWithoutHash: () => '/react/build-a-backend/auth/setup'
}));

const defaultLayoutContext = {
  colorMode: 'system' as const,
  handleColorModeChange: (v: any) => v,
  menuOpen: false,
  toggleMenuOpen: jest.fn()
};

function renderLayoutHeader(
  pathname = '/react/build-a-backend/auth/setup',
  isGen1 = false,
  platform: 'react' | 'swift' = 'react'
) {
  capturedDocSearchProps = {};
  return render(
    <LayoutContext.Provider value={defaultLayoutContext}>
      <SectionProvider pathname={pathname}>
        <LayoutHeader
          currentPlatform={platform}
          isGen1={isGen1}
          showLastUpdatedDate={false}
        />
      </SectionProvider>
    </LayoutContext.Provider>
  );
}

describe('LayoutHeader DocSearch searchParameters', () => {
  beforeEach(() => {
    capturedDocSearchProps = {};
  });

  describe('default state (boost mode)', () => {
    it('should use hard facetFilters for gen only', () => {
      renderLayoutHeader('/react/build-a-backend/auth/setup', false, 'react');

      const params = capturedDocSearchProps.searchParameters as Record<
        string,
        unknown
      >;
      expect(params.facetFilters).toEqual(['gen:gen2']);
    });

    it('should use optionalFacetFilters for platform boosting', () => {
      renderLayoutHeader('/react/build-a-backend/auth/setup', false, 'react');

      const params = capturedDocSearchProps.searchParameters as Record<
        string,
        unknown
      >;
      expect(params.optionalFacetFilters).toEqual(['platform:react']);
    });

    it('should use gen1 in facetFilters when isGen1 is true', () => {
      renderLayoutHeader(
        '/gen1/react/build-a-backend/auth/setup',
        true,
        'react'
      );

      const params = capturedDocSearchProps.searchParameters as Record<
        string,
        unknown
      >;
      expect(params.facetFilters).toEqual(['gen:gen1']);
    });

    it('should boost the correct platform when platform is swift', () => {
      renderLayoutHeader('/swift/build-a-backend/auth/setup', false, 'swift');

      const params = capturedDocSearchProps.searchParameters as Record<
        string,
        unknown
      >;
      expect(params.optionalFacetFilters).toEqual(['platform:swift']);
    });

    it('should not include platform in hard facetFilters by default', () => {
      renderLayoutHeader('/react/build-a-backend/auth/setup', false, 'react');

      const params = capturedDocSearchProps.searchParameters as Record<
        string,
        unknown
      >;
      const facetFilters = params.facetFilters as string[];
      const hasPlatformHardFilter = facetFilters.some((f: string) =>
        f.startsWith('platform:')
      );
      expect(hasPlatformHardFilter).toBe(false);
    });
  });

  describe('platform chip toggling', () => {
    it('should move platform to hard facetFilters when chip is toggled to hard mode', () => {
      renderLayoutHeader('/react/build-a-backend/auth/setup', false, 'react');

      // Click the platform chip: boost → hard
      const boostChip = screen.getByText('Prioritize React');
      fireEvent.click(boostChip);

      const params = capturedDocSearchProps.searchParameters as Record<
        string,
        unknown
      >;
      expect(params.facetFilters).toEqual(['gen:gen2', 'platform:react']);
      expect(params.optionalFacetFilters).toBeUndefined();
    });

    it('should remove platform from all filters when chip is toggled to none mode', () => {
      renderLayoutHeader('/react/build-a-backend/auth/setup', false, 'react');

      // Click twice: boost → hard → none
      fireEvent.click(screen.getByText('Prioritize React'));
      fireEvent.click(screen.getByText('Only React'));

      const params = capturedDocSearchProps.searchParameters as Record<
        string,
        unknown
      >;
      expect(params.facetFilters).toEqual(['gen:gen2']);
      expect(params.optionalFacetFilters).toBeUndefined();
    });
  });
});
