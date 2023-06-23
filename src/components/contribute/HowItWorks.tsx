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
import { MdOutlineBadge, MdLabelOutline, MdCelebration, MdPageview } from 'react-icons/md';
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
        The steps below outline how to participate. Right now, only accepted PRs
        will be considered.
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
              <FiGithub />
            </Flex>
            <Text>
              Amplify Contributor Program is open to everyone in our Amplify
              community!
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
              <MdLabelOutline />
            </Flex>
            <Text>
              The Amplify team will label issues using{' '}
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
              The pull request must contain commits you made yourself.
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
            <Text>The Amplify team will review the submitted PRs.</Text>
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
            <Text>Pull requests must be approved by the Amplify Team.</Text>
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
              Receive a contributor role in the{' '}
              <Link href="https://discord.com/invite/amplify" isExternal>
                Amplify Community Discord server <FiExternalLink />
              </Link>
              .
            </Text>
          </Flex>
        </Card>
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
              Collect an <Link href="https://aws.amazon.com/blogs/mobile/new-introducing-the-amplify-badge-program/" isExternal>
              Amplify badge <FiExternalLink />
              </Link> for your contribution.  
            </Text>
          </Flex>
        </Card>
      </View>
    </Flex>
  );
}
