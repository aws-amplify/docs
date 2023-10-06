import React from 'react';
import { Flex, View, Link, Image } from '@aws-amplify/ui-react';
import { ExternalLinkIcon } from '../Icons';

interface LinkCardProps {
  isExternal: boolean;
  href: string;
  imageUrl?: string;
  imgAltText?: string;
  children: React.ReactNode;
}

const LinkCard: React.FC<LinkCardProps> = ({
  isExternal,
  href,
  imageUrl,
  imgAltText,
  children
}) => {
  return (
    <Link href={href} isExternal={isExternal} className="link-card">
      {/* Todo: remove this added this place holder for testing purpose */}
      <View height="7rem" padding="0.5rem">
        {'placeholder for image'}
      </View>
      {imageUrl && (
        <Image
          alt={imgAltText}
          src={imageUrl}
          objectFit="initial"
          objectPosition="50% 50%"
          height="75%"
          width="75%"
        />
      )}
      <Flex justifyContent="space-between">
        {children}
        {isExternal && <ExternalLinkIcon />}
      </Flex>
    </Link>
  );
};

export default LinkCard;
