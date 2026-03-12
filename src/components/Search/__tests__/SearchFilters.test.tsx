import * as React from 'react';
import { render, waitFor } from '@testing-library/react';
import { SearchFilters } from '../SearchFilters';
import type { GenFilter, PlatformFilter } from '../SearchFilters';

describe('SearchFilters', () => {
  let mockModal: HTMLElement;
  let onPlatformChange: jest.Mock;
  let onGenChange: jest.Mock;

  beforeEach(() => {
    onPlatformChange = jest.fn();
    onGenChange = jest.fn();
  });

  afterEach(() => {
    if (mockModal) mockModal.remove();
  });

  function renderFilters(
    platformFilter: PlatformFilter = 'react',
    genFilter: GenFilter = 'gen2'
  ) {
    const result = render(
      <SearchFilters
        platformFilter={platformFilter}
        genFilter={genFilter}
        onPlatformChange={onPlatformChange}
        onGenChange={onGenChange}
      />
    );
    // Simulate DocSearch modal DOM structure
    mockModal = document.createElement('div');
    mockModal.className = 'DocSearch-Modal';
    const searchBar = document.createElement('div');
    searchBar.className = 'DocSearch-SearchBar';
    const form = document.createElement('form');
    form.className = 'DocSearch-Form';
    searchBar.appendChild(form);
    mockModal.appendChild(searchBar);
    document.body.appendChild(mockModal);
    return result;
  }

  it('should render both select dropdowns inside the modal', async () => {
    renderFilters();
    await waitFor(() => {
      expect(mockModal.querySelector('.search-filters')).toBeInTheDocument();
    });
    const selects = mockModal.querySelectorAll('.search-filters__select');
    expect(selects.length).toBe(2);
  });

  it('should include "All" option in platform select', async () => {
    renderFilters();
    await waitFor(() => {
      expect(mockModal.querySelector('.search-filters')).toBeInTheDocument();
    });
    const platformSelect = mockModal.querySelectorAll('.search-filters__select')[0] as HTMLSelectElement;
    const options = Array.from(platformSelect.options).map((o) => o.value);
    expect(options).toContain('all');
    expect(options).toContain('react');
  });

  it('should include Gen options in version select', async () => {
    renderFilters();
    await waitFor(() => {
      expect(mockModal.querySelector('.search-filters')).toBeInTheDocument();
    });
    const genSelect = mockModal.querySelectorAll('.search-filters__select')[1] as HTMLSelectElement;
    const options = Array.from(genSelect.options).map((o) => o.value);
    expect(options).toEqual(['gen2', 'gen1', 'both']);
  });

  it('should reflect current platform value', async () => {
    renderFilters('swift', 'gen2');
    await waitFor(() => {
      expect(mockModal.querySelector('.search-filters')).toBeInTheDocument();
    });
    const platformSelect = mockModal.querySelectorAll('.search-filters__select')[0] as HTMLSelectElement;
    expect(platformSelect.value).toBe('swift');
  });
});
