import React from 'react';
import { Heading } from '@aws-amplify/ui-react';
import { Columns } from '@/components/Columns';

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
      <Columns columns={2}>{children}</Columns>
    </>
  );
};

export default FeatureLists;
