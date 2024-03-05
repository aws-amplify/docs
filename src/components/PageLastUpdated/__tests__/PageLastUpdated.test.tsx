import * as React from 'react';
import { render } from '@testing-library/react';
import { PageLastUpdated } from '../index';
import flatDirectory from '../../../directory/flatDirectory.json';

describe('PageLastUpdated', () => {
  const directoryData = flatDirectory['/[platform]/how-amplify-works'];
  const component = <PageLastUpdated directoryData={directoryData} />;
  it('should render the PageLastUpdated component', async () => {
    render(component);

    const lastUpdated = document.querySelector('.page-last-updated');
    expect(lastUpdated).toBeInTheDocument();
  });

  it('should show the last updated date', async () => {
    render(component);
    const lastUpdated = document.querySelector('.page-last-updated');
    expect(lastUpdated).not.toBeNull();
  });
});
