import {
  Heading,
  Text,
  Flex,
  Button,
  Grid,
  Card,
  View,
  Badge
} from '@aws-amplify/ui-react';
import ExportedImage from 'next-image-export-optimizer';
import { MDXCode } from '@/components/MDXComponents/';
import {
  IconAngular,
  IconJS,
  IconNext,
  IconReact,
  IconTS,
  IconVue,
  IconChevron
} from '@/components/Icons';
import { ClassicBanner } from '@/components/Banner';
import { Columns } from '@/components/Columns';
import { FeatureList, FeatureItem } from '@/components/FeatureLists';

export const meta = {
  title: 'Amplify Docs (Gen 2)',
  description:
    'Build apps with the Amplify code-first developer experience (Gen 2) using TypeScript-based development.'
};

export function getStaticProps() {
  return {
    props: {
      meta,
      showBreadcrumbs: false,
      useCustomTitle: true
    }
  };
}

const supportedFrameworks = [
  {
    title: 'JavaScript',
    icon: <IconJS />
  },
  {
    title: 'TypeScript',
    icon: <IconTS />
  },
  {
    title: 'React',
    icon: <IconReact />
  },
  {
    title: 'Next',
    icon: <IconNext />
  },
  {
    title: 'Vue',
    icon: <IconVue />
  },
  {
    title: 'Angular',
    icon: <IconAngular />
  },
  {
    title: 'React Native',
    icon: <IconReact />
  }
];

const Gen2Overview = () => {
  return (
    <Flex className="home-content">
      <Flex className="home-section">
        <Heading level={1}>
          Amplify Docs{' '}
          <Text as="span" fontWeight="300">
            (Gen 2)
          </Text>
          <sup>
            {' '}
            <Badge size="small" backgroundColor="purple.60" color="white">
              Preview
            </Badge>
          </sup>
        </Heading>
        <Heading level={2} fontSize="xl" className="max-headline-content">
          Preview: A new code-first DX (Gen 2) for building backends
        </Heading>
        <Text className="max-inline-content">
          Amplify has reimagined the way frontend developers build fullstack
          applications on AWS. With this next generation of Amplify’s
          backend-building experience, you can author your frontend and backend
          definition completely with TypeScript, a file convention, and Git
          branch-based environments.
        </Text>
        <Flex className="home-cta">
          <Button
            size="large"
            as="a"
            variation="primary"
            href="/gen2/start/quickstart/"
            gap="small"
          >
            Get started{' '}
            <IconChevron fontSize=".875em" className="icon-rotate-90-reverse" />
          </Button>
          <Button size="large" as="a" href="/gen2/how-amplify-works/concepts/">
            How it works
          </Button>
        </Flex>
      </Flex>
      <Flex className="home-section">
        <Heading level={2}>Works with popular languages and frameworks</Heading>
        <Grid as="ul" className="framework-grid">
          {supportedFrameworks.map((framework, index) => {
            return (
              <li
                key={`framework-${index}`}
                className="framework-grid__item framework-grid__item--text"
              >
                <View className="framework-grid__icon">{framework.icon}</View>
                {framework.title}
              </li>
            );
          })}
        </Grid>

        <ClassicBanner />
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
        />

        <Columns columns={2} as="ul">
          <FeatureItem
            linkText="TypeScript-first fullstack experience"
            href="/gen2/how-amplify-works/concepts/#build-fullstack-apps-with-typescript"
          >
            Write TypeScript across frontend and backend. Get schema validation,
            dot completion, and end-to-end types while you code.
          </FeatureItem>
          <FeatureItem
            linkText="Real-time data for modern apps"
            href="/gen2/build-a-backend/data/set-up-data/"
          >
            Sync frontend state to real-time backend updates. Just write
            TypeScript without thinking about WebSockets.
          </FeatureItem>
          <FeatureItem
            linkText="Authn and authz for secure apps"
            href="/gen2/build-a-backend/auth/set-up-auth/"
          >
            Choose the auth strategy (such as passwords, social, email links)
            and control data access based on users and groups.
          </FeatureItem>
          <FeatureItem
            linkText="Auto-generate CRUD forms wired to data"
            href="/gen2/build-ui/"
          >
            Map CRUD forms to your data model with form-level validations and
            error states built in.
          </FeatureItem>
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
          <FeatureItem
            linkText="SSR/SSG/ISR hosting support"
            href="/gen2/deploy-and-host/hosting/"
          >
            Deploy apps in Next.js, Nuxt.js, Gatsby, React, Vue, Angular (and
            more) by simply connecting your Git repository.
          </FeatureItem>
          <FeatureItem
            linkText="Faster iterations with per-developer sandboxes"
            href="/gen2/deploy-and-host/sandbox-environments/setup/"
          >
            Per-developer cloud sandboxes provide high fidelity and faster
            deployment times to make local iteration quick.
          </FeatureItem>
          <FeatureItem
            linkText="Zero-config fullstack branches"
            href="/gen2/deploy-and-host/fullstack-branching/branch-deployments/"
          >
            Fullstack deployments from your Git branch. Autodeploy Git branches
            to set up staging, development, and production environments.
          </FeatureItem>
          <FeatureItem
            linkText="GUI to manage your data"
            href="/gen2/how-amplify-works/concepts/#unified-management-console"
          >
            Manage your app data, users and groups, and files in a single
            console.
          </FeatureItem>
        </FeatureList>

        <FeatureList heading="Customize" level={2}>
          <FeatureItem
            linkText="Add any AWS service with CDK"
            href="/gen2/build-a-backend/add-aws-services/"
          >
            Extend or customize with AWS CDK to access 200+ AWS services.
          </FeatureItem>
          <FeatureItem
            linkText="Bring your own pipelines"
            href="/gen2/deploy-and-host/fullstack-branching/custom-pipelines/"
          >
            Use your own pipelines to set up cross-account or multi-region,
            stage-based deployments.
          </FeatureItem>
          <FeatureItem
            linkText="Monorepo and multi-repo support"
            href="/gen2/deploy-and-host/fullstack-branching/mono-and-multi-repos/"
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
