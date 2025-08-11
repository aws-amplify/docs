import { Callout } from '@/components/Callout';
import Link from 'next/link';
import classNames from 'classnames';

export const GeoLegacyResourcesBanner = () => {
  return (
    <Callout backgroundColor="background.error">
      Amazon Location Service has introduced{' '}
      <Link
        href="https://us-west-2.console.aws.amazon.com/location/home?region=us-west-2#/feature-spotlight"
        passHref
        className={classNames('amplify-link')}
      >
        new APIs for Maps and Places
      </Link>{' '}
      which no longer require account-bound resources. Amplify Geo no longer
      supports the provisioning of legacy (account-bound) maps and place
      indices. Please{' '}
      <Link
        href="https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_location-readme.html"
        passHref
        className={classNames('amplify-link')}
      >
        visit the CDK API to learn more about provisioning legacy resources.
      </Link>
    </Callout>
  );
};
