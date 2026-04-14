import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { PLATFORMS, PLATFORM_DISPLAY_NAMES } from '@/data/platforms';
import type { Platform } from '@/data/platforms';

export type GenFilter = 'gen1' | 'gen2' | 'both';
export type PlatformFilter = Platform | 'all';

interface SearchFiltersProps {
  platformFilter: PlatformFilter;
  genFilter: GenFilter;
  onPlatformChange: (platform: PlatformFilter) => void;
  onGenChange: (gen: GenFilter) => void;
}

const GEN_DISPLAY: Record<GenFilter, string> = {
  gen2: 'Gen 2',
  gen1: 'Gen 1',
  both: 'Both'
};

export function SearchFilters({
  platformFilter,
  genFilter,
  onPlatformChange,
  onGenChange
}: SearchFiltersProps) {
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);

  const cleanupContainer = useCallback((container: HTMLElement | null) => {
    container?.remove();
  }, []);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const modal = document.querySelector('.DocSearch-Modal');
      const searchBar = modal?.querySelector('.DocSearch-SearchBar');

      if (searchBar && !modal?.querySelector('.search-filters-container')) {
        const container = document.createElement('div');
        container.className = 'search-filters-container';
        searchBar.insertAdjacentElement('afterend', container);
        setPortalContainer(container);
      } else if (!modal) {
        setPortalContainer((prev) => {
          cleanupContainer(prev);
          return null;
        });
      }
    });
    observer.observe(document.body, { childList: true, subtree: false });
    return () => {
      observer.disconnect();
      setPortalContainer((prev) => {
        cleanupContainer(prev);
        return null;
      });
    };
  }, [cleanupContainer]);

  if (!portalContainer) return null;

  return createPortal(
    <div className="search-filters" role="toolbar" aria-label="Search filters">
      <div className="search-filters__group">
        <span className="search-filters__label">Platform:</span>
        <select
          className="search-filters__select"
          value={platformFilter}
          onChange={(e) => onPlatformChange(e.target.value as PlatformFilter)}
          aria-label="Platform filter"
        >
          <option value="all">All</option>
          {PLATFORMS.map((p) => (
            <option key={p} value={p}>
              {PLATFORM_DISPLAY_NAMES[p]}
            </option>
          ))}
        </select>
      </div>
      <div className="search-filters__separator" />
      <div className="search-filters__group">
        <span className="search-filters__label">Version:</span>
        <select
          className="search-filters__select"
          value={genFilter}
          onChange={(e) => onGenChange(e.target.value as GenFilter)}
          aria-label="Generation filter"
        >
          <option value="gen2">{GEN_DISPLAY.gen2}</option>
          <option value="gen1">{GEN_DISPLAY.gen1}</option>
          <option value="both">{GEN_DISPLAY.both}</option>
        </select>
      </div>
    </div>,
    portalContainer
  );
}
