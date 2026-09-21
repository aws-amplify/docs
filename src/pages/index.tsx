import { Heading, Text, Flex, View, Card } from '@aws-amplify/ui-react';
import { FrameworkGrid } from '@/components/FrameworkGrid';
import {
  GetStartedPopover,
  generateGetStartedLinks
} from '@/components/GetStartedPopover';
import { Video } from '@/components/Video';
import { DEFAULT_PLATFORM } from '@/data/platforms';
import { FeatureItem, FeatureList } from '@/components/FeatureLists';
import { MDXCode } from '@/components/MDXComponents';
import { Columns } from '@/components/Columns';
import Link from 'next/link';
import {
  gen2GetStartedHref,
  gen2HowAmplifyWorksPathname
} from '@/data/index-page-data';
import { InternalLinkButton } from '@/components/InternalLinkButton';
import { IconChevron } from '@/components/Icons';

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
          AWS Amplify is everything you need to build web and mobile apps. Easy
          to start, easy to scale.
          <br></br>
          <br></br>
          You can build a fullstack app using Amplify backend building
          capabilities and deploy your web app with managed hosting or to your
          own AWS account.
        </Text>
        <Flex className="home-cta">
          <GetStartedPopover
            platform={DEFAULT_PLATFORM}
            getStartedLinks={generateGetStartedLinks(gen2GetStartedHref)}
          />
          <InternalLinkButton
            size="large"
            href={{
              pathname: '/[platform]/deploy-and-host/',
              query: { platform: DEFAULT_PLATFORM }
            }}
          >
            Deploy your app
            <IconChevron
              aria-hidden="true"
              className="icon-rotate-270"
              fontSize=".875em"
            />
          </InternalLinkButton>
        </Flex>
        <Link
          href={{
            pathname: gen2HowAmplifyWorksPathname,
            query: { platform: DEFAULT_PLATFORM }
          }}
        >
          How Amplify works &gt;
        </Link>
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
        <Video src="/videos/typed-api.mp4" description="Video - Develop" />

        <Columns columns={2} as="ul">
          <FeatureItem
            linkText="TypeScript-first fullstack experience"
            href={{
              pathname: '/[platform]/how-amplify-works/concepts',
              hash: 'build-fullstack-apps-with-typescript',
              query: { platform: DEFAULT_PLATFORM }
            }}
          >
            Write TypeScript across your app&#39;s frontend and backend. Get
            schema validation, dot completion, and end-to-end types while you
            code.
          </FeatureItem>
          <FeatureItem
            linkText="Real-time data for modern apps"
            href={{
              pathname: '/[platform]/build-a-backend/data/set-up-data/',
              query: { platform: DEFAULT_PLATFORM }
            }}
          >
            Sync frontend state to real-time backend updates. Just write
            TypeScript without thinking about WebSockets.
          </FeatureItem>
          <FeatureItem
            linkText="Authn and authz for secure apps"
            href={{
              pathname: '/[platform]/build-a-backend/auth/set-up-auth/',
              query: { platform: DEFAULT_PLATFORM }
            }}
          >
            Choose the auth strategy (such as passwords, social, email links)
            and control data access based on users and groups.
          </FeatureItem>
          <FeatureItem
            linkText="Auto-generate CRUD forms wired to data"
            href={{
              pathname: '/[platform]/build-ui/',
              query: { platform: DEFAULT_PLATFORM }
            }}
          >
            Map CRUD forms to your data model with form-level validations and
            error states built in.
          </FeatureItem>
        </Columns>
      </Flex>

      <Flex className="home-section">
        <Heading level={2}>Deploy</Heading>
        <Columns columns={2}>
          <Flex direction="column" gap="1rem">
            <Heading level={3}>Amplify Hosting</Heading>
            <Text>
              Connect your Git repository. Your app builds and deploys on every
              push with SSR, SSG, and ISR support.
            </Text>
            <img
              src="/images/gen2/deploy-cycle.svg"
              alt="Diagram showing sandbox environments connected to a Git repo, with Amplify Hosting deploying branch environments"
              width="450"
              height="340"
              style={{
                margin: 'auto',
                height: 'auto',
                borderRadius: 'var(--amplify-radii-large)',
                boxShadow: '0px 0px 20px 5px rgba(0,0,0,0.3)'
              }}
            />
            <View as="ul" className="category-list-children">
              <FeatureItem
                linkText="Per-developer sandboxes"
                href={{
                  pathname:
                    '/[platform]/deploy-and-host/sandbox-environments/setup/',
                  query: { platform: DEFAULT_PLATFORM }
                }}
              >
                Per-developer cloud sandboxes provide high fidelity and faster
                deployment times to make local iteration quick.
              </FeatureItem>
              <FeatureItem
                linkText="Zero-config fullstack branches"
                href={{
                  pathname:
                    '/[platform]/deploy-and-host/amplify-hosting/branch-deployments/',
                  query: { platform: DEFAULT_PLATFORM }
                }}
              >
                Fullstack deployments from your Git branch. Autodeploy Git
                branches to set up staging, development, and production
                environments.
              </FeatureItem>
              <FeatureItem
                linkText="GUI to manage your app"
                href={{
                  pathname: '/[platform]/how-amplify-works/concepts',
                  hash: 'unified-management-console',
                  query: { platform: DEFAULT_PLATFORM }
                }}
              >
                Manage your app data, users and groups, and files in a single
                console.
              </FeatureItem>
            </View>
            <Link
              href={{
                pathname: '/[platform]/deploy-and-host/amplify-hosting/',
                query: { platform: DEFAULT_PLATFORM }
              }}
            >
              Learn more about Amplify Hosting &gt;
            </Link>
          </Flex>

          <Flex direction="column" gap="1rem">
            {/* PREVIEW-LABEL-START */}
            <Heading level={3}>Self-managed hosting (Preview)</Heading>
            {/* PREVIEW-LABEL-END */}
            <Text>
              Deploy to your AWS account with full AWS CDK control over
              Amazon CloudFront, Amazon S3, and AWS Lambda.
            </Text>
            <img
              src="/images/gen2/deploy-cycle-self-hosted.svg"
              alt="Diagram showing sandbox environments connected to a Git repo, with self-managed deployment via ampx deploy or definePipeline to your AWS account"
              width="450"
              height="340"
              style={{
                margin: 'auto',
                height: 'auto',
                borderRadius: 'var(--amplify-radii-large)',
                boxShadow: '0px 0px 20px 5px rgba(0,0,0,0.3)'
              }}
            />
            <View as="ul" className="category-list-children">
              <FeatureItem
                linkText="Full AWS CDK escape hatches"
                href={{
                  pathname: '/[platform]/deploy-and-host/self-hosting/',
                  query: { platform: DEFAULT_PLATFORM }
                }}
              >
                Customize every resource with AWS CDK escape hatches. Go beyond
                the defaults and configure any AWS service directly.
              </FeatureItem>
              <FeatureItem
                linkText="Your own CI/CD or definePipeline"
                href={{
                  pathname: '/[platform]/deploy-and-host/self-hosting/',
                  query: { platform: DEFAULT_PLATFORM }
                }}
              >
                Use GitHub Actions, GitLab CI, or any runner you already have.
                Or define a self-mutating AWS CodePipeline with multi-stage
                deployments and approval gates.
              </FeatureItem>
              <FeatureItem
                linkText="Custom domains + AWS WAF"
                href={{
                  pathname: '/[platform]/deploy-and-host/self-hosting/',
                  query: { platform: DEFAULT_PLATFORM }
                }}
              >
                Attach custom domains and AWS WAF to protect and brand your
                applications.
              </FeatureItem>
            </View>
            <Link
              href={{
                pathname: '/[platform]/deploy-and-host/self-hosting/',
                query: { platform: DEFAULT_PLATFORM }
              }}
            >
              Learn more about self-managed hosting &gt;
            </Link>
          </Flex>
        </Columns>
      </Flex>

      <Columns columns={2}>
        <FeatureList heading="Customize" level={2}>
          <FeatureItem
            linkText="Add any AWS service with AWS CDK"
            href={{
              pathname: '/[platform]/build-a-backend/add-aws-services/',
              query: { platform: DEFAULT_PLATFORM }
            }}
          >
            Extend or customize with the AWS CDK to access 200+ AWS services.
          </FeatureItem>
          <FeatureItem
            linkText="Bring your own pipelines"
            href={{
              pathname:
                '/[platform]/deploy-and-host/amplify-hosting/custom-pipelines/',
              query: { platform: DEFAULT_PLATFORM }
            }}
          >
            Use your own pipelines to set up cross-account or multi-region,
            stage-based deployments.
          </FeatureItem>
          <FeatureItem
            linkText="Monorepo and multi-repo support"
            href={{
              pathname:
                '/[platform]/deploy-and-host/amplify-hosting/mono-and-multi-repos/',
              query: { platform: DEFAULT_PLATFORM }
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
