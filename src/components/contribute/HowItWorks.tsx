import {
  Divider,
  Flex,
  Heading,
  Text,
  Badge,
  Link
} from '@aws-amplify/ui-react';
import {
  MdOutlineBadge,
  MdLabelOutline,
  MdCelebration,
  MdPageview
} from 'react-icons/md';
import { FiGitPullRequest } from 'react-icons/fi';
import { IconCheck, IconExternalLink } from '@/components/Icons';

export default function HowItWorks() {
  return (
    <Flex direction="column" maxWidth="800px" margin="0 auto" gap="2em">
      <Flex direction="column" alignItems="flex-start" gap="xxxs">
        <Badge textTransform="uppercase">Making a Contribution</Badge>
        <Heading level={2}>How it works</Heading>
      </Flex>
      <Text fontSize="large" color="font.secondary">
        The Amplify Contributor Program is open to everyone in the Amplify
        community! In the following steps, we describe what to expect when
        contributing:
      </Text>

      <Flex direction="column" gap="large">
        <Flex direction="row" alignItems="center">
          <Flex
            backgroundColor="purple.20"
            color="neutral.100"
            width="32px"
            height="32px"
            borderRadius="50%"
            justifyContent="center"
            alignItems="center"
          >
            <MdLabelOutline />
          </Flex>
          <Text>
            The Amplify team labels issues using{' '}
            <Badge variation="info">good first issue</Badge> for contributors.
          </Text>
        </Flex>

        <Divider size="small" />

        <Flex direction="row" alignItems="center">
          <Flex
            backgroundColor="purple.20"
            color="neutral.100"
            width="32px"
            height="32px"
            borderRadius="50%"
            justifyContent="center"
            alignItems="center"
          >
            <FiGitPullRequest />
          </Flex>
          <Text>
            You open a pull request that contains commits you made yourself.
          </Text>
        </Flex>

        <Divider size="small" />

        <Flex direction="row" alignItems="center">
          <Flex
            backgroundColor="purple.20"
            color="neutral.100"
            width="32px"
            height="32px"
            borderRadius="50%"
            justifyContent="center"
            alignItems="center"
          >
            <MdPageview />
          </Flex>
          <Text>The Amplify team reviews your pull request.</Text>
        </Flex>

        <Divider size="small" />

        <Flex direction="row" alignItems="center">
          <Flex
            backgroundColor="purple.20"
            color="neutral.100"
            width="32px"
            height="32px"
            borderRadius="50%"
            justifyContent="center"
            alignItems="center"
            flex="none"
          >
            <IconCheck />
          </Flex>
          <Text>
            If everything looks good, the Amplify team approves the pull
            request. (At this time, only accepted pull requests count toward
            earning badges.)
          </Text>
        </Flex>

        <Divider size="small" />

        <Flex direction="row" alignItems="center">
          <Flex
            backgroundColor="purple.20"
            color="neutral.100"
            width="32px"
            height="32px"
            borderRadius="50%"
            justifyContent="center"
            alignItems="center"
            flex="none"
          >
            <MdOutlineBadge />
          </Flex>
          <Text>
            If this is your first approved pull request, the Amplify team
            designates you as a Contributor in the{' '}
            <Link href="https://discord.com/invite/amplify" isExternal>
              Amplify Community Discord server <IconExternalLink />
            </Link>
            .
          </Text>
        </Flex>

        <Divider size="small" />

        <Flex direction="row" alignItems="center">
          <Flex
            backgroundColor="purple.20"
            color="neutral.100"
            width="32px"
            height="32px"
            borderRadius="50%"
            justifyContent="center"
            alignItems="center"
            flex="none"
          >
            <MdCelebration />
          </Flex>
          <Text>
            You collect an{' '}
            <Link
              href="https://aws.amazon.com/blogs/mobile/new-introducing-the-amplify-badge-program/"
              isExternal
            >
              Amplify badge <IconExternalLink />
            </Link>{' '}
            for your first contribution or make progress toward the Intermediate
            and Advanced badges!
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
