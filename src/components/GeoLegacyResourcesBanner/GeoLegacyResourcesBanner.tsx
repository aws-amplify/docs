import { Callout } from '@/components/Callout';
import Link from 'next/link';
import classNames from 'classnames';

export const GeoLegacyResourcesBanner = () => {
  return (
    <Callout backgroundColor="background.error">
      Amazon Location Service has introduced new APIs for Maps and Places which
      no longer require account-bound resources. Amplify Geo no longer supports
      the provisioning of legacy (account-bound) maps and place indices. Please{' '}
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
