import { PageNode } from '@/directory/directory';
import { Card, Flex, View, Text } from '@aws-amplify/ui-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Platform } from '@/data/platforms';
import { Columns } from '@/components/Columns';

type OverviewProps = {
  childPageNodes: PageNode[];
};

export function Overview({ childPageNodes }: OverviewProps) {
  const router = useRouter();
  const currentPlatform = router.query.platform as Platform;

  if (!childPageNodes) {
    return <></>;
  }

  return (
    <Columns columns={2} size="small" className="overview">
      {childPageNodes
        .filter((node) => {
          if (currentPlatform) {
            return node?.platforms?.includes(currentPlatform);
          } else {
            return true;
          }
        })
        .map((node) => (
          <Link
            key={node.route}
            className="overview__link"
            href={{
              pathname: node.route,
              ...(currentPlatform && { query: { platform: currentPlatform } })
            }}
            target={node.isExternal ? '_blank' : '_self'}
            rel={node.isExternal ? '"noopener noreferrer"' : undefined}
          >
            <Card className="overview__link__card" variation="outlined">
              <Flex direction="column" gap="xs">
                <Text className="overview__link__card__title">
                  {node.title}
                </Text>
                <View className="overview__link__card__description">
                  {node.description}
                </View>
              </Flex>
            </Card>
          </Link>
        ))}
    </Columns>
  );
}
