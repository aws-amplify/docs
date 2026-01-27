import { View, Link as UiLink } from '@aws-amplify/ui-react';
import Link from 'next/link';
import { UrlObject } from 'url';

interface FeatureItemProps {
  children?: React.ReactNode;
  linkText?: string;
  href: string | UrlObject;
  isExternal?: boolean;
}

export const FeatureItem = ({
  children,
  linkText,
  href,
  isExternal = false
}: FeatureItemProps) => {
  return (
    <View as="li" className="feature-link">
      {isExternal ? (
        <UiLink
          href={href as string}
          isExternal={isExternal}
          className="feature-link-text"
        >
          {linkText}
        </UiLink>
      ) : (
        <Link href={href}>{linkText}</Link>
      )}
      <View>{children}</View>
    </View>
  );
};

export default FeatureItem;
