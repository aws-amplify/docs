import { Callout } from '@/components/Callout';

// WARNING: The messaging in this component should NOT be changed without the appropriate approvals
export const ProtectedAccountMessage = () => (
  <Callout warning>
    We recommend operating Amplify workloads in dedicated accounts so IAM
    principals not working with Amplify do not manipulate provisioned resources
    out-of-band.
  </Callout>
);
