import { Flex } from '@aws-amplify/ui-react';

export interface BlockProps {
  name: string;
  children: React.ReactNode;
}

export const Block = ({ children }: BlockProps) => {
  return <Flex className="block-switcher__block">{children}</Flex>;
};
