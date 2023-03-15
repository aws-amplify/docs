import * as React from 'react';
import { render, screen } from '@testing-library/react';
import FeaturesGrid from '../index';

describe('FeaturesGrid', () => {
  const featureSections = [
    'Authentication',
    'Storage',
    'GraphQL API',
    'DataStore',
    'Geo',
    'REST API',
    'Analytics',
    'Push Notifications',
    'PubSub',
    'Interactions',
    'AI / ML Predictions'
  ];

  featureSections.forEach((featureTitle) => {
    it(`should render the FeaturesGrid ${featureTitle} section`, async () => {
      render(<FeaturesGrid />);

      const featureNode = await screen.findByText(featureTitle);
      expect(featureNode).toBeInTheDocument();
    });
  });
});
