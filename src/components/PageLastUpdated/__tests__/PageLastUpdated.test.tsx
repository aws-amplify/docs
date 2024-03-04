import * as React from 'react';
import { render } from '@testing-library/react';
import { PageLastUpdated } from '../index';
import flatDirectory from '../../../directory/flatDirectory.json';

describe('PageLastUpdated', () => {
  const directoryData = flatDirectory['/[platform]/how-amplify-works'];
  const component = <PageLastUpdated directoryData={directoryData} />;
  it('should render the PageLastUpdated component', async () => {
    render(component);

    const pageLastUpdatedNode =
      document.getElementsByClassName('page-last-updated')[0];
    expect(pageLastUpdatedNode).toBeInTheDocument();
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

    const pageLastUpdatedNode =
      document.getElementsByClassName('page-last-updated')[0];
    expect(pageLastUpdatedNode.textContent).toBe(`Page updated ${date} `);
  });
});
