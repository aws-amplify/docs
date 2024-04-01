import * as React from 'react';
import { render } from '@testing-library/react';
import { FrameworkGrid } from '../index';

describe('FrameworkGrid', () => {
  const component = <FrameworkGrid></FrameworkGrid>;

  it('should render the FrameworkGrid component', async () => {
    render(component);
  });
});
