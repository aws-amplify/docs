import {
  Divider,
  Flex,
  Heading,
  Text,
  Badge,
  Card,
  View,
  Link
} from '@aws-amplify/ui-react';
import {
  MdOutlineBadge,
  MdLabelOutline,
  MdCelebration,
  MdPageview
} from 'react-icons/md';
import {
  FiExternalLink,
  FiGithub,
  FiCheck,
  FiGitPullRequest
} from 'react-icons/fi';

export default function HowItWorks() {
  return (
    <Flex
      direction="column"
      maxWidth="1024px"
      margin="0 auto"
      gap="2em"
      width={{ base: '90%', large: '60%' }}
    >
      <View>
        <Badge
          textTransform="uppercase"
          backgroundColor="brand.rind"
          color="brand.squidInk"
          marginBottom="1em"
        >
          Making a Contribution
        </Badge>
        <Heading level={2}>How it works</Heading>
      </View>
      <Text fontSize="large" color="font.secondary">
        The Amplify Contributor Program is open to everyone in the Amplify community! In the following steps, we describe what to expect when contributing:
      </Text>

      <View>
        <Card>
          <Flex direction="row" alignItems="center">
            <Flex
              backgroundColor="brand.rind"
              color="brand.squidInk"
              width="32px"
              height="32px"
              borderRadius="50%"
              justifyContent="center"
              alignItems="center"
            >
              {' '}
              <MdLabelOutline />
            </Flex>
            <Text>
              The Amplify team labels issues using{' '}
              <Badge variation="info">good first issue</Badge> for contributors.
            </Text>
          </Flex>
        </Card>
        <Divider size="small" />
        <Card>
          <Flex direction="row" alignItems="center">
            <Flex
              backgroundColor="brand.rind"
              color="brand.squidInk"
              width="32px"
              height="32px"
              borderRadius="50%"
              justifyContent="center"
              alignItems="center"
            >
              {' '}
              <FiGitPullRequest />
            </Flex>
            <Text>
              You open a pull request that contains commits you made yourself.
            </Text>
          </Flex>
        </Card>
        <Divider size="small" />
        <Card>
          <Flex direction="row" alignItems="center">
            <Flex
              backgroundColor="brand.rind"
              color="brand.squidInk"
              width="32px"
              height="32px"
              borderRadius="50%"
              justifyContent="center"
              alignItems="center"
            >
              {' '}
              <MdPageview />
            </Flex>
            <Text>The Amplify team reviews your pull request.</Text>
          </Flex>
        </Card>
        <Divider size="small" />
        <Card>
          <Flex direction="row" alignItems="center">
            <Flex
              backgroundColor="brand.rind"
              color="brand.squidInk"
              width="32px"
              height="32px"
              borderRadius="50%"
              justifyContent="center"
              alignItems="center"
            >
              {' '}
              <FiCheck />
            </Flex>
            <Text>If everything looks good, the Amplify team approves the pull request. (At this time, only accepted pull requests count toward earning badges.)</Text>
          </Flex>
        </Card>
        <Divider size="small" />
        <Card>
          <Flex direction="row" alignItems="center">
            <Flex
              backgroundColor="brand.rind"
              color="brand.squidInk"
              width="32px"
              height="32px"
              borderRadius="50%"
              justifyContent="center"
              alignItems="center"
            >
              {' '}
              <MdOutlineBadge />
            </Flex>
            <Text>
              If this is your first approved pull request, the Amplify team designates you as a Contributor in the{' '}
              <Link href="https://discord.com/invite/amplify" isExternal>
                Amplify Community Discord server <FiExternalLink />
              </Link>
              .
            </Text>
          </Flex>
        </Card>
        <Divider size="small" />
        <Card>
          <Flex direction="row" alignItems="center">
            <Flex
              backgroundColor="brand.rind"
              color="brand.squidInk"
              width="32px"
              height="32px"
              borderRadius="50%"
              justifyContent="center"
              alignItems="center"
            >
              {' '}
              <MdCelebration />
            </Flex>
            <Text>
              You collect an{' '}
              <Link
                href="https://aws.amazon.com/blogs/mobile/new-introducing-the-amplify-badge-program/"
                isExternal
              >
                Amplify badge <FiExternalLink />
              </Link>{' '}
              for your first contribution or make progress toward the Intermediate and Advanced badges!
            </Text>
          </Flex>
        </Card>
        <Divider size="small" />
      </View>
    </Flex>
  );
}
