import React from 'react';
import { Link, View } from '@aws-amplify/ui-react';

interface CategoryFeatureLinkProps {
  isExternal: boolean;
  href: string;
  children: React.ReactNode;
}

const CategoryFeatureLink: React.FC<CategoryFeatureLinkProps> = ({
  href,
  isExternal,
  children
}) => {
  return (
    <View as="li">
      <Link
        href={href}
        className="external-link"
        isExternal={isExternal}
        textDecoration={'underline'}
      >
        {children}
      </Link>
    </View>
  );
};

export default CategoryFeatureLink;
