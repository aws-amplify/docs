import {
  Button,
  Flex,
  ViewProps,
  VisuallyHidden,
  Text,
  View
} from '@aws-amplify/ui-react';
import {
  IconChevron,
  IconStar,
  IconX,
  IconAWS,
  IconExternalLink
} from '@/components/Icons';
import { useEffect, useId, useState } from 'react';
import { InternalLinkButton } from '@/components/InternalLinkButton';
import { useCurrentPlatform } from '@/utils/useCurrentPlatform';
import { DEFAULT_PLATFORM } from '@/data/platforms';

const AWS_BLOCKS_URL =
  'https://docs.aws.amazon.com/blocks/latest/devguide/what-is-blocks.html';

export const Modal = (_props: ViewProps) => {
  const headingId = useId();
  const [isVisible, setIsVisible] = useState(false);
  const platform = useCurrentPlatform() || DEFAULT_PLATFORM;
  const handleDialogAction = () => {
    localStorage.setItem('awsBlocksModalDismissed', 'true');
    setIsVisible(false);
  };

  useEffect(() => {
    const hasDismissedModal = localStorage.getItem('awsBlocksModalDismissed');
    if (!hasDismissedModal) {
      setIsVisible(true);
    }
  }, []);

  return (
    <Flex
      as="dialog"
      open={isVisible}
      className="modal"
      aria-labelledby={headingId}
    >
      <Flex className="modal-header">
        <Flex as="h2" className="modal-heading" id={headingId}>
          <IconStar /> Introducing AWS Blocks
        </Flex>
        <Button
          onClick={() => handleDialogAction()}
          variation="link"
          className="modal-dismiss"
        >
          <VisuallyHidden>Dismiss AWS Blocks introduction dialog</VisuallyHidden>
          <IconX />
        </Button>
      </Flex>
      Extend your Amplify Gen 2 app with AWS Blocks — self-contained backend
      capabilities you compose into your existing backend.
      <Flex className="modal-key-points">
        <Flex className="modal-key-point">
          <View
            aria-hidden="true"
            className="modal-key-point-left"
            textAlign="center"
            fontSize="xxxl"
          >
            🧩
          </View>
          <Flex className="modal-key-point-right">
            <Text as="h3" className="modal-key-point-heading">
              Composable backend capabilities
            </Text>
            <Text className="modal-key-point-text">
              Add the Blocks you need — PostgreSQL databases, realtime
              messaging, metrics, logging, and more — alongside your existing
              Amplify resources.
            </Text>
          </Flex>
        </Flex>
        <Flex className="modal-key-point">
          <View className="modal-key-point-left" aria-hidden="true">
            <IconAWS />
          </View>
          <Flex className="modal-key-point-right">
            <Text as="h3" className="modal-key-point-heading">
              Local-first, built on the AWS CDK
            </Text>
            <Text className="modal-key-point-text">
              Run your whole app locally with no AWS account, then deploy the
              same code to AWS with the AWS CDK.
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex className="modal-actions">
        <InternalLinkButton
          as="a"
          size="small"
          href={{
            pathname: '/[platform]/build-a-backend/aws-blocks',
            query: { platform: platform }
          }}
          onClick={() => handleDialogAction()}
          variation="primary"
          className="modal-action modal-action--primary"
        >
          Explore Blocks with Amplify
          <IconChevron className="icon-rotate-270" />
        </InternalLinkButton>
        <Button
          as="a"
          size="small"
          href={AWS_BLOCKS_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleDialogAction()}
          className="modal-action modal-action--secondary"
        >
          Get Started with Blocks
          <IconExternalLink />
        </Button>
      </Flex>
    </Flex>
  );
};
