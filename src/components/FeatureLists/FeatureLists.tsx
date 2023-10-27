import React from 'react';
import { Grid, Heading } from '@aws-amplify/ui-react';

interface FeatureListsProps {
  children: React.ReactNode;
  platform: string;
}
const FeatureLists: React.FC<FeatureListsProps> = ({ children, platform }) => {
  return (
    <>
      <Heading level={2}>{`Features for ${platform}`}</Heading>
      <Grid
        templateColumns={{
          base: '1fr',
          medium: '1fr',
          large: '1fr 1fr'
        }}
        gap="small"
      >
        {children}
      </Grid>
    </>
  );
};

export default FeatureLists;
