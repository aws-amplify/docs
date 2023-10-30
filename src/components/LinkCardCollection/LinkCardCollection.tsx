import React from 'react';
import { Grid } from '@aws-amplify/ui-react';

interface LinkCardCollectionProps {
  children: React.ReactNode;
}
const LinkCardCollection: React.FC<LinkCardCollectionProps> = ({
  children
}) => {
  return (
    <Grid
      templateColumns={{
        base: '1fr',
        small: '1fr 1fr',
        large: '1fr 1fr 1fr 1fr'
      }}
      gap="small"
    >
      {children}
    </Grid>
  );
};

export default LinkCardCollection;
