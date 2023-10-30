import React from 'react';
import { Grid, Heading } from '@aws-amplify/ui-react';

interface FeatureListsProps {
  children?: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  title?: string;
}
const FeatureLists: React.FC<FeatureListsProps> = ({
  children,
  title,
  level = 2
}) => {
  return (
    <>
      <Heading level={level}>{title}</Heading>
      <Grid className="feature-lists">{children}</Grid>
    </>
  );
};

export default FeatureLists;
