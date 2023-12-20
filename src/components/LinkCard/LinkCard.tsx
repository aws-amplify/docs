import React from 'react';
import { Flex, Link, View } from '@aws-amplify/ui-react';

interface LinkCardProps {
  isExternal: boolean;
  href?: string;
  children: React.ReactNode;
  icon: () => React.ReactNode;
}

const LinkCard: React.FC<LinkCardProps> = ({
  isExternal,
  href,
  children,
  icon
}) => {
  return (
    href && (
      <Link href={href} isExternal={isExternal} className="link-card">
        <Flex direction="column" justifyContent="space-between" height="100%">
          <View>{icon()}</View>
          <View className="link-card-children">{children}</View>
        </Flex>
      </Link>
    )
  );
};

export default LinkCard;
