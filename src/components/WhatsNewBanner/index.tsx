import { Link, View } from '@aws-amplify/ui-react';
import { FiArrowRightCircle } from 'react-icons/fi';
import { BannerContainer } from './styles';
import { trackWhatsNewBanner } from '../../utils/track';

export default function WhatsNewBanner({ href, content }) {
  return (
    <BannerContainer>
      <Link
        onClick={trackWhatsNewBanner}
        isExternal={true}
        href={href}
        padding={'4px 16px'}
        borderRadius={16}
        backgroundColor={'var(--amplify-colors-neutral-90)'}
        display={'inline-flex'}
        color={'white'}
      >
        <span>
          <b>What's New: </b>
          {content}
        </span>
        <FiArrowRightCircle style={{ marginLeft: 8, alignSelf: 'center' }} />
      </Link>
    </BannerContainer>
  );
}
