import { Icon } from '@aws-amplify/ui-react';

export const IconDoubleChevron = ({ ...rest }) => {
  return (
    <Icon
      aria-hidden="true"
      {...rest}
      viewBox={{
        minX: 0,
        minY: 0,
        width: 24,
        height: 24
      }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.8981 12.5817L19.8409 0.552551L21.0447 1.44748L12.4364 13.0266L21.0991 24.5493L19.9002 25.4507L10.9005 13.4798L10.5636 13.0316L10.8981 12.5817ZM3.39811 12.5817L12.3409 0.552551L13.5447 1.44748L4.93642 13.0266L13.5991 24.5493L12.4002 25.4507L3.40052 13.4798C3.20073 13.2141 3.19975 12.8485 3.39811 12.5817Z"
        fill="currentColor"
      />
    </Icon>
  );
};
