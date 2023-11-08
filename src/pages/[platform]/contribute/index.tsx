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
import { getCustomStaticPath } from '@/utils/getCustomStaticPath';
                  

export const getStaticPaths = async () => {
  return getCustomStaticPath(meta.platforms);
};

export function getStaticProps(context) {
  return {
    props: {
      platform: context.params.platform,
      meta
    }
  };
}
          
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
import AmplifyBadges from '../../components/contribute/AmplifyBadges';

// type listRepoIssuesResponse = Endpoints['GET /repos/{owner}/{repo}/issues']['response'];

export function getStaticProps() {
  // if (process.env.PROD_ENV === 'production') {
  //   const octokit = new Octokit({});
  //   const {
  //     data: JsIssues
  //   }: {
  //     data: listRepoIssuesResponse['data'];
  //   } = await octokit.rest.issues.listForRepo({
  //     owner: 'aws-amplify',
  //     repo: 'amplify-js',
  //     state: 'open',
  //     labels: 'good first issue',
  //     // eslint-disable-next-line @typescript-eslint/camelcase
  //     per_page: 6
  //   });
  //   const {
  //     data: CLIissues
  //   }: {
  //     data: listRepoIssuesResponse['data'];
  //   } = await octokit.rest.issues.listForRepo({
  //     owner: 'aws-amplify',
  //     repo: 'amplify-cli',
  //     state: 'open',
  //     labels: 'good first issue',
  //     // eslint-disable-next-line @typescript-eslint/camelcase
  //     per_page: 6
  //   });
  //   return {
  //     props: { JsIssues, CLIissues }
  //   };
  // }

  return {
    props: {}
  };
}

export default function ContributorPage() {
  const meta = {
  title: 'AWS Amplify Contributor Program',
    description:,
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
            gap="4rem"
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

           
            <AmplifyBadges />
            <QuickstartResources />
            {/* <Contributors /> */}
          </Flex>
        </View>
      </Layout>
    </>
  );
}
