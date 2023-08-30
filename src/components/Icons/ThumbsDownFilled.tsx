import { Icon } from '@aws-amplify/ui-react';
import { FilledWrapper } from './ThumbsUpFilled';

export const ThumbsDownFilledIcon = () => (
  <FilledWrapper>
    <Icon
      ariaLabel="Thumbs down"
      viewBox={{
        minX: 0,
        minY: 0,
        width: 16,
        height: 16
      }}
      color="#d91515"
    >
      <path
        className="filled"
        d="M6 9.58c0 .27.06.55.19.79l1.64 3.28c.1.21.32.34.55.34.34 0 .62-.28.62-.62v-3.33h3.44a2 2 0 0 0 1.94-2.48l-1.01-4.05a2 2 0 0 0-1.94-1.52H6v7.59Z"
      ></path>
      <path d="M6 2H2v7h4"></path>
    </Icon>
  </FilledWrapper>
);
