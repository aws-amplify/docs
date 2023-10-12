import React from 'react';
import { Grid, View, Heading } from '@aws-amplify/ui-react';

interface PlatformFeaturesProps {
  platform: string;
  children: React.ReactNode;
}
const PlatformFeatures: React.FC<PlatformFeaturesProps> = ({
  platform,
  children
}) => {
  return (
    <Grid
      templateColumns={{
        base: '1fr',
        medium: '1fr 1fr',
        large: '1fr 1fr'
      }}
      gap="small"
    >
      <View columnSpan={2}>
        <Heading
          level={2}
          fontWeight={'bold'}
        >{`Features for ${platform}`}</Heading>
      </View>
      {children}
    </Grid>
  );
};

export default PlatformFeatures;
