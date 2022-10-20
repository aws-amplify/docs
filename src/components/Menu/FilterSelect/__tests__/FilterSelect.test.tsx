import * as React from 'react';
import { render, screen } from '@testing-library/react';
import FilterSelect from '../index';

describe('FilterSelect', () => {
  const url = '/start/q/integration/js';
  const filterKind = 'integration';
  const filterKey = 'js';
  const filters = [
    'swift',
    'android',
    'flutter',
    'js',
    'next',
    'react',
    'react-native',
    'vue'
  ];

  function capitalize(input) {
    return input && input[0].toUpperCase() + input.slice(1);
  }

  it('should render a link for each filter value', async () => {
    render(
      <FilterSelect
        filters={filters}
        filterKey={filterKey}
        filterKind={filterKind}
        url={url}
      />
    );

    filters.forEach((filterValue) => {
      const linkElement = screen.getByText(capitalize(filterValue));
      expect(linkElement).toBeInTheDocument();
    });
  });
});
