import { Heading, Text, Flex, Card } from '@aws-amplify/ui-react';
import { FrameworkGrid } from '@/components/FrameworkGrid';
import {
  GetStartedPopover,
  generateGetStartedLinks
} from '@/components/GetStartedPopover';
import { IconChevron } from '@/components/Icons';
import { DEFAULT_PLATFORM } from '@/data/platforms';
import { InternalLinkButton } from '@/components/InternalLinkButton';
import { FeatureItem, FeatureList } from '@/components/FeatureLists';
import { MDXCode } from '@/components/MDXComponents';
import { Columns } from '@/components/Columns';
import ExportedImage from 'next-image-export-optimizer';
import {
  gen2GetStartedHref,
  gen2HowAmplifyWorksPathname
} from '@/data/index-page-data';

const meta = {
  title: 'Amplify Documentation',
  description:
    'AWS Amplify Docs - Develop and deploy cloud-powered web and mobile apps.',
  url: 'https://docs.amplify.aws/'
};

export function getStaticProps() {
  return {
    props: {
      hasTOC: false,
      showLastUpdatedDate: false,
      pageType: 'home',
      meta,
      useCustomTitle: true
    }
  };
}

export default function Page() {
  return (
    <Flex className="home-content">
      <Flex className="home-intro">
        <Heading level={1} className="home-intro__heading">
          Amplify Documentation
        </Heading>
        <Text className="home-intro__text">
          AWS Amplify is everything frontend developers need to develop and
          deploy cloud-powered fullstack applications without hassle. Easily
          connect your frontend to the cloud for data modeling, authentication,
          storage, serverless functions, SSR app deployment, and more.
        </Text>
        <Flex className="home-cta">
          <GetStartedPopover
            platform={DEFAULT_PLATFORM}
            getStartedLinks={generateGetStartedLinks(gen2GetStartedHref)}
          />
          <InternalLinkButton
            size="large"
            href={{
              pathname: gen2HowAmplifyWorksPathname,
              query: { platform: DEFAULT_PLATFORM }
            }}
          >
            How Amplify Works
            <IconChevron
              aria-hidden="true"
              className="icon-rotate-270"
              fontSize=".875em"
            />
          </InternalLinkButton>
        </Flex>
      </Flex>
      <Flex className="home-section">
        <Heading level={2}>
          Build fullstack apps with your framework of choice
        </Heading>
        <Text>
          You can use AWS Amplify with popular web and mobile frameworks like
          JavaScript, Flutter, Swift, and React. Build, connect, and host
          fullstack apps on AWS. Get started by selecting your preferred
          framework.
        </Text>
        <FrameworkGrid currentKey={DEFAULT_PLATFORM} />
      </Flex>
      <Flex className="home-section">
        <Heading level={2}>Features</Heading>
        <Columns columns={3}>
          <Card variation="outlined">
            <Flex direction="column">
              <Heading level={3} fontSize="medium">
                Code-first DX
              </Heading>
              <Text>
                The fullstack TypeScript developer experience lets you focus on
                your app code instead of infrastructure.
              </Text>
            </Flex>
          </Card>
          <Card variation="outlined">
            <Flex direction="column">
              <Heading level={3} fontSize="medium">
                Fullstack Git deployments
              </Heading>
              <Text>
                Deploy your frontend and backend together on every code commit.
                Your Git branch is the source of truth.
              </Text>
            </Flex>
          </Card>
          <Card variation="outlined">
            <Flex direction="column">
              <Heading level={3} fontSize="medium">
                Faster local development
              </Heading>
              <Text>
                Per-developer cloud sandbox environments let you quickly iterate
                during development.
              </Text>
            </Flex>
          </Card>
        </Columns>
      </Flex>
      <Flex className="home-section">
        <Heading level={2}>Develop</Heading>
        <video
          src="/videos/typed-api.mp4"
          style={{
            width: '100%',
            borderRadius: 'var(--amplify-radii-large)',
            marginBottom: 'var(--amplify-space-small)',
            boxShadow: '0px 0px 20px 5px rgba(0,0,0,0.3)'
          }}
          autoPlay
          muted
          loop
          playsInline={true}
        />

        <Columns columns={2} as="ul">
          <FeatureItem
            linkText="TypeScript-first fullstack experience"
            href={{
              pathname: '/[platform]/how-amplify-works/concepts',
              hash: 'build-fullstack-apps-with-typescript',
              query: {
                platform: DEFAULT_PLATFORM
              }
            }}
          >
            Write TypeScript across your app&pos;s frontend and backend. Get
            schema validation, dot completion, and end-to-end types while you
            code.
          </FeatureItem>
          <FeatureItem
            linkText="Real-time data for modern apps"
            href={{
              pathname: '/[platform]/build-a-backend/data/set-up-data/',
              query: {
                platform: DEFAULT_PLATFORM
              }
            }}
          >
            Sync frontend state to real-time backend updates. Just write
            TypeScript without thinking about WebSockets.
          </FeatureItem>
          <FeatureItem
            linkText="Authn and authz for secure apps"
            href={{
              pathname: '/[platform]/build-a-backend/auth/set-up-auth/',
              query: {
                platform: DEFAULT_PLATFORM
              }
            }}
          >
            Choose the auth strategy (such as passwords, social, email links)
            and control data access based on users and groups.
          </FeatureItem>
          <FeatureItem
            linkText="Auto-generate CRUD forms wired to data"
            href={{
              pathname: '/[platform]/build-ui/',
              query: {
                platform: DEFAULT_PLATFORM
              }
            }}
          >
            Map CRUD forms to your data model with form-level validations and
            error states built in.
          </FeatureItem>
        </Columns>
      </Flex>

      <Columns columns={2}>
        <ExportedImage
          src="/images/gen2/deploy-cycle.png"
          alt="Diagram showing a software development environment setup with two distinct sandbox environments linked to one Git repo which is connected to the Amplify console which has deployed versions of the Dev and Main branches of the application"
          width="450"
          height="412"
          style={{
            margin: 'auto',
            height: 'auto',
            borderRadius: 'var(--amplify-radii-large)',
            boxShadow: '0px 0px 20px 5px rgba(0,0,0,0.3)'
          }}
        />

        <FeatureList heading="Deploy" level={2}>
          <FeatureItem
            linkText="SSR/SSG/ISR hosting support"
            href={{
              pathname: '/[platform]/deploy-and-host/hosting/',
              query: {
                platform: DEFAULT_PLATFORM
              }
            }}
          >
            Deploy Next.js, Nuxt, React, Vue.js, Angular (and more) apps by
            simply connecting your Git repository.
          </FeatureItem>
          <FeatureItem
            linkText="Faster iterations with per-developer sandboxes"
            href={{
              pathname:
                '/[platform]/deploy-and-host/sandbox-environments/setup/',
              query: {
                platform: DEFAULT_PLATFORM
              }
            }}
          >
            Per-developer cloud sandboxes provide high fidelity and faster
            deployment times to make local iteration quick.
          </FeatureItem>
          <FeatureItem
            linkText="Zero-config fullstack branches"
            href={{
              pathname:
                '/[platform]/deploy-and-host/fullstack-branching/branch-deployments/',
              query: {
                platform: DEFAULT_PLATFORM
              }
            }}
          >
            Fullstack deployments from your Git branch. Autodeploy Git branches
            to set up staging, development, and production environments.
          </FeatureItem>
          <FeatureItem
            linkText="GUI to manage your data"
            href={{
              pathname: '/[platform]/how-amplify-works/concepts',
              hash: 'unified-management-console',
              query: {
                platform: DEFAULT_PLATFORM
              }
            }}
          >
            Manage your app data, users and groups, and files in a single
            console.
          </FeatureItem>
        </FeatureList>

        <FeatureList heading="Customize" level={2}>
          <FeatureItem
            linkText="Add any AWS service with CDK"
            href={{
              pathname: '/[platform]/build-a-backend/add-aws-services/',
              query: {
                platform: DEFAULT_PLATFORM
              }
            }}
          >
            Extend or customize with the AWS CDK to access 200+ AWS services.
          </FeatureItem>
          <FeatureItem
            linkText="Bring your own pipelines"
            href={{
              pathname:
                '/[platform]/deploy-and-host/fullstack-branching/custom-pipelines/',
              query: {
                platform: DEFAULT_PLATFORM
              }
            }}
          >
            Use your own pipelines to set up cross-account or multi-region,
            stage-based deployments.
          </FeatureItem>
          <FeatureItem
            linkText="Monorepo and multi-repo support"
            href={{
              pathname:
                '/[platform]/deploy-and-host/fullstack-branching/mono-and-multi-repos/',
              query: {
                platform: DEFAULT_PLATFORM
              }
            }}
          >
            Enable support for all types of fullstack team workflows: monorepos,
            micro frontends, multi-repos, and more.
          </FeatureItem>
        </FeatureList>
        <MDXCode
          title="amplify/backend.ts"
          language="typescript"
          codeString={`import * as sns from 'aws-cdk-lib/aws-sns';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';

const backend = defineBackend({
  auth,
  data
});

const customResourceStack = backend.createStack('MyCustomResources');

new sqs.Queue(customResourceStack, 'CustomQueue');
new sns.Topic(customResourceStack, 'CustomTopic');`}
        ></MDXCode>
      </Columns>
    </Flex>
  );
}
