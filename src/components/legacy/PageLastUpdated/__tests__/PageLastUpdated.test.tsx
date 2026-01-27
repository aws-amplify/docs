import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { PageLastUpdated } from '../index';
import flatDirectory from '@/directory/flatDirectory.json';

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
    const date = new Date(directoryData.lastUpdated).toLocaleDateString(
      'en-us',
      {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }
    );

    const lastUpdated = await screen.queryByText(`Page updated ${date}`);
    expect(lastUpdated).not.toBeNull();
  });
});
