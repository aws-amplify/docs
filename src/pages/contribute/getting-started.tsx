import {
  Badge,
  Heading,
  Text,
  Link,
  Image,
  View,
  Flex,
  Icon
} from '@aws-amplify/ui-react';
import { FiExternalLink } from 'react-icons/fi';
import { MdCheckCircle, MdOutlineInfo } from 'react-icons/md';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import Layout from '../../components/contribute/Layout';

const _4a = `
git status 

On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
`.trim();

const _6a = `
git add .
git commit -m "A commit message"
git push -u origin <branch-name> 
`.trim();

const _6b = `
Enumerating objects: 5, done.
Counting objects: 100% (5/5), done.
Delta compression using up to 8 threads
Compressing objects: 100% (3/3), done.
Writing objects: 100% (3/3), 323 bytes | 323.00 KiB/s, done.
Total 3 (delta 2), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (2/2), completed with 2 local objects.
remote: 
remote: Create a pull request for <branch-name> on GitHub by visiting:
remote:      https://github.com/offlineprogrammer/amplify-js/pull/new/feat/<branch-name>
remote: 
To https://github.com/offlineprogrammer/amplify-js.git
 * [new branch]          feat/my-amazing-branche -> feat/<branch-name>
Branch 'feat/<branch-name>' set up to track remote branch 'feat/<branch-name>' from 'origin'.
`.trim();

const _5a = `
git checkout -b "<group-token>/<short-token>/<branch-name>" 
# or
git checkout -b "<short-token>/<branch-name>"
`.trim();

const Code = ({ children, color }) => {
  return (
    <Text
      className="code-snippet"
      backgroundColor={color ? color : 'brand.stone'}
    >
      {children}
    </Text>
  );
};

export default function ContributeGettingStartedPage() {
  const meta = {
    title: 'AWS Amplify Contributor Program - Getting Started',
    description:
      'The steps below will help you get set up to open a pull request in the Amplify JS project. The Amplify Contributor Program is an open invitation for you to participate in the Amplify open source development journey.'
  };
  return (
    <Layout meta={meta}>
      <View
        width="100%"
        backgroundColor="brand.paper"
        marginTop="5em"
        marginBottom="10em"
      >
        <Flex
          direction="column"
          gap="5rem"
          maxWidth="768px"
          width={{ base: '90%', large: '100%' }}
          margin="0 auto"
        >
          <Flex direction="column">
            <Heading level={1}>Getting Started</Heading>
            <Text fontSize={'large'} color="brand.squidInk">
              The steps below will help you get set up to open a pull request in
              the Amplify JS project. Check out the <Code>CONTRIBUTING.md</Code>{' '}
              in each project's repository for instructions on how to get
              started with local environment set up.
            </Text>
            <Text fontSize={'large'} color="brand.darkSquidInk">
              The Amplify Contributor Program is an open invitation for you to
              participate in the Amplify open source development journey. It is
              a great way to learn more about the Amplify ecosystem and make
              constructive, helpful pull requests. It builds your resume by
              demonstrating that you can collaborate with others on code, and it
              feels good to give back to a project you use! We're looking
              forward to developing with you!
            </Text>
          </Flex>
          <Flex direction="column">
            <Heading level={2}>Prerequisites</Heading>
            <Flex direction="column">
              <Text fontSize={'large'}>
                <Icon
                  as={MdCheckCircle}
                  color="brand.smile"
                  marginRight="8px"
                />
                A GitHub account. You can create one{' '}
                <Link
                  color="brand.smile"
                  isExternal
                  href="https://github.com/join"
                >
                  here <FiExternalLink />.
                </Link>
              </Text>
              <Text fontSize={'large'}>
                <Icon
                  as={MdCheckCircle}
                  color="brand.smile"
                  marginRight="8px"
                />
                IDE (e.g. VS Code)
              </Text>
              <Text fontSize={'large'}>
                <Icon
                  as={MdCheckCircle}
                  color="brand.smile"
                  marginRight="8px"
                />
                Amplify JS development environment. Follow the steps{' '}
                <Link
                  color="brand.smile"
                  href="https://github.com/aws-amplify/amplify-js/blob/main/CONTRIBUTING.md#setting-up-for-local-development"
                  isExternal
                >
                  here
                  <FiExternalLink />
                </Link>{' '}
                to get set up.
              </Text>
              <Text fontSize={'large'}>
                <Icon
                  as={MdCheckCircle}
                  color="brand.smile"
                  marginRight="8px"
                />
                Set up the Amplify Docs{' '}
                <Link
                  color="brand.smile"
                  isExternal
                  href="https://github.com/aws-amplify/docs#getting-started"
                >
                  development environment <FiExternalLink />
                </Link>
                .<Badge marginLeft="8px">Optional</Badge>
              </Text>
            </Flex>
          </Flex>
          <Flex direction="column">
            <Heading level={2}>Steps to take to make your contribution</Heading>
            <Flex direction="column" gap="1em">
              <ol>
                <li>
                  <Text fontSize={'large'}>
                    Start on the{' '}
                    <Link
                      color="brand.smile"
                      isExternal
                      href="https://github.com/aws-amplify/amplify-js/contribute"
                    >
                      contributing page <FiExternalLink />
                    </Link>{' '}
                    of the Amplify JS repo and find the right issue for you.
                  </Text>
                </li>
                <li>
                  <Text fontSize="large">
                    Fork the{' '}
                    <Link
                      color="brand.smile"
                      isExternal
                      href="https://github.com/aws-amplify/amplify-js"
                    >
                      Amplify JS <FiExternalLink />
                    </Link>{' '}
                    GitHub project.
                  </Text>
                </li>
                <li>
                  <Text fontSize={'large'}>
                    Open VS Code and clone your fork down to your machine so you
                    can begin making changes.{' '}
                  </Text>
                  <Flex
                    borderRadius="medium"
                    boxShadow="large"
                    width="100%"
                    overflow="hidden"
                    marginTop="1em"
                  >
                    <Image
                      objectFit="cover"
                      align="center"
                      w="100%"
                      h="100%"
                      src="/images/contribute/open-vs-code.png"
                      alt="VS Code"
                    />
                  </Flex>
                </li>
                <li>
                  <Text fontSize={'large'}>
                    Run <Code>git status</Code> before you start coding to make
                    sure everything in the project files are updated with the{' '}
                    <Code>origin/main</Code> branch.
                  </Text>
                  <SyntaxHighlighter language="bash">{_4a}</SyntaxHighlighter>
                </li>
                <li>
                  <Text fontSize={'large'}>
                    Use one of the commands below to create a new branch within
                    your fork.
                  </Text>
                  <SyntaxHighlighter language="bash">{_5a}</SyntaxHighlighter>
                  <Flex direction="column" margin="1em 1em">
                    <Text fontSize={'large'}>
                      <Icon color="brand.sky" width="25px" height="25px">
                        <MdOutlineInfo />{' '}
                      </Icon>
                      Use the <Code color="brand.rind">group-token</Code> to
                      indicate the category you are working on. e.g.{' '}
                      <Code>amplify-datastore</Code>.
                    </Text>
                    <Text fontSize={'large'}>
                      <Icon color="brand.sky" width="25px" height="25px">
                        <MdOutlineInfo />{' '}
                      </Icon>
                      The <Code color="brand.rind">short-token</Code> can be one
                      of the following: <Code>feat</Code>, <Code>chore</Code>,
                      or <Code>bug</Code>.
                    </Text>
                    <Text fontSize={'large'}>
                      <Icon color="brand.sky" width="25px" height="25px">
                        <MdOutlineInfo />{' '}
                      </Icon>
                      The <Code color="brand.rind">branch-name</Code> should be
                      representative of the feature or fix.
                    </Text>
                  </Flex>
                </li>
                <li>
                  Make your contribution and then run <Code>git add</Code>,{' '}
                  <Code>git commit</Code> and <Code>push</Code> your branch.
                  <br />
                  <SyntaxHighlighter language="bash">{_6a}</SyntaxHighlighter>
                  <br />
                  <Text fontSize={'large'}>
                    GitHub will process the push command and display a link to
                    create a pull request.
                  </Text>
                  <SyntaxHighlighter language="bash">{_6b}</SyntaxHighlighter>
                </li>
                <li>
                  <Text fontSize={'large'}>
                    Click on the link to create a new pull request using the
                    Amplify JS PR template.
                  </Text>
                  <Flex
                    borderRadius="medium"
                    boxShadow="large"
                    width="100%"
                    overflow="hidden"
                  >
                    <Image
                      fit={'cover'}
                      align={'center'}
                      w={'100%'}
                      h={'100%'}
                      src="/images/contribute/open-pr.png"
                      alt="Open GitHub PR"
                    />
                  </Flex>
                </li>
              </ol>
              <Text fontSize={'large'}>That's it!</Text>
              <Text fontSize={'large'}>
                The Amplify team will review your PR and provide feedback if
                needed. The review process might require API design & security
                reviews. For such cases it might take up to 4 weeks to complete
                the review. Make sure to address any automated check that fail
                (such as linting, unit tests, etc. in the CI pipeline). Finally,
                once your changes meet the requirements and checks, the team
                will merge your changes into the Amplify JS repo.
              </Text>

              <Text fontSize={'large'}>
                Well done and congrats! We're very excited about your
                contribution!
              </Text>
            </Flex>
          </Flex>
          <Flex direction="column">
            <Heading level={2}>Resources</Heading>
            <Text fontSize={'large'}>
              We've put together a few resources that can help you create
              quality PRs.
            </Text>
            <Flex direction="column">
              <Heading level={4}>
                <Link
                  color="brand.smile"
                  href="https://github.com/aws-amplify/amplify-js/blob/main/CONTRIBUTING.md#contributing-guidelines"
                >
                  Amplify JS Contributing Guidelines
                  <FiExternalLink />
                </Link>
              </Heading>
              <Text fontSize={'large'}>
                Please read through these guidelines carefully before submitting
                a PR.
              </Text>

              <Heading level={4}>
                <Link
                  color="brand.smile"
                  href="https://docs.amplify.aws/lib/q/platform/js/"
                >
                  Amplify Documentation
                  <FiExternalLink />
                </Link>
              </Heading>
              <Text fontSize={'large'}>
                Learn more about AWS Amplify the the JS library.
              </Text>

              <Heading level={4}>
                <Link
                  color="brand.smile"
                  href="https://discord.com/invite/amplify"
                >
                  Amplify Community Discord server
                  <FiExternalLink />
                </Link>
              </Heading>
              <Text fontSize={'large'}>
                This is a great place to meet other developers using Amplify,
                ask questions, and share what you're building with Amplify.
              </Text>

              <Heading level={4}>
                <Link color="brand.smile" href="https://discord.gg/kfWYHw73eA">
                  The <Code>contribute-to-javascript</Code> Discord channel
                  <FiExternalLink />
                </Link>
              </Heading>
              <Text fontSize={'large'}>
                Meet other contributors and ask questions related to
                contributing to Amplify JS.
              </Text>
              <Heading level={4}>
                <Link
                  color="brand.smile"
                  href="https://discord.com/invite/amplify"
                >
                  Amplify Discord Office Hours
                  <FiExternalLink />
                </Link>
              </Heading>

              <Text fontSize={'large'}>
                Join the weekly office hour in the Discord Voice channel where
                you can ask questions, share what you're working on and get
                feedback.
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </View>
    </Layout>
  );
}
