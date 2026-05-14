import React from 'react';
import { Flex, Link, View } from '@aws-amplify/ui-react';

interface LinkCardProps {
  isExternal: boolean;
  href?: string;
  children: React.ReactNode;
  icon: () => React.ReactNode;
  /**
   * @default "noopener noreferrer"
   */
  rel?: string;
}

const LinkCard: React.FC<LinkCardProps> = ({
  isExternal,
  href,
  children,
  icon,
  rel
}) => {
  return (
    href && (
      <Link
        href={href}
        isExternal={isExternal}
        rel={rel || 'noopener noreferrer'}
        className="link-card"
        aria-label={children + ' (opens in new tab)'}
      >
        <Flex direction="column" justifyContent="space-between" height="100%">
          <View>{icon()}</View>
          <View className="link-card-children">{children}</View>
        </Flex>
      </Link>
    )
  );
};

export default LinkCard;
