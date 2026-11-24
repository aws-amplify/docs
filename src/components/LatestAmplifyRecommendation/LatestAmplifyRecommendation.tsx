import { Text } from '@aws-amplify/ui-react';
import { LATEST_AMPLIFY_DOCS_URL } from '@/data/latestAmplify';

export const LatestAmplifyRecommendation = ({
  generation
}: {
  generation: 'Gen 1' | 'Gen 2';
}) => {
  return (
    <Text>
      These docs cover Amplify {generation}. For new web apps, we recommend the
      latest AWS Amplify, with a simplified CLI and native integrations for
      databases, storage, and AI models.{' '}
      <a href={LATEST_AMPLIFY_DOCS_URL}>
        Get started with the latest AWS Amplify
      </a>
      .
    </Text>
  );
};
