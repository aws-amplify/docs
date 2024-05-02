import { Heading, Text, Flex, Card } from '@aws-amplify/ui-react';
import ExportedImage from 'next-image-export-optimizer';
import { MDXCode } from '@/components/MDXComponents/';
import { IconChevron } from '@/components/Icons';
import { Columns } from '@/components/Columns';
import { FeatureList, FeatureItem } from '@/components/FeatureLists';
import { getCustomStaticPath } from '@/utils/getCustomStaticPath';
import { useCurrentPlatform } from '@/utils/useCurrentPlatform';
import { InternalLinkButton } from '@/components/InternalLinkButton';
import {
  GetStartedPopover,
  generateGetStartedLinks
} from '@/components/GetStartedPopover';
import { FrameworkGrid } from '@/components/FrameworkGrid';
import { PLATFORM_DISPLAY_NAMES } from '@/data/platforms';
import {
  gen2GetStartedHref,
  gen2HowAmplifyWorksPathname
} from '@/data/index-page-data';
export const meta = {
  title: 'Amplify Docs (Gen 2)',
  description:
    'Build apps with the Amplify code-first developer experience (Gen 2) using TypeScript-based development.',
  platforms: [
    'android',
    'angular',
    'flutter',
    'javascript',
    'nextjs',
    'react',
    'react-native',
    'swift',
    'vue'
  ]
};

export const getStaticPaths = async () => {
  return getCustomStaticPath(meta.platforms);
};

export function getStaticProps() {
  return {
    props: {
      hasTOC: false,
      showLastUpdatedDate: false,
      pageType: 'home',
      meta,
      showBreadcrumbs: false,
      useCustomTitle: true
    }
  };
}

const Gen2Overview = () => {
  const currentPlatform = useCurrentPlatform();
  const mobilePlatform = ['swift', 'android', 'flutter'].includes(
    currentPlatform
  );

  return (
    <Flex className="home-content">
      <Flex className="home-intro">
        <Heading level={1} className="home-intro__heading">
          Amplify Documentation for {PLATFORM_DISPLAY_NAMES[currentPlatform]}
        </Heading>
        <Text className="home-intro__text">
          AWS Amplify streamlines full-stack app development. With its
          libraries, CLI, and services, you can easily connect your frontend to
          the cloud for authentication, storage, APIs, and more.
        </Text>
        <Flex className="home-cta">
          <GetStartedPopover
            platform={currentPlatform}
            getStartedLinks={generateGetStartedLinks(gen2GetStartedHref)}
          />
          <InternalLinkButton
            size="large"
            href={{
              pathname: gen2HowAmplifyWorksPathname,
              query: { platform: currentPlatform }
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
          AWS Amplify provides libraries for popular web and mobile frameworks,
          like JavaScript, Flutter, Swift, and React. Our guides, APIs, and
          other resources will help you build, connect, and host fullstack apps
          on AWS. Get started by selecting your preferred framework.
        </Text>
        <FrameworkGrid currentKey={currentPlatform} />
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
                The code-first developer experience is a new approach that lets
                you focus on your app code instead of infrastructure.
              </Text>
            </Flex>
          </Card>
          <Card variation="outlined">
            <Flex direction="column">
              <Heading level={3} fontSize="medium">
                Fullstack Git deployments
              </Heading>
              <Text>
                Fullstack deployments from your Git branch. Deploy your frontend
                and backend together on every code commit.
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
                platform: currentPlatform
              }
            }}
          >
            Write TypeScript across frontend and backend. Get schema validation,
            dot completion, and end-to-end types while you code.
          </FeatureItem>
          <FeatureItem
            linkText="Real-time data for modern apps"
            href={{
              pathname: '/[platform]/build-a-backend/data/set-up-data/',
              query: {
                platform: currentPlatform
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
                platform: currentPlatform
              }
            }}
          >
            Choose the auth strategy (such as passwords, social, email links)
            and control data access based on users and groups.
          </FeatureItem>
          {!mobilePlatform && (
            <FeatureItem
              linkText="Auto-generate CRUD forms wired to data"
              href={{
                pathname: '/[platform]/build-ui/',
                query: {
                  platform: currentPlatform
                }
              }}
            >
              Map CRUD forms to your data model with form-level validations and
              error states built in.
            </FeatureItem>
          )}
        </Columns>
      </Flex>

      <Columns columns={2}>
        <ExportedImage
          src="/images/gen2/deploy-cycle.png"
          alt="Flowchart describing..."
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
          {!mobilePlatform && (
            <FeatureItem
              linkText="SSR/SSG/ISR hosting support"
              href={{
                pathname: '/[platform]/deploy-and-host/hosting/',
                query: {
                  platform: currentPlatform
                }
              }}
            >
              Deploy apps in Next.js, Nuxt.js, Gatsby, React, Vue, Angular (and
              more) by simply connecting your Git repository.
            </FeatureItem>
          )}
          <FeatureItem
            linkText="Faster iterations with per-developer sandboxes"
            href={{
              pathname:
                '/[platform]/deploy-and-host/sandbox-environments/setup/',
              query: {
                platform: currentPlatform
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
                platform: currentPlatform
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
                platform: currentPlatform
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
                platform: currentPlatform
              }
            }}
          >
            Extend or customize with AWS CDK to access 200+ AWS services.
          </FeatureItem>
          <FeatureItem
            linkText="Bring your own pipelines"
            href={{
              pathname:
                '/[platform]/deploy-and-host/fullstack-branching/custom-pipelines/',
              query: {
                platform: currentPlatform
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
                platform: currentPlatform
              }
            }}
          >
            Enable support for all types of fullstack team workflows—monorepos,
            micro frontends, multi-repos, and more.
          </FeatureItem>
        </FeatureList>
        <MDXCode
          title="amplify/backend.ts"
          language="typescript"
          codeString={`import * as sns from 'aws-cdk-lib/aws-sns';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource.js';
import { data } from './data/resource.js';

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
};

export default Gen2Overview;
