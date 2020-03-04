import {
  PLATFORM_FILTER_OPTIONS,
  integrationFilterOptions,
  FRAMEWORK_FILTER_OPTIONS,
} from "../../utils/filter-data";

export interface SelectedFilters {
  platform?: typeof PLATFORM_FILTER_OPTIONS[number];
  framework?: typeof FRAMEWORK_FILTER_OPTIONS[number];
  integration?: typeof integrationFilterOptions[number];
}

export type SetSelectedFilters = (updates: SelectedFilters) => void;

export interface PageContext {
  selectedFilters?: SelectedFilters;
  setSelectedFilters?: SetSelectedFilters;
}
