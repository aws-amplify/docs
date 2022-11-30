import * as React from 'react';
import { render, screen } from '@testing-library/react';
import FilterSelect from '../index';
import {
  filterOptionsByName,
  filterMetadataByOption
} from '../../../../utils/filter-data';

describe('FilterSelect', () => {
  describe('General Behavior', () => {
    const filterKind = 'platform';
    const filterKey = 'react';
    const filters = filterOptionsByName['platform'];

    it('should generate the expected URLs', () => {
      const url = '/start';
      const expectedUrl = '/start/q/platform/js';

      render(
        <FilterSelect
          filters={filters}
          filterKey={filterKey}
          filterKind={filterKind}
          url={url}
        />
      );

      const linkUrls = screen
        .getAllByRole('link', { hidden: true })
        .map((node) => node.getAttribute('href'));

      filters.forEach((filterValue) => {
        const expectedUrl = `/start/q/platform/${filterValue}`;
        expect(linkUrls).toContain(expectedUrl);
      });
    });

    it('should remove the passed in query string from the generated url', () => {
      const url = '/start/q/platform/react/?someKey=someValue';

      render(
        <FilterSelect
          filters={filters}
          filterKey={filterKey}
          filterKind={filterKind}
          url={url}
        />
      );

      const linkUrls = screen
        .getAllByRole('link', { hidden: true })
        .map((node) => node.getAttribute('href'));

      filters.forEach((filterValue) => {
        const expectedUrl = `/start/q/platform/${filterValue}`;
        expect(linkUrls).toContain(expectedUrl);
      });
    });

    it('should remove the passed in hash from the generated url', () => {
      const url = '/start/q/platform/react/#getting-started';

      render(
        <FilterSelect
          filters={filters}
          filterKey={filterKey}
          filterKind={filterKind}
          url={url}
        />
      );

      const linkUrls = screen
        .getAllByRole('link', { hidden: true })
        .map((node) => node.getAttribute('href'));

      filters.forEach((filterValue) => {
        const expectedUrl = `/start/q/platform/${filterValue}`;
        expect(linkUrls).toContain(expectedUrl);
      });
    });
  });

  describe('Unknown filterKind', () => {
    const url = '/start';
    const filterKind = 'unknown';
    const filterKey = 'all';
    const allFilters = filterOptionsByName['integration'];

    it('should render the passed in filters', () => {
      const filters = ['android', 'ios'];

      render(
        <FilterSelect
          filters={filters}
          filterKey={filterKey}
          filterKind={filterKind}
          url={url}
        />
      );

      filters.forEach((filterValue) => {
        const linkElement = screen.getByText(
          filterMetadataByOption[filterValue]?.label
        );
        expect(linkElement).toBeInTheDocument();
      });
    });

    it('should only render the passed in filters', () => {
      const filters = ['android', 'ios'];

      render(
        <FilterSelect
          filters={filters}
          filterKey={filterKey}
          filterKind={filterKind}
          url={url}
        />
      );

      allFilters.forEach((filterValue) => {
        if (filters.includes(filterValue)) {
          expect(
            screen.queryByText(filterMetadataByOption[filterValue]?.label)
          ).toBeTruthy();
        } else {
          expect(
            screen.queryByText(filterMetadataByOption[filterValue]?.label)
          ).toBeNull();
        }
      });
    });
  });

  describe('Platform filters', () => {
    const allPlatformFilters = filterOptionsByName['platform'];
    const url = '/start';
    const filterKind = 'platform';
    const filterKey = 'all';
    const filters = [];

    it('should render a link for each filter value', async () => {
      render(
        <FilterSelect
          filters={filters}
          filterKey={filterKey}
          filterKind={filterKind}
          url={url}
        />
      );

      allPlatformFilters.forEach((filterValue) => {
        const linkElement = screen.getByText(
          filterMetadataByOption[filterValue]?.label
        );
        expect(linkElement).toBeInTheDocument();
      });
    });
  });

  describe('Framework filters', () => {
    const allFrameworkFilters = filterOptionsByName['framework'];
    const url = '/start';
    const filterKind = 'framework';
    const filterKey = 'all';
    const filters = [];

    it('should render a link for each filter value', async () => {
      render(
        <FilterSelect
          filters={filters}
          filterKey={filterKey}
          filterKind={filterKind}
          url={url}
        />
      );

      allFrameworkFilters.forEach((filterValue) => {
        const linkElement = screen.getByText(
          filterMetadataByOption[filterValue]?.label
        );
        expect(linkElement).toBeInTheDocument();
      });
    });
  });
});
