import {
  Flex,
  Collection,
  Divider,
  Button,
  Text,
  Link,
  Heading,
  Badge,
  View
} from '@aws-amplify/ui-react';
import { FiExternalLink, FiGitPullRequest } from 'react-icons/fi';
import { VscIssues } from 'react-icons/vsc';
import { PropsWithChildren } from 'react';

export type IssuesProps = PropsWithChildren<{
  title: string;
  issues: any[];
  repo: string;
  description: string;
}>;

export default function Issues({ title, issues, repo, description }) {
  return (
    <Flex direction="column" gap="2em">
      <Flex>
        <Heading level={3}>
          {' '}
          <FiGitPullRequest /> {title}
        </Heading>
      </Flex>

      <Text fontSize="1.25em">{description}</Text>

      <Collection
        items={issues}
        type="list"
        direction="column"
        // gap="20px"
        wrap="nowrap"
      >
        {(item, index) => (
          <View id={`${repo}-${index}`}>
            <Link href={item.html_url} isExternal={true}>
              <Flex alignItems="center" alignContent="center">
                <Text as="span" fontSize="24px">
                  <VscIssues />
                </Text>
                <Text>{item.title}</Text>
              </Flex>
              <Badge marginLeft={'2rem'} size="small" variation="info">
                good first issue
              </Badge>
            </Link>
            <Divider padding="xs" size="small" />
          </View>
        )}
      </Collection>
      <Flex justifyContent="center  ">
        <Link
          href={`https://github.com/aws-amplify/${repo}/issues`}
          isExternal={true}
        >
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
