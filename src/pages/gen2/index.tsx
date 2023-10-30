import {
  Heading,
  Text,
  Flex,
  Button,
  Grid,
  Card,
  View
} from '@aws-amplify/ui-react';
import { MDXCode } from '@/components/MDXComponents/';
import {
  IconKotlin,
  IconNext,
  IconNuxt,
  IconReact,
  IconVue,
  IconChevron
} from '@/components/Icons';

export const meta = {
  title: 'Amplify Docs (Gen 2)',
  description: 'This is a description for the overview page.'
};

export function getStaticProps() {
  return {
    props: {
      meta
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
        <Grid as="ul" className="framework-grid framework-grid--inline">
          {supportedFrameworks.map((framework, index) => {
            return (
              <li key={`framework-${index}`} className="framework-grid__item">
                <View className="framework-grid__icon framework-grid__icon--inline">
                  {framework.icon}
                </View>
                {framework.title}
              </li>
            );
          })}
        </Grid>
      </Flex>
      <Flex className="home-section">
        <Heading level={2}>Features</Heading>
        <Grid className="columns-three">
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
        </Grid>
      </Flex>
      <Grid className="columns-two">
        <View>Develop</View>
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
        <View>??</View>
        <View>Deploy and host your apps</View>
        <View>Scale</View>
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
      </Grid>
    </Flex>
  );
};

export default Gen2Overview;
