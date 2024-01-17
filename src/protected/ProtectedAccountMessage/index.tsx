import { Callout } from '@/components/Callout';

export const ProtectedAccountMessage = () => (
  <Callout warning>
    We recommend operating Amplify workloads in dedicated accounts so IAM
    principals not working with Amplify do not manipulate provisioned resources
    out-of-band.
  </Callout>
);
