import { View, Link } from '@aws-amplify/ui-react';

interface FeatureItemProps {
  children?: React.ReactNode;
  linkText?: string;
  href?: string;
  isExternal?: boolean;
}

export const FeatureItem = ({
  children,
  linkText,
  href,
  isExternal
}: FeatureItemProps) => {
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
