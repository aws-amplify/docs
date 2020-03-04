import {
  filterOptionsByName,
  integrationFilterMetadataByOption,
  frameworkFilterMetadataByOption,
  platformFilterMetadataByOption,
} from "./filter-data";
import {Page} from "../api";
import {SelectedFilters} from "../docs-ui/page/page.types";

/**
 * helper functions for use retrieving & persisting filter state
 */

export const getFilterKeyFromPage = (page: Page) => {
  if (page?.filterKey) {
    const key = page.filterKey as string;
    if (filterOptionsByName[key]) {
      return key as keyof typeof filterOptionsByName;
    }
  }
};

export const getFilterKeyFromLocalStorage = (field: string): string =>
  `amplify-docs::${field}`;

/**
 * we linking the states of different filters in particular ways:
 * 1. when selecting from the quickstart guide––if the user selects javascript
 *    or a web framework, we set the platform to js
 * 2. when selecting any item from framework, we set the platform & integration
 *    (for quickstart guide) to js
 */
export const withFilterOverrides = (
  updates: SelectedFilters,
  currentSelection: SelectedFilters,
): SelectedFilters => {
  const overrides: SelectedFilters = {};

  if (updates.integration) {
    // if user sets integration to js, set platform to js
    if (updates.integration === "js") {
      overrides.platform = "js";
    }

    // if user sets integration to a framework, set platform to js and framework to whatever was selected
    else if (frameworkFilterMetadataByOption[updates.integration]) {
      overrides.platform = "js";
      overrides.framework = updates.integration as keyof typeof frameworkFilterMetadataByOption;
    }

    // if user sets integration state to a platform, set platform to whatever the option...
    // won't apply to js, as we've already covered that condition above.
    // we can also reset framework, given that the user has selected a non-js platform for integration
    else if (platformFilterMetadataByOption[updates.integration]) {
      overrides.platform = updates.integration as keyof typeof platformFilterMetadataByOption;
      overrides.framework = undefined;
    }
  }

  if (updates.platform) {
    // if platform has been set to js
    if (updates.platform === "js") {
      // and there is an integration currently selected
      if (currentSelection.integration) {
        // and the currently-selected integration is NOT a framework
        if (!frameworkFilterMetadataByOption[currentSelection.integration]) {
          // override the integration as js
          overrides.integration = "js" as keyof typeof integrationFilterMetadataByOption;
        }
      }

      // if there's no currently-selected integration, set it to js
      else {
        updates.integration = updates.platform;
      }
    }

    // if the platform update is not js, then set it as the integration, and clear the selected framework
    else {
      updates.integration = updates.platform;
      updates.framework = undefined;
    }
  }

  // if framework is set, update the integration state with it, and set platform to js
  if (updates.framework) {
    overrides.platform = "js";
    overrides.integration = updates.framework as keyof typeof frameworkFilterMetadataByOption;
  }

  return {...updates, ...overrides};
};
