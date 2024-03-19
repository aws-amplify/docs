import { Button, Flex, ViewProps, VisuallyHidden } from '@aws-amplify/ui-react';
import { IconStar, IconX } from '@/components/Icons';
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
      Amplify has reimagined the way frontend developers build fullstack
      applications on AWS. With this next generation of Amplify&apos;s
      backend-building experience, you can author your frontend and backend
      definition completely with Typescript a file convention, and Git
      branch-based environments.
      <Flex className="modal-actions">
        {isGen1 ? null : (
          <InternalLinkButton
            as="a"
            size="small"
            href={gen1Path}
            onClick={() => handleDialogAction()}
            className="modal-action modal-action--secondary"
          >
            Go to Gen 1 docs
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
          How Amplify Gen 2 works
        </InternalLinkButton>
      </Flex>
    </Flex>
  );
};
