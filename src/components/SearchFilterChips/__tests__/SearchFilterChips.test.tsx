import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchFilterChips } from '../SearchFilterChips';

describe('SearchFilterChips', () => {
  const defaultProps = {
    currentGen: 'gen2' as const,
    currentPlatform: 'react' as const,
    onPlatformFilterChange: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Gen chip', () => {
    it('should render Gen2 chip when currentGen is gen2', () => {
      render(<SearchFilterChips {...defaultProps} />);
      expect(screen.getByText('Gen2')).toBeInTheDocument();
    });

    it('should render Gen1 chip when currentGen is gen1', () => {
      render(<SearchFilterChips {...defaultProps} currentGen="gen1" />);
      expect(screen.getByText('Gen1')).toBeInTheDocument();
    });

    it('should always have the active class on the Gen chip', () => {
      render(<SearchFilterChips {...defaultProps} />);
      const genChip = screen.getByText('Gen2');
      expect(genChip).toHaveClass('search-filter-chip--active');
    });

    it('should render Gen chip as a span (not a button), making it not toggleable', () => {
      render(<SearchFilterChips {...defaultProps} />);
      const genChip = screen.getByText('Gen2');
      expect(genChip.tagName).toBe('SPAN');
    });

    it('should have an aria-label indicating the current gen filter', () => {
      render(<SearchFilterChips {...defaultProps} />);
      expect(screen.getByLabelText('Filtering by Gen2')).toBeInTheDocument();
    });
  });

  describe('Platform chip — boost/hard/none toggle', () => {
    it('should default to boost mode showing "Prioritize React"', () => {
      render(<SearchFilterChips {...defaultProps} />);
      expect(screen.getByText('Prioritize React')).toBeInTheDocument();
    });

    it('should cycle to hard mode on first click showing "Only React"', () => {
      render(<SearchFilterChips {...defaultProps} />);
      fireEvent.click(screen.getByText('Prioritize React'));

      expect(screen.getByText('Only React')).toBeInTheDocument();
      expect(defaultProps.onPlatformFilterChange).toHaveBeenCalledWith('hard');
    });

    it('should cycle to none mode on second click showing "All platforms"', () => {
      render(<SearchFilterChips {...defaultProps} />);
      const chip = screen.getByText('Prioritize React');

      fireEvent.click(chip); // boost → hard
      fireEvent.click(screen.getByText('Only React')); // hard → none

      expect(screen.getByText('All platforms')).toBeInTheDocument();
      expect(defaultProps.onPlatformFilterChange).toHaveBeenLastCalledWith(
        'none'
      );
    });

    it('should cycle back to boost mode on third click', () => {
      render(<SearchFilterChips {...defaultProps} />);

      fireEvent.click(screen.getByText('Prioritize React')); // boost → hard
      fireEvent.click(screen.getByText('Only React')); // hard → none
      fireEvent.click(screen.getByText('All platforms')); // none → boost

      expect(screen.getByText('Prioritize React')).toBeInTheDocument();
      expect(defaultProps.onPlatformFilterChange).toHaveBeenLastCalledWith(
        'boost'
      );
    });

    it('should show the correct platform display name for swift', () => {
      render(<SearchFilterChips {...defaultProps} currentPlatform="swift" />);
      expect(screen.getByText('Prioritize Swift')).toBeInTheDocument();
    });

    it('should have active class in boost and hard modes but not in none', () => {
      render(<SearchFilterChips {...defaultProps} />);

      // boost mode — active
      const boostChip = screen.getByText('Prioritize React');
      expect(boostChip).toHaveClass('search-filter-chip--active');

      // hard mode — active
      fireEvent.click(boostChip);
      const hardChip = screen.getByText('Only React');
      expect(hardChip).toHaveClass('search-filter-chip--active');

      // none mode — not active
      fireEvent.click(hardChip);
      const noneChip = screen.getByText('All platforms');
      expect(noneChip).not.toHaveClass('search-filter-chip--active');
    });
  });

  describe('container', () => {
    it('should render a group with "Search filters" aria-label', () => {
      render(<SearchFilterChips {...defaultProps} />);
      expect(
        screen.getByRole('group', { name: 'Search filters' })
      ).toBeInTheDocument();
    });
  });
});
