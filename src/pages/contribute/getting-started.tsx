import { Heading, Text, Badge, Flex, Image, Link } from '@aws-amplify/ui-react';
import {
  IconCheckCircle,
  IconInfo,
  IconExternalLink
} from '@/components/Icons';
import { MDXCode } from '@/components/MDXComponents';

const meta = {
  title: 'Getting started',
  description:
    'Amplify documentation - Learn how to use Amplify to develop and deploy cloud-powered mobile and web apps.'
};

export function getStaticProps() {
  return {
    props: {
      showLastUpdatedDate: false,
      meta
    }
  };
}

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

export default function GettingStarted() {
  return (
    <>
      <Text>
        The steps below will help you get set up to open a pull request in the
        Amplify JS project. Check out the <code>CONTRIBUTING.md</code> in each
        project&apos;s repository for instructions on how to get started with
        local environment set up.
      </Text>
      <Text>
        The Amplify Contributor Program is an open invitation for you to
        participate in the Amplify open source development journey. It is a
        great way to learn more about the Amplify ecosystem and make
        constructive, helpful pull requests. It builds your resume by
        demonstrating that you can collaborate with others on code, and it feels
        good to give back to a project you use! We&apos;re looking forward to
        developing with you!
      </Text>

      <Heading level={2}>Prerequisites</Heading>
      <Flex direction="column" as="ul">
        <Flex as="li" alignItems="center" gap="xs">
          <IconCheckCircle />
          <Text>
            A GitHub account. You can create one{' '}
            <Link isExternal href="https://github.com/join">
              here <IconExternalLink />.
            </Link>
          </Text>
        </Flex>
        <Flex as="li" alignItems="center" gap="xs">
          <IconCheckCircle />
          <Text>IDE (e.g. VS Code)</Text>
        </Flex>
        <Flex as="li" alignItems="center" gap="xs">
          <IconCheckCircle />
          <Text>
            Amplify JS development environment. Follow the steps{' '}
            <Link
              href="https://github.com/aws-amplify/amplify-js/blob/main/CONTRIBUTING.md#setting-up-for-local-development"
              isExternal
            >
              here <IconExternalLink />
            </Link>{' '}
            to get set up.
          </Text>
        </Flex>
        <Flex as="li" alignItems="center" gap="xs">
          <IconCheckCircle />
          <Text>
            Set up the Amplify Docs{' '}
            <Link
              isExternal
              href="https://github.com/aws-amplify/docs#getting-started"
            >
              development environment <IconExternalLink />
            </Link>
            .<Badge marginLeft="8px">Optional</Badge>
          </Text>
        </Flex>
      </Flex>

      <Heading level={2}>Steps to take to make your contribution</Heading>

      <ol>
        <li>
          <Text>
            Start on the{' '}
            <Link
              isExternal
              href="https://github.com/aws-amplify/amplify-js/contribute"
            >
              contributing page <IconExternalLink />
            </Link>{' '}
            of the Amplify JS repo and find the right issue for you.
          </Text>
        </li>
        <li>
          <Text>
            Fork the{' '}
            <Link isExternal href="https://github.com/aws-amplify/amplify-js">
              Amplify JS <IconExternalLink />
            </Link>{' '}
            GitHub project.
          </Text>
        </li>
        <li>
          <Text>
            Open VS Code and clone your fork down to your machine so you can
            begin making changes.{' '}
          </Text>

          <Image
            marginBlock="medium"
            objectFit="cover"
            width="100%"
            height="100%"
            src="/images/contribute/open-vs-code.png"
            alt="VS Code"
          />
        </li>
        <li>
          <Text>
            Run <code>git status</code> before you start coding to make sure
            everything in the project files are updated with the{' '}
            <code>origin/main</code> branch.
          </Text>
          <MDXCode language="bash" codeString={_4a}></MDXCode>
        </li>
        <li>
          <Text>
            Use one of the commands below to create a new branch within your
            fork.
          </Text>
          <MDXCode language="bash" codeString={_5a}></MDXCode>

          <Flex direction="column">
            <Flex alignItems="center" gap="xs">
              <IconInfo />
              <Text>
                Use the <code>group-token</code> to indicate the category you
                are working on. e.g. <code>amplify-datastore</code>.
              </Text>
            </Flex>
            <Flex alignItems="center" gap="xs">
              <IconInfo />
              <Text>
                The <code>short-token</code> can be one of the following:{' '}
                <code>feat</code>, <code>chore</code>, or <code>bug</code>.
              </Text>
            </Flex>
            <Flex alignItems="center" gap="xs">
              <IconInfo />
              <Text>
                The <code>branch-name</code> should be representative of the
                feature or fix.
              </Text>
            </Flex>
          </Flex>
        </li>
        <li>
          Make your contribution and then run <code>git add</code>,{' '}
          <code>git commit</code> and <code>push</code> your branch.
          <MDXCode language="bash" codeString={_6a}></MDXCode>
          <Text>
            GitHub will process the push command and display a link to create a
            pull request.
          </Text>
          <MDXCode language="bash" codeString={_6b}></MDXCode>
        </li>
        <li>
          <Text>
            Click on the link to create a new pull request using the Amplify JS
            PR template.
          </Text>

          <Image
            width="100%"
            height="100%"
            marginBlock="medium"
            src="/images/contribute/open-pr.png"
            alt="Open GitHub PR"
          />
        </li>
      </ol>
      <Text>That&apos;s it!</Text>
      <Text>
        The Amplify team will review your PR and provide feedback if needed. The
        review process might require API design & security reviews. For such
        cases it might take up to 4 weeks to complete the review. Make sure to
        address any automated check that fail (such as linting, unit tests, etc.
        in the CI pipeline). Finally, once your changes meet the requirements
        and checks, the team will merge your changes into the Amplify JS repo.
      </Text>

      <Text>
        Well done and congrats! We&apos;re very excited about your contribution!
      </Text>

      <Heading level={2}>Resources</Heading>
      <Text>
        We&apos;ve put together a few resources that can help you create quality
        PRs.
      </Text>
      <Flex direction="column">
        <Heading level={4}>
          <Link
            href="https://github.com/aws-amplify/amplify-js/blob/main/CONTRIBUTING.md#contributing-guidelines"
            isExternal
          >
            Amplify JS Contributing Guidelines <IconExternalLink />
          </Link>
        </Heading>
        <Text>
          Please read through these guidelines carefully before submitting a PR.
        </Text>

        <Heading level={4}>
          <Link href="/">Amplify Documentation</Link>
        </Heading>
        <Text>Learn more about the AWS Amplify JS library.</Text>

        <Heading level={4}>
          <Link href="https://discord.com/invite/amplify" isExternal>
            Amplify Community Discord server <IconExternalLink />
          </Link>
        </Heading>
        <Text>
          This is a great place to meet other developers using Amplify, ask
          questions, and share what you&apos;re building with Amplify.
        </Text>

        <Heading level={4}>
          <Link href="https://discord.gg/kfWYHw73eA" isExternal>
            The #contribute-to-javascript Discord channel <IconExternalLink />
          </Link>
        </Heading>
        <Text>
          Meet other contributors and ask questions related to contributing to
          Amplify JS.
        </Text>
        <Heading level={4}>
          <Link href="https://discord.com/invite/amplify" isExternal>
            Amplify Discord Office Hours <IconExternalLink />
          </Link>
        </Heading>

        <Text>
          Join the weekly office hour in the Discord Voice channel where you can
          ask questions, share what you&apos;re working on and get feedback.
        </Text>
      </Flex>
    </>
  );
}
