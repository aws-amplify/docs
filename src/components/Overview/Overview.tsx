import { ReactElement } from 'react';
import { PageNode } from 'src/directory/directory';
import { Card, Flex, Grid, View, Heading } from '@aws-amplify/ui-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

type OverviewProps = {
  childPageNodes: PageNode[];
};

export function Overview({ childPageNodes }: OverviewProps) {
  const router = useRouter();
  const currentPlatform = router.query.platform;

  if (!childPageNodes) {
    return <></>;
  }

  return (
    <Grid className="overview">
      {childPageNodes.map((node) => (
        <Link
          key={node.route}
          className="overview__link"
          href={{
            pathname: node.route,
            query: { platform: currentPlatform ? currentPlatform : '' }
          }}
        >
          <Card className="overview__link__card" variation="outlined">
            <Flex direction="column">
              <Heading level={3} className="overview__link__card__title">
                {node.title}
              </Heading>
              <View className="overview__link__card__description">
                {node.description}
              </View>
            </Flex>
          </Card>
        </Link>
      ))}
    </Grid>
  );
}
