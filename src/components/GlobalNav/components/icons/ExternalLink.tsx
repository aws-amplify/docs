import { Flex } from '@aws-amplify/ui-react';
import { IconExternalLink } from '@/components/Icons';
import React from 'react';

export function ExternalLink({ children }: { children: React.ReactNode }) {
  return (
    <Flex alignItems="center" gap="xs">
      {children}
      <IconExternalLink fontSize="small" />
    </Flex>
  );
}
