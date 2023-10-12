import React from 'react';
import { Link } from '@aws-amplify/ui-react';

interface CategoryFeatureLinkProps {
  isExternal?: boolean;
  href?: string;
  children: React.ReactNode;
}

const CategoryFeatureLink: React.FC<CategoryFeatureLinkProps> = ({
  href,
  isExternal,
  children
}) => {
  return (
    <>
      <Link
        href={href}
        className="external-link"
        isExternal={isExternal}
        as="li"
        textDecoration={'underline'}
      >
        {children}
      </Link>
    </>
  );
};

export default CategoryFeatureLink;
