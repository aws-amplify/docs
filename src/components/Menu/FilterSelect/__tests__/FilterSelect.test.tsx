import * as React from 'react';
import { render, screen } from '@testing-library/react';
import FilterSelect from '../index';
import {
  filterOptionsByName,
  filterMetadataByOption
} from '../../../../utils/filter-data';

describe('FilterSelect', () => {
  describe('Unknown filterKind', () => {
    const url = '/start';
    const filterKind = 'unknown';
    const filterKey = 'all';

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
  });

  describe('Platform filters', () => {
    const allIntegrationFilters = filterOptionsByName['platform'];
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

      allIntegrationFilters.forEach((filterValue) => {
        const linkElement = screen.getByText(
          filterMetadataByOption[filterValue]?.label
        );
        expect(linkElement).toBeInTheDocument();
      });
    });
  });

  describe('Framework filters', () => {
    const allIntegrationFilters = filterOptionsByName['framework'];
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

      allIntegrationFilters.forEach((filterValue) => {
        const linkElement = screen.getByText(
          filterMetadataByOption[filterValue]?.label
        );
        expect(linkElement).toBeInTheDocument();
      });
    });
  });
});
