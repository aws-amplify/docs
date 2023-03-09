import NextLink from 'next/link';
import {
  Button,
  Flex,
  View,
  Heading,
  Text,
  Link,
  Card
} from '@aws-amplify/ui-react';
import { FiExternalLink } from 'react-icons/fi';
import Layout from '../../components/contribute/Layout';
import Issues from '../../components/contribute/CardIssues';
import HowItWorks from '../../components/contribute/HowItWorks';
import QuickstartResources from '../../components/contribute/QuickstartResources';

import { Octokit } from '@octokit/rest';
import { Endpoints } from '@octokit/types';

type listRepoIssuesResponse = Endpoints['GET /repos/{owner}/{repo}/issues']['response'];

export async function getStaticProps() {
  if (process.env.PROD_ENV === 'production') {
    const octokit = new Octokit({});

    const {
      data: JsIssues
    }: {
      data: listRepoIssuesResponse['data'];
    } = await octokit.rest.issues.listForRepo({
      owner: 'aws-amplify',
      repo: 'amplify-js',
      state: 'open',
      labels: 'good first issue',
      // eslint-disable-next-line @typescript-eslint/camelcase
      per_page: 6
    });

    const {
      data: CLIissues
    }: {
      data: listRepoIssuesResponse['data'];
    } = await octokit.rest.issues.listForRepo({
      owner: 'aws-amplify',
      repo: 'amplify-cli',
      state: 'open',
      labels: 'good first issue',
      // eslint-disable-next-line @typescript-eslint/camelcase
      per_page: 6
    });

    return {
      props: { JsIssues, CLIissues }
    };
  }

  return {
    props: {}
  };
}

export default function ContributorPage({ JsIssues, CLIissues }) {
  const meta = {
    title: 'AWS Amplify Contributor Program',
    description:
      'The Amplify Contributor Program is an open invitation for you to participate in the Amplify open source development journey. Get involved with AWS Amplify by making open source contributions to the Amplify project!'
  };
  return (
    <>
      <Layout meta={meta}>
        {/* Nav - need to put in matching nav */}
        {/* <Nav /> */}
        <View
          width="100%"
          backgroundColor="brand.paper"
          marginTop="5em"
          marginBottom="10em"
        >
          <Flex
            direction="column"
            gap="8rem"
            maxWidth="1280px"
            justifyContent="center"
            margin="0 auto"
          >
            <Flex
              direction="column"
              alignContent="center"
              justifyContent="center"
              gap="4rem"
              maxWidth="800px"
              margin="0 auto"
            >
              <Heading level={1} textAlign="center" color="brand.squidInk">
                AWS Amplify
                <br />
                <View as="span" color="brand.smile">
                  Contributor Program
                </View>
              </Heading>
              <Text fontSize={'xl'} textAlign="center">
                Get involved with AWS Amplify by making open source
                contributions to the project.
              </Text>

              <Flex justifyContent="center" wrap="wrap">
                <Link
                  as={NextLink}
                  href="/contribute/getting-started"
                  isExternal={false}
                >
                  <Button size="large" variation="primary">
                    Get Started Contributing
                  </Button>
                </Link>
              </Flex>
            </Flex>

            <HowItWorks />

            <Flex
              direction="column"
              maxWidth="1024px"
              width={{ base: '90%', large: '60%' }}
              margin="0 auto"
              gap="2em"
            >
              <View>
                <Heading level={2}>Start contributing!</Heading>
              </View>
              <Text fontSize={'large'} color="font.secondary">
                Thank you for your interest in contributing! Whether it's a bug
                report, new feature, correction, or additional documentation, we
                greatly value feedback and contributions from our community.
                Check out the issues and discussions in the Amplify projects
                below to get started!
              </Text>
            </Flex>

            <Flex
              direction="row"
              justifyContent="center"
              alignItems="top"
              gap="5em"
              wrap={'wrap'}
            >
              <Card
                padding={'3rem'}
                variation="elevated"
                width={{ base: '90%', large: '40%' }}
              >
                <Issues
                  title={'Amplify JS'}
                  issues={JsIssues}
                  repo={'amplify-js'}
                  description="A declarative JavaScript library for application development using cloud services."
                />
              </Card>
              <Card
                padding={'3rem'}
                variation="elevated"
                width={{ base: '90%', large: '40%' }}
              >
                <Issues
                  title={'Amplify CLI'}
                  issues={CLIissues}
                  repo={'amplify-cli'}
                  description="The AWS Amplify CLI is a toolchain for simplifying serverless web and mobile development."
                />
              </Card>
            </Flex>

            <QuickstartResources />
            {/* <Contributors /> */}
          </Flex>
        </View>
      </Layout>
    </>
  );
}
