import { Icon } from '@aws-amplify/ui-react';

// Chevron Icon pointing towards the right
export const IconChevron = ({ ...rest }) => {
  return (
    <Icon
      {...rest}
      viewBox={{ minX: 0, minY: 0, width: 11, height: 11 }}
      fill="none"
      paths={[
        {
          d: 'M3.96289 0.75L2.99954 1.71335L7.28566 6L2.99954 10.2867L3.96289 11.25L9.21289 6L3.96289 0.75Z',
          fillRule: 'evenodd',
          clipRule: 'evenodd',
          fill: '#000716'
        }
      ]}
    />
  );
};
