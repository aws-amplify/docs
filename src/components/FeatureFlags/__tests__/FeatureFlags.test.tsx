import * as React from 'react';
import { render, screen } from '@testing-library/react';
import FeatureFlags from '../index';
import FeatureFlagSummary from '../FeatureFlagSummary';

describe('FeatureFlags', () => {
  it('should render the FeatureFlags component', async () => {
    render(<FeatureFlags></FeatureFlags>);
    const element = await screen.findByRole('heading', { name: 'appSync' });
    expect(element).toBeInTheDocument();
  });

  it('should render the FeatureFlagSummary component', async () => {
    const flag = {
      description:
        'Changes the permission format to grant access to graphql operations instead of appsync control plane operations',
      type: 'Feature',
      valueType: 'Boolean',
      versionAdded: '4.42.0',
      deprecationDate: 'May 1st 2021',
      values: [
        {
          value: 'true',
          description: 'Creates IAM policies to allow Query/Mutations',
          defaultNewProject: true,
          defaultExistingProject: false
        },
        {
          value: 'false',
          description:
            'Uses previous policy format which allows control plane access to AppSync',
          defaultNewProject: false,
          defaultExistingProject: true
        }
      ]
    };

    const component = (
      <FeatureFlagSummary
        key={`feature-flag-summary-${1}`}
        name={'generateGraphQLPermissions'}
        feature={flag}
      />
    );
    render(component);
    const element = await screen.findByRole('link', {
      name: 'generateGraphQLPermissions'
    });
    expect(element).toBeInTheDocument();
  });

  it('should render the FeatureFlagSummary component without description if one doesn"t exist on the flag', async () => {
    const flag = {
      type: 'Feature',
      valueType: 'Boolean',
      versionAdded: '4.42.0',
      deprecationDate: 'May 1st 2021',
      values: [
        {
          value: 'true',
          description: 'Creates IAM policies to allow Query/Mutations',
          defaultNewProject: true,
          defaultExistingProject: false
        },
        {
          value: 'false',
          description:
            'Uses previous policy format which allows control plane access to AppSync',
          defaultNewProject: false,
          defaultExistingProject: true
        }
      ]
    };

    const component = (
      <FeatureFlagSummary
        key={`feature-flag-summary-${1}`}
        name={'generateGraphQLPermissions'}
        feature={flag}
      />
    );
    render(component);
    const element = await screen.findByRole('heading', {
      name: 'generateGraphQLPermissions'
    });
    expect(element.nextElementSibling?.tagName).not.toBe('P');
  });
});
