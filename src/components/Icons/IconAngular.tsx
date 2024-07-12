import { Icon } from '@aws-amplify/ui-react';

export const IconAngular = ({ ...rest }) => {
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
        d="M1 3.9779L12.1321 0L23.5639 3.90717L21.7129 18.6784L12.1321 24L2.70111 18.7492L1 3.9779Z"
        fill="#E23237"
      />
      <path
        d="M23.5639 3.90717L12.132 0V24L21.7129 18.6873L23.5639 3.90717Z"
        fill="#B52E31"
      />
      <path
        d="M12.1494 2.80231L5.21284 18.2808L7.80411 18.2366L9.19677 14.7448H15.4194L16.9443 18.2808L19.421 18.325L12.1494 2.80231ZM12.1671 7.76144L14.5116 12.6763H10.1045L12.1671 7.76144Z"
        fill="white"
      />
      <g className="icon-monochrome">
        <path
          d="M1 3.9779L12.1321 0L23.5639 3.90717L21.7129 18.6784L12.1321 24L2.70111 18.7492L1 3.9779Z"
          fill="var(--amplify-colors-neutral-100)"
        />
        <path
          d="M23.5639 3.90717L12.132 0V24L21.7129 18.6873L23.5639 3.90717Z"
          fill="var(--amplify-colors-neutral-100)"
        />
        <path
          d="M12.1494 2.80231L5.21284 18.2808L7.80411 18.2366L9.19677 14.7448H15.4194L16.9443 18.2808L19.421 18.325L12.1494 2.80231ZM12.1671 7.76144L14.5116 12.6763H10.1045L12.1671 7.76144Z"
          fill="var(--amplify-colors-font-inverse)"
        />
      </g>
    </Icon>
  );
};
