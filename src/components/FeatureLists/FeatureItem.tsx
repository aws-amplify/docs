import { View, Link } from '@aws-amplify/ui-react';
export const FeatureItem = ({ children, linkText, href, isExternal }) => {
  return (
    <View as="li" className="feature-link">
      <Link href={href} isExternal={isExternal} className="feature-link-text">
        {linkText}
      </Link>
      <View> {children}</View>
    </View>
  );
};

export default FeatureItem;
