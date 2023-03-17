import {
  filterMetadataByOption,
  FRAMEWORK_FILTER_OPTIONS,
  PLATFORM_FILTER_OPTIONS,
  SelectedFilters
} from './filter-data';

export const withFilterOverrides = (
  updates: SelectedFilters,
  currentSelection: SelectedFilters
): SelectedFilters => {
  const overrides: SelectedFilters = {};

  if (updates.integration) {
    // if user sets integration to js, set platform to js
    if (updates.integration === 'js') {
      overrides.platform = 'js';
      // if user sets integration to flutter, set platform to flutter
    } else if (updates.integration === 'flutter') {
      overrides.platform = 'flutter';
    } else if (updates.integration === 'react-native') {
      overrides.platform = 'react-native';
    }

    // if user sets integration to a framework, set platform to js and framework to whatever was selected
    else if (
      FRAMEWORK_FILTER_OPTIONS.includes(updates.integration) &&
      updates.integration !== 'flutter'
    ) {
      overrides.platform = 'js';
      overrides.framework = updates.integration as keyof typeof filterMetadataByOption;
    }

    // if user sets integration state to a platform, set platform to whatever the option...
    // won't apply to js or flutter, as we've already covered that condition above.
    // we can also reset framework, given that the user has selected a non-js platform for integration
    else if (PLATFORM_FILTER_OPTIONS.includes(updates.integration)) {
      overrides.platform = updates.integration as keyof typeof filterMetadataByOption;
      overrides.framework = undefined;
    }
  }

  if (updates.platform) {
    // if platform has been set to js
    if (updates.platform === 'js') {
      // and there is an integration currently selected
      if (currentSelection.integration) {
        // and the currently-selected integration is NOT a framework
        if (!FRAMEWORK_FILTER_OPTIONS.includes(currentSelection.integration)) {
          // override the integration as js
          overrides.integration = 'js' as keyof typeof filterMetadataByOption;
        }
      }

      // if there's no currently-selected integration, set it to js
      else {
        updates.integration = updates.platform;
      }
      // if platform has been set to flutter, then set it as integration and as framework
    } else if (updates.platform === 'flutter') {
      updates.integration = updates.platform;
      updates.framework = 'flutter';
    }

    // if the platform update is not js nor flutter, then set it as the integration, and clear the selected framework
    else {
      updates.integration = updates.platform;
      updates.framework = undefined;
    }
  }

  // if framework is set, update the integration state with it
  if (updates.framework) {
    if (updates.framework === 'flutter') {
      overrides.platform = 'flutter';
    } else if (updates.framework === 'react-native') {
      overrides.platform = 'react-native';
    } else {
      // if the framework is not any of the above, assume it is a js framework and set platform to js
      overrides.platform = 'js';
    }
    overrides.integration = updates.framework as keyof typeof filterMetadataByOption;
  }

  return { ...updates, ...overrides };
};
