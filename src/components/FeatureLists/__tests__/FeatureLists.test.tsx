import * as React from 'react';
import { render } from '@testing-library/react';
import { FeatureLists } from '../index';

describe('FeatureLists', () => {
  const component = <FeatureLists></FeatureLists>;

  it('should render the FeatureFlags component', async () => {
    render(component);
  });
});
