import React from 'react';
import { Flex, View, Link } from '@aws-amplify/ui-react';
import { ExternalLinkIcon } from '../Icons';
import styles from './link-card.module.css';

export interface CardData {
  name: string;
}

export interface LinkCardProps {
  isExternal?: boolean;
  href: string;
  imageUrl: string;
  children: React.ReactNode;
}

export const LinkCard: React.FC<LinkCardProps> = ({
  isExternal,
  href,
  imageUrl,
  children
}) => {
  return (
    <Link
      href={href}
      color="#007EB9"
      isExternal={isExternal}
      borderRadius={'large'}
      boxShadow="large"
      padding="1rem"
    >
      <View as="div" ariaLabel="View example" height="7rem" padding="0.5rem">
        {'placeholder for image'}
      </View>
      <Flex justifyContent="space-between">
        {children}
        <div className={styles['external-icon']}>
          <ExternalLinkIcon />
        </div>
      </Flex>
    </Link>
  );
};

export default LinkCard;
