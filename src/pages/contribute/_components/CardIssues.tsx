import {
  Flex,
  Card,
  Collection,
  Button,
  Text,
  Link,
  Heading,
  Badge
} from '@aws-amplify/ui-react';
import { FiExternalLink, FiGitPullRequest } from 'react-icons/fi';
import type { PropsWithChildren } from 'react';

export type IssuesProps = PropsWithChildren<{
  title: string;
  issues: any[];
  repo: string;
  description: string;
}>

export default function Issues({ title, issues, repo, description }) {
  return (
    <Flex direction="column" gap="2em">
      <Heading level={3}>
        <FiGitPullRequest /> {title}
      </Heading>
      <Text>{description}</Text>

      <Collection
        items={issues}
        type="list"
        direction="column"
        gap="20px"
        wrap="nowrap"
      >
        {(item, index) => (
          <Card id={`${repo}-${index}`}>
            <Link href={item.html_url}>
              <Text>{item.title}</Text>
            </Link>
            <Badge variation="info">good first issue</Badge>
          </Card>
        )}
      </Collection>
      <Flex justifyContent="center  ">
        <Link href={`https://github.com/aws-amplify/${repo}/issues`} isExternal>
          <Button variation="primary">
            <Text>
              Open a Pull Request <FiExternalLink />
            </Text>
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
}
