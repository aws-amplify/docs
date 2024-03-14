import {
  Button,
  Flex,
  View,
  ViewProps,
  VisuallyHidden
} from '@aws-amplify/ui-react';
import { IconX } from '@/components/Icons';
import { useState, useId } from 'react';
interface ModalProps extends ViewProps {
  modalHeading?: React.ReactNode;
}

export const Modal = ({ modalHeading, children }: ModalProps) => {
  const headingId = useId();
  const [isVisible, setIsVisible] = useState(true);

  return isVisible ? (
    <View role="dialog" className="modal-portal" aria-labelledby={headingId}>
      <Flex className="modal">
        <Flex className="modal-header">
          <Flex as="h2" className="modal-heading" id={headingId}>
            {modalHeading}
          </Flex>
          <Button
            onClick={() => setIsVisible(false)}
            variation="link"
            className="modal-dismiss"
          >
            <VisuallyHidden>Dismiss Gen 2 modal</VisuallyHidden>
            <IconX />
          </Button>
        </Flex>

        {children}
        <Flex>
          <Button
            as="a"
            href="/gen1"
            className="modal-action modal-action--secondary"
          >
            Go to Gen 1 docs
          </Button>
          <Button
            as="a"
            href="/"
            variation="primary"
            className="modal-action modal-action--primary"
          >
            Learn more
          </Button>
        </Flex>
      </Flex>
    </View>
  ) : null;
};
