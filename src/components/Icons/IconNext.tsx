import { useState, useEffect, useMemo } from 'react';
import { Icon } from '@aws-amplify/ui-react';
import { v4 as uuidv4 } from 'uuid';

export const IconNext = ({ ...rest }) => {
  const [gradient1Id, setGradient1Id] = useState<string>('');
  const [gradient2Id, setGradient2Id] = useState<string>('');

  useEffect(() => {
    setGradient1Id(uuidv4());
    setGradient2Id(uuidv4());
  }, []);

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
        d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
        fill="black"
      />
      <path
        className="icon-monochrome"
        d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
        fill="var(--amplify-colors-neutral-100)"
      />
      <path
        d="M19.9345 21.0027L9.21902 7.20007H7.20009V16.7961H8.81524V9.25122L18.6666 21.9794C19.1112 21.6819 19.5346 21.3554 19.9345 21.0027Z"
        fill={`url(#${gradient1Id})`}
      />
      <path
        d="M16.9333 7.20007H15.3333V16.8001H16.9333V7.20007Z"
        fill={`url(#${gradient2Id})`}
      />
      <defs>
        <linearGradient
          id={gradient1Id}
          x1="14.5334"
          y1="15.5334"
          x2="19.2668"
          y2="21.4001"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id={gradient2Id}
          x1="16.1333"
          y1="7.20007"
          x2="16.1065"
          y2="14.2501"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </Icon>
  );
};
