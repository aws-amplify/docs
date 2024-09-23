import {
  Button,
  Flex,
  ViewProps,
  VisuallyHidden,
  Text,
  View
} from '@aws-amplify/ui-react';
import { IconChevron, IconStar, IconX, IconTSBoxed } from '@/components/Icons';
import { useEffect, useId, useState } from 'react';
import { InternalLinkButton } from '@/components/InternalLinkButton';
import { useCurrentPlatform } from '@/utils/useCurrentPlatform';
import { DEFAULT_PLATFORM } from '@/data/platforms';
import { useGen1Path } from './useGen1Path';

interface ModalProps extends ViewProps {
  isGen1?: boolean;
}

export const Modal = ({ isGen1 }: ModalProps) => {
  const headingId = useId();
  const [isVisible, setIsVisible] = useState(false);
  const platform = useCurrentPlatform() || DEFAULT_PLATFORM;
  const handleDialogAction = () => {
    localStorage.setItem('gen2ModalDismissed', 'true');
    setIsVisible(false);
  };
  const gen1Path = useGen1Path(platform);

  useEffect(() => {
    const hasDismissedGen2Modal = localStorage.getItem('gen2ModalDismissed');
    if (!hasDismissedGen2Modal) {
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
          <IconStar /> Introducing Amplify Gen 2
        </Flex>
        <Button
          onClick={() => handleDialogAction()}
          variation="link"
          className="modal-dismiss"
        >
          <VisuallyHidden>Dismiss Gen 2 introduction dialog</VisuallyHidden>
          <IconX />
        </Button>
      </Flex>
      Amplify has re-imagined the way frontend developers build fullstack
      applications. Develop and deploy without the hassle.
      <Flex className="modal-key-points">
        <Flex className="modal-key-point">
          <View className="modal-key-point-left" aria-hidden="true">
            <IconTSBoxed />
          </View>
          <Flex className="modal-key-point-right">
            <Text as="h3" className="modal-key-point-heading">
              Fullstack TypeScript
            </Text>
            <Text className="modal-key-point-text">
              Write your app&apos;s data model, auth, storage, and functions in
              TypeScript; Amplify will do the rest.
            </Text>
          </Flex>
        </Flex>
        <Flex className="modal-key-point">
          <View
            aria-hidden="true"
            className="modal-key-point-left"
            textAlign="center"
            fontSize="xxxl"
          >
            🚀
          </View>
          <Flex className="modal-key-point-right">
            <Text as="h3" className="modal-key-point-heading">
              Built with the AWS CDK
            </Text>
            <Text className="modal-key-point-text">
              Use any cloud resource your app needs. Never worry about scale.
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex className="modal-actions">
        {isGen1 ? null : (
          <InternalLinkButton
            as="a"
            size="small"
            href={gen1Path}
            onClick={() => handleDialogAction()}
            className="modal-action modal-action--secondary"
          >
            Back to Gen 1 Docs
          </InternalLinkButton>
        )}
        <InternalLinkButton
          as="a"
          size="small"
          href={{
            pathname: '/[platform]/how-amplify-works',
            query: { platform: platform }
          }}
          onClick={() => handleDialogAction()}
          variation="primary"
          className="modal-action modal-action--primary"
        >
          Learn more about Gen 2
          <IconChevron className="icon-rotate-270" />
        </InternalLinkButton>
      </Flex>
    </Flex>
  );
};
