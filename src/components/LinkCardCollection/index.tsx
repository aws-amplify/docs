import React from 'react';
import { Collection } from '@aws-amplify/ui-react';

import LinkCard from '../LinkCard';

const CardData: CardData[] = [
  {
    name: 'Card Text1'
  },
  {
    name: 'Card Text2'
  },
  {
    name: 'Card Text3'
  },

  {
    name: 'Card Text4'
  }
];

export interface CardData {
  name: string;
}

export const LinkCardCollection = () => {
  return (
    <>
      <Collection
        items={CardData}
        type="list"
        direction="row"
        gap="20px"
        wrap="wrap"
      >
        {(CardData, index) => (
          <LinkCard isExternal={true} href={''} imageUrl={''}>
            {CardData.name}
          </LinkCard>
        )}
      </Collection>
    </>
  );
};
