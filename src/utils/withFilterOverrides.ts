import {
  filterMetadataByOption,
  FRAMEWORK_FILTER_OPTIONS,
  PLATFORM_FILTER_OPTIONS,
  SelectedFilters,
} from "./filter-data";

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
    else if (FRAMEWORK_FILTER_OPTIONS.includes(updates.integration)) {
      overrides.platform = "js";
      overrides.framework = updates.integration as keyof typeof filterMetadataByOption;
    }

    // if user sets integration state to a platform, set platform to whatever the option...
    // won't apply to js, as we've already covered that condition above.
    // we can also reset framework, given that the user has selected a non-js platform for integration
    else if (PLATFORM_FILTER_OPTIONS.includes(updates.integration)) {
      overrides.platform = updates.integration as keyof typeof filterMetadataByOption;
      overrides.framework = undefined;
    }
  }

  if (updates.platform) {
    // if platform has been set to js
    if (updates.platform === "js") {
      // and there is an integration currently selected
      if (currentSelection.integration) {
        // and the currently-selected integration is NOT a framework
        if (!FRAMEWORK_FILTER_OPTIONS.includes(currentSelection.integration)) {
          // override the integration as js
          overrides.integration = "js" as keyof typeof filterMetadataByOption;
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
    overrides.integration = updates.framework as keyof typeof filterMetadataByOption;
  }

  return {...updates, ...overrides};
};
