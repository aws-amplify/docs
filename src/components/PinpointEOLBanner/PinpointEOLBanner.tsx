import { Callout } from '@/components/Callout';
import Link from 'next/link';
import classNames from 'classnames';

export const PinpointEOLBanner = () => {
  return (
    <Callout backgroundColor="background.error">
      <Link
        href="https://docs.aws.amazon.com/pinpoint/latest/userguide/migrate.html"
        passHref
        className={classNames('amplify-link')}
      >
        AWS will end support for Amazon Pinpoint on October 30, 2026,
      </Link>
      , and is no longer accepting any new users as of May 20 (see the linked
      doc). The guidance is to use{' '}
      <Link
        href="https://aws.amazon.com/end-user-messaging"
        passHref
        className={classNames('amplify-link')}
      >
        AWS End User Messaging
      </Link>{' '}
      for push notifications and SMS,{' '}
      <Link
        href="https://aws.amazon.com/ses"
        passHref
        className={classNames('amplify-link')}
      >
        Amazon Simple Email Service
      </Link>{' '}
      for sending emails,{' '}
      <Link
        href="https://aws.amazon.com/connect/outbound/"
        passHref
        className={classNames('amplify-link')}
      >
        Amazon Connect
      </Link>{' '}
      for campaigns, journeys, endpoints, and engagement analytics. Pinpoint
      recommends{' '}
      <Link
        href="https://aws.amazon.com/kinesis"
        passHref
        className={classNames('amplify-link')}
      >
        Amazon Kinesis
      </Link>{' '}
      for event collection and mobile analytics.
    </Callout>
  );
};
