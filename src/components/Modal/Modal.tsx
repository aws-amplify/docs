import {
  Button,
  Flex,
  View,
  ViewProps,
  VisuallyHidden
} from '@aws-amplify/ui-react';
// import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';

interface ModalProps extends ViewProps {
  modalHeading?: React.ReactNode;
}

export const Modal = ({ modalHeading, children }: ModalProps) => {
  // const [documentMounted, setDocumentMounted] = useState(false);

  // useEffect(() => {
  //   setDocumentMounted(true);
  // }, []);

  return (
    <View role="dialog" className="modal-portal">
      <Flex className="modal">
        <View className="modal-header">
          {modalHeading}
          <Button variation="link">
            <VisuallyHidden>Dismiss Gen 2 modal</VisuallyHidden>
          </Button>
        </View>

        {children}
        <Flex>
          <Button as="a" href="/gen1">
            Go to Gen 1 docs
          </Button>
          <Button as="a" href="/" variation="primary">
            Learn more
          </Button>
        </Flex>
      </Flex>
    </View>
  );
};
