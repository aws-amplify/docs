import { PageNode } from '@/directory/directory';
import { Card, Flex, View, Text, Badge } from '@aws-amplify/ui-react';
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

  const nodes = childPageNodes.filter((node) => {
    const { platforms } = node;
    if (currentPlatform) {
      return platforms?.includes(currentPlatform);
    } else {
      return true;
    }
  });

  const featuredNodes = nodes.filter((node) => node.featured);
  const notFeaturedNodes = nodes.filter((node) => !node.featured);
  console.log(featuredNodes.length > 0);
  return (
    <Flex direction="column" gap="xl">
      {featuredNodes?.length > 0 ? (
        <Flex direction="column" className="overview">
          {featuredNodes.map((node) => (
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
                className="overview__link__card overview__link__card--featured"
                variation="outlined"
              >
                <Flex className="overview__featured-container">
                  <Flex className="overview__featured-container__heading">
                    <Badge size="small" className="overview-badge">
                      Featured
                    </Badge>
                  </Flex>
                  <Flex direction="column" gap="xs" alignItems="flex-start">
                    <Text fontSize="xl" className="overview__link__card__title">
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
        {notFeaturedNodes.map((node) => (
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
