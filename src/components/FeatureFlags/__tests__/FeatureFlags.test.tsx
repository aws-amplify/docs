import * as React from 'react';
import { render } from '@testing-library/react';
import FeatureFlags from '../index';

describe('FeatureFlags', () => {
  const component = <FeatureFlags></FeatureFlags>;

  it('should render the FeatureFlags component', async () => {
    render(component);
  });
});
