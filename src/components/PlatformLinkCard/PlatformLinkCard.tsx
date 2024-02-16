import { Card, Flex, Text } from '@aws-amplify/ui-react';
import Link from 'next/link';

type PlatformLinkCardProps = {
  url: string;
  title: string;
};

export function PlatformLinkCard({ url, title }: PlatformLinkCardProps) {
  return (
    <Link className="platform-link-card" href={url}>
      <Card className="platform-link-card__card" variation="outlined">
        <Flex direction="column" gap="xs">
          <Text className="platform-link-card__card__title">{title}</Text>
        </Flex>
      </Card>
    </Link>
  );
}
