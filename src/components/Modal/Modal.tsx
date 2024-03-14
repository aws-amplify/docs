import { Button, Flex, ViewProps, VisuallyHidden } from '@aws-amplify/ui-react';
import { IconStar, IconX } from '@/components/Icons';
import { useEffect, useId, useState } from 'react';

interface ModalProps extends ViewProps {}

export const Modal = ({}: ModalProps) => {
  const headingId = useId();
  const [isVisible, setIsVisible] = useState(false);

  const handleDialogAction = () => {
    localStorage.setItem('gen2ModalDismissed', 'true');
    setIsVisible(false);
  };

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
        <Button
          as="a"
          size="small"
          href="/gen1"
          onClick={() => handleDialogAction()}
          className="modal-action modal-action--secondary"
        >
          Go to Gen 1 docs
        </Button>
        <Button
          as="a"
          size="small"
          href="/"
          onClick={() => handleDialogAction()}
          variation="primary"
          className="modal-action modal-action--primary"
        >
          Learn more
        </Button>
      </Flex>
    </Flex>
  );
};
