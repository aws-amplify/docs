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

export const meta = {
  title: 'Gen 2',
  description: `This is a description for the overview page.`
};

export function getStaticProps() {
  return {
    props: {
      meta
    }
  };
}

const Gen2Overview = () => {
  return (
    <>
      <Heading level={1}>Amplify Gen 2 Documentation</Heading>
      <Text fontWeight="bold">
        Now in preview: Infrastructure from code capabilities in a powerful new
        backend building experience
      </Text>
      <Text>
        Amplify has reimagined the way frontend developers build fullstack
        applications on AWS. This new Amplify feature lets you provision
        infrastructure by authoring your backend definition using
        TypeScript/JavaScript and a file-based convention without any tooling
        overhead.
      </Text>
      <Flex>
        <Button size="large" as="a" variation="primary" href="/gen2/start">
          Get started
        </Button>
        <Button size="large" as="a" href="/gen2/how-amplify-works">
          How it works
        </Button>
      </Flex>
      <Grid className="columns-two">
        <Card variation="outlined">
          <Heading level={2} fontSize="medium">
            Infrastructure-from-code
          </Heading>
          <Text>
            Write TypeScript to define your data model, authentication, and
            authorization settings (expand).
          </Text>
        </Card>
        <Card variation="outlined">
          <Heading level={2} fontSize="medium">
            Zero-config deployments, fully managed hosting
          </Heading>
          <Text>
            Full-stack deployments from your Git branch. No extra config
            (expand).
          </Text>
        </Card>
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
    </>
  );
};

export default Gen2Overview;
