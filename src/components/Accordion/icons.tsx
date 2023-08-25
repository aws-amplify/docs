import { Icon } from '@aws-amplify/ui-react';
import { MdHighlightAlt, MdExpandMore } from 'react-icons/md';

export const Expand = () => {
  return (
    <Icon aria-label="Expand">
      <MdExpandMore size={32} />
    </Icon>
  );
};

export const DeepDive = () => {
  return (
    <Icon aria-label="Deep Dive">
      <MdHighlightAlt size={'unset'} />
    </Icon>
  );
};
