import React from 'react';
import classNames from 'classnames';
import { Platform, PLATFORM_DISPLAY_NAMES } from '@/data/platforms';

export type PlatformFilterMode = 'boost' | 'hard' | 'none';

export interface SearchFilterChipsProps {
  currentGen: 'gen1' | 'gen2';
  currentPlatform: Platform;
  currentSection?: string;
  onPlatformFilterChange: (mode: PlatformFilterMode) => void;
  onSectionFilterChange?: (section: string | null) => void;
}

/**
 * Cycles through the three platform filter modes:
 * boost → hard → none → boost
 */
function nextPlatformMode(current: PlatformFilterMode): PlatformFilterMode {
  if (current === 'boost') return 'hard';
  if (current === 'hard') return 'none';
  return 'boost';
}

/**
 * Returns the label for the platform chip based on the current filter mode.
 */
function getPlatformChipLabel(
  platform: Platform,
  mode: PlatformFilterMode
): string {
  const name = PLATFORM_DISPLAY_NAMES[platform];
  if (mode === 'boost') return `Prioritize ${name}`;
  if (mode === 'hard') return `Only ${name}`;
  return 'All platforms';
}

/**
 * Renders filter chip controls for search. Displayed below the DocSearch input
 * to let users control how results are filtered by gen, platform, and section.
 *
 * - Gen chip: always active, not toggleable (determined by page context)
 * - Platform chip: toggles between boost (default), hard filter, and no filter
 * - Section chips: off by default, user can click to add a hard section filter
 */
export function SearchFilterChips({
  currentGen,
  currentPlatform,
  onPlatformFilterChange
}: SearchFilterChipsProps) {
  return (
    <div
      className="search-filter-chips"
      role="group"
      aria-label="Search filters"
    >
      {/* Gen chip — always active, not toggleable */}
      <span
        className="search-filter-chip search-filter-chip--active search-filter-chip--gen"
        aria-label={`Filtering by ${currentGen === 'gen2' ? 'Gen2' : 'Gen1'}`}
      >
        {currentGen === 'gen2' ? 'Gen2' : 'Gen1'}
      </span>

      {/* Platform chip — cycles through boost / hard / none */}
      <PlatformChip
        platform={currentPlatform}
        onFilterChange={onPlatformFilterChange}
      />
    </div>
  );
}

/**
 * Internal component for the platform filter chip.
 * Manages its own state for the three-way toggle: boost → hard → none.
 */
function PlatformChip({
  platform,
  onFilterChange
}: {
  platform: Platform;
  onFilterChange: (mode: PlatformFilterMode) => void;
}) {
  // Track the current mode internally so we can cycle through states on click.
  // Default is 'boost' — platform results are prioritized but not exclusively shown.
  const [mode, setMode] = React.useState<PlatformFilterMode>('boost');

  const handleClick = () => {
    const next = nextPlatformMode(mode);
    setMode(next);
    onFilterChange(next);
  };

  const label = getPlatformChipLabel(platform, mode);

  return (
    <button
      type="button"
      className={classNames('search-filter-chip', {
        'search-filter-chip--active': mode !== 'none',
        'search-filter-chip--hard': mode === 'hard'
      })}
      aria-label={label}
      onClick={handleClick}
    >
      {label}
    </button>
  );
}
