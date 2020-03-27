```js
import React from 'react';
import Amplify from 'aws-amplify';
import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

const App = () => (
  <AmplifyAuthenticator usernameAlias="email">
    <div>
      My App
      <AmplifySignOut />
    </div>
  </AmplifyAuthenticator>;
);
```