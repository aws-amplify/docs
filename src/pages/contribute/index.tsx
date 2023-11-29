import { Heading, Text, Flex, View } from '@aws-amplify/ui-react';
import ExportedImage from 'next-image-export-optimizer';
import { InternalLinkButton } from '@/components/InternalLinkButton';
import HowItWorks from '@/components/contribute/HowItWorks';
import { YoutubeEmbed } from '@/components/YoutubeEmbed';
import { Columns } from '@/components/Columns';
import * as img from '../../constants/img';

const meta = {
  title: 'AWS Amplify Contributor Program',
  description:
    'Amplify documentation - Learn how to use Amplify to develop and deploy cloud-powered mobile and web apps.',
  hideFromNav: true
};

export function getStaticProps() {
  return {
    props: {
      hasTOC: false,
      showLastUpdatedDate: false,
      useCustomTitle: true,
      meta
    }
  };
}

export default function Contribute() {
  return (
    <Flex direction="column" gap="xl">
      <Flex direction="column">
        <Heading level={1} textAlign="center">
          AWS Amplify
          <View>Contributor Program</View>
        </Heading>
        <Text fontSize="xl" textAlign="center">
          Get involved with AWS Amplify by making open source contributions to
          the project.
        </Text>

        <Flex justifyContent="center" wrap="wrap">
          <InternalLinkButton
            href="/contribute/getting-started"
            size="large"
            variation="primary"
          >
            Get Started Contributing
          </InternalLinkButton>
        </Flex>
      </Flex>

      <HowItWorks />

      <Heading level={2}>The Amplify Badge Program</Heading>
      <Text fontSize="large" color="font.secondary">
        The Amplify Badge Program celebrates your contributions by offering you
        exclusive, eye-catching badges to display on your online profiles, such
        as LinkedIn, GitHub, or your own website.
      </Text>
      <Flex
        direction="row"
        justifyContent="center"
        alignItems="top"
        gap="2em"
        wrap={'wrap'}
      >
        <ExportedImage
          alt={img.BADGE_FOUNDATIONAL.alt}
          height={200}
          width={200}
          src={img.BADGE_FOUNDATIONAL.src}
        />

        <ExportedImage
          alt={img.BADGE_ITERMEDIATE.alt}
          height={200}
          width={200}
          src={img.BADGE_ITERMEDIATE.src}
        />

        <ExportedImage
          alt={img.BADGE_ADVANCED.alt}
          height={200}
          width={200}
          src={img.BADGE_ADVANCED.src}
        />
      </Flex>

      <Heading level={2}>Quickstart videos</Heading>
      <Text fontSize="large">
        Follow along with these videos to learn how to set up your local
        environment to get started making open source contributions to the
        Amplify project.
      </Text>

      <Columns columns={2}>
        <YoutubeEmbed embedId="8BUSqSkhqtw" width="600" height="350" />
        <YoutubeEmbed embedId="WMKVE98hEzE" width="600" height="350" />
      </Columns>
    </Flex>
  );
}
