import { Icon } from '@aws-amplify/ui-react';

export const IconVue = ({ ...rest }) => {
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
      <path d="M0 2L12 22.7353L24 2H19.2L12 14.4412L4.74 2H0Z" fill="#41B883" />
      <path
        d="M4.74019 2L12.0002 14.5013L19.2002 2H14.7602L12.0002 6.80819L9.18019 2H4.74019Z"
        fill="#35495E"
      />
      <g className="icon-monochrome">
        <path
          d="M0 2L12 22.7353L24 2H19.2L12 14.4412L4.74 2H0Z"
          fill="var(--amplify-colors-neutral-80)"
        />
        <path
          d="M4.74019 2L12.0002 14.5013L19.2002 2H14.7602L12.0002 6.80819L9.18019 2H4.74019Z"
          fill="var(--amplify-colors-neutral-100)"
        />
      </g>
    </Icon>
  );
};
