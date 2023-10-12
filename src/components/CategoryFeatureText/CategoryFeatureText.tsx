import React from 'react';
import { View } from '@aws-amplify/ui-react';

interface CategoryFeatureTextProps {
  isExternal?: boolean;
  href?: string;
  children: React.ReactNode;
}

const CategoryFeatureText: React.FC<CategoryFeatureTextProps> = ({
  children
}) => {
  return (
    <View marginTop="-0.75rem" as="li">
      {children}
    </View>
  );
};

export default CategoryFeatureText;
