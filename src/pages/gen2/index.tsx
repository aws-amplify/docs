import {
  Heading,
  Text,
  Flex,
  Button,
  Grid,
  Card,
  View
} from '@aws-amplify/ui-react';
import ExportedImage from 'next-image-export-optimizer';
import { MDXCode } from '@/components/MDXComponents/';
import {
  IconKotlin,
  IconNext,
  IconNuxt,
  IconReact,
  IconVue,
  IconChevron
} from '@/components/Icons';
import { Columns } from '@/components/Columns';
import { FeatureList, FeatureItem } from '@/components/FeatureLists';

export const meta = {
  title: 'Amplify Docs (Gen 2)',
  description: 'This is a description for the overview page.'
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
    title: 'Next',
    icon: <IconNext />
  },
  {
    title: 'React',
    icon: <IconReact />
  },
  {
    title: 'Nuxt',
    icon: <IconNuxt />
  },
  {
    title: 'Vue',
    icon: <IconVue />
  },
  {
    title: 'Kotlin',
    icon: <IconKotlin />
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
        </Heading>
        <Heading level={2} fontSize="xl" className="max-headline-content">
          Now in preview: Infrastructure from code capabilities in a powerful
          new fullstack app building experience
        </Heading>
        <Text className="max-inline-content">
          Amplify has reimagined the way frontend developers build fullstack
          applications on AWS. This next generation of Amplify’s backend
          building tooling lets you author your frontend and backend definition
          completely with TypeScript, a file convention, and Git branch-based
          environments.
        </Text>

        <Flex className="home-cta">
          <Button
            size="large"
            as="a"
            variation="primary"
            href="/gen2/start"
            gap="small"
          >
            Get started{' '}
            <IconChevron fontSize=".875em" className="icon-rotate-90-reverse" />
          </Button>
          <Button size="large" as="a" href="/gen2/how-amplify-works">
            How it works
          </Button>
        </Flex>
      </Flex>
      <Flex className="home-section">
        <Heading level={2}>Works with popular frameworks</Heading>
        <Grid as="ul" className="framework-grid">
          {supportedFrameworks.map((framework, index) => {
            return (
              <li key={`framework-${index}`} className="framework-grid__item">
                <View className="framework-grid__icon">{framework.icon}</View>
                {framework.title}
              </li>
            );
          })}
        </Grid>
      </Flex>
      <Flex className="home-section">
        <Heading level={2}>Features</Heading>
        <Columns columns={3}>
          <Card variation="outlined">
            <Flex direction="column">
              <Heading level={3} fontSize="medium">
                Infrastructure-from-code
              </Heading>
              <Text>
                Infrastructure-from-code is a new approach that lets your focus
                on your app code instead of infrastructure.
              </Text>
            </Flex>
          </Card>
          <Card variation="outlined">
            <Flex direction="column">
              <Heading level={3} fontSize="medium">
                Zero-config, fullstack deployments
              </Heading>
              <Text>
                Full-stack deployments from your Git branch. Deploy your
                frontend and backend together on every code commit.
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
      <Columns columns={2}>
        <FeatureList heading="Develop" level={2}>
          <FeatureItem
            linkText="A TypeScript-first fullstack experience"
            href="/gen2"
          >
            Write TypeScript across the frontend and the backend to give you
            features like schema validation, dot completion, and end-to-end
            typings while you code.
          </FeatureItem>
          <FeatureItem linkText="Real-time data for modern apps" href="/gen2">
            Sync frontend state to realtime backend updates. No websocket
            configuration required. Just write TypeScript.
          </FeatureItem>
          <FeatureItem linkText="Authn and authz for secure apps" href="/gen2">
            Choose the auth strategy (e.g. passwords, social, email links) and
            control data access based on users/groups.
          </FeatureItem>
          <FeatureItem
            linkText="Auto-generate CRUD forms wired to data"
            href="/gen2"
          >
            CRUD forms that map to your data model with form-level validations
            and error states built-in.
          </FeatureItem>
        </FeatureList>

        <MDXCode
          fileName="amplify/data/resource.ts"
          language="typescript"
          codeString={`import { a, defineData } from 'aws-amplify-backend';

const schema = a.schema({
  Todo: a.model({
    title: a.string(), 
    description: a.string().optional(), 
    priority: a.enum(['low','medium', 'high']).default('low'),
  }),
});

export type Schema = typeof schema;

export default defineData ({
  schema, 
});`}
        ></MDXCode>

        <ExportedImage
          src="/images/gen2/deploy-cycle.png"
          alt="Flowchart describing..."
          width="450"
          height="412"
          style={{ margin: 'auto', height: 'auto' }}
        />

        <FeatureList heading="Deploy" level={2}>
          <FeatureItem linkText="SSR/SSG/ISR hosting support" href="/gen2">
            Deploy Next.js, Nuxt.js, Gatsby, React, Vue, Angular (and more) apps
            by simply connecting your Git repository.
          </FeatureItem>
          <FeatureItem
            linkText="Faster iterations with per-developer sandboxes"
            href="/gen2"
          >
            Per-developer cloud sandboxes provide high fidelity and faster
            deployment times to make local iteration quick.
          </FeatureItem>
          <FeatureItem linkText="Zero-config fullstack branches" href="/gen2">
            Full-stack deployments from your Git branch. Autodeploy git branches
            to set up staging, development and production environments
          </FeatureItem>
          <FeatureItem linkText="GUI to manage your data" href="/gen2">
            Console to manage your app data, users/groups, and files.
          </FeatureItem>
        </FeatureList>

        <FeatureList heading="Customize" level={2}>
          <FeatureItem linkText="Add any AWS service with CDK" href="/gen2">
            Extend or customize with AWS CDK to access 200+ AWS services.
          </FeatureItem>
          <FeatureItem linkText="Bring your your own pipelines" href="/gen2">
            Use your own pipelines to set up cross-account or multi-region
            stage-based deployments.
          </FeatureItem>
          <FeatureItem linkText="Monorepo and multi-repo support" href="/gen2">
            Support for all types of fullstack team workflows - monorepos,
            microfrontends, multi-repos and more.
          </FeatureItem>
        </FeatureList>
        <MDXCode
          fileName="amplify/custom/Backup.ts"
          language="typescript"
          codeString={`import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';
import * as backup from 'aws-cdk-lib/aws-backup'; 
import * as events from 'aws-cdk-lib/aws-events';
import * as rds from 'aws-cdk-lib/aws-rds';

/**
 * Define the stack's props
 */
export type BackupStackProps = {
  /**
   * Database instance to back up
   */
  database: rds.DatabaseInstance; 
}`}
        ></MDXCode>
      </Columns>
    </Flex>
  );
};

export default Gen2Overview;
