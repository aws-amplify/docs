import { PageNode } from '@/directory/directory';
import { Card, Flex, View, Text, Badge } from '@aws-amplify/ui-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Platform } from '@/data/platforms';
import { Columns } from '@/components/Columns';
import { IconPushPin } from '@/components/Icons';

type OverviewProps = {
  childPageNodes: PageNode[];
};

export function Overview({ childPageNodes }: OverviewProps) {
  const router = useRouter();
  const currentPlatform = router.query.platform as Platform;

  if (!childPageNodes) {
    return <></>;
  }

  const nodes = childPageNodes.filter((node) => {
    const { platforms } = node;
    if (currentPlatform) {
      return platforms?.includes(currentPlatform);
    } else {
      return true;
    }
  });
  console.log('nodes: ', nodes);
  const pinnedNodes = nodes.filter((node) => node.pinned);
  const notPinnedNodes = nodes.filter((node) => !node.pinned);
  console.log(pinnedNodes.length > 0);
  return (
    <Flex direction="column" gap="xl">
      {pinnedNodes?.length > 0 ? (
        <Flex direction="column" className="overview">
          {pinnedNodes.map((node) => (
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
              <Card
                className="overview__link__card overview__link__card--pinned"
                variation="outlined"
              >
                {/* overlap version */}
                <Badge className="overview-badge" fontSize="small">
                  <Flex gap="xxs" as="span">
                    <IconPushPin /> Pinned
                  </Flex>
                </Badge>
                {/* /overlap version */}
                <Flex className="overview__pinned-container">
                  <Flex direction="column" gap="xs" alignItems="flex-start">
                    {/* <Badge
                      size="small"
                      className="overview-badge"
                      marginInlineEnd="small"
                    >
                      <Flex gap="xxs">
                        <IconPushPin /> Pinned
                      </Flex>
                    </Badge> */}

                    <Text
                      fontSize="xl"
                      as="span"
                      className="overview__link__card__title"
                    >
                      {node.title}
                    </Text>

                    <View className="overview__link__card__description">
                      {node.description}
                    </View>
                  </Flex>
                </Flex>
              </Card>
            </Link>
          ))}
        </Flex>
      ) : null}
      <Columns columns={2} size="small" className="overview">
        {notPinnedNodes.map((node) => (
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
    </Flex>
  );
}
