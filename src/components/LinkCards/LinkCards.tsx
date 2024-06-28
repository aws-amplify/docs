import React from 'react';
import LinkCard from '@/components/LinkCard';
import { Columns } from '@/components/Columns';
import * as links from '../../constants/links';
import linkCardData from '@/data/link-cards-data';
import {
  IconGithub,
  IconDiscord,
  IconAmplify,
  IconLearn
} from '@/components/Icons';
interface LinkCardsProps {
  platform: string;
}
const LinkCards: React.FC<LinkCardsProps> = ({ platform }) => {
  const linkCardPlatformData = linkCardData[platform];
  return (
    <Columns columns={4} gap="small">
      {linkCardPlatformData ? (
        <LinkCard
          isExternal={true}
          href={linkCardPlatformData.github}
          icon={() => <IconGithub fontSize="2rem" />}
        >
          {linkCardPlatformData.githubContent}
        </LinkCard>
      ) : null}
      <LinkCard
        isExternal={true}
        href={links.DISCORD}
        icon={() => <IconDiscord fontSize="2rem" />}
      >
        Amplify Discord
      </LinkCard>
      {linkCardPlatformData ? (
        <LinkCard
          isExternal={true}
          href={linkCardPlatformData.roadmap}
          icon={() => <IconAmplify fontSize="2rem" />}
        >
          What&apos;s next for Amplify
        </LinkCard>
      ) : null}
      <LinkCard
        isExternal={true}
        href={links.LEARN}
        icon={() => <IconLearn fontSize="2rem" />}
      >
        Amplify Learn
      </LinkCard>
    </Columns>
  );
};

export default LinkCards;
