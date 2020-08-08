## Using Amplify GraphQL client

Each AppSync API is set with a __default__ authorization mode.

AWS AppSync also supports [multiple authorization modes on a single API](https://docs.aws.amazon.com/appsync/latest/devguide/security.html#using-additional-authorization-modes) enabling you to add additional authorization modes.

In order to use this feature with the Amplify GraphQL Client the `API.graphql({...})` function accepts an optional parameter called `authMode`, its value will be one of the supported auth modes:

- `API_KEY`
- `AWS_IAM`
- `OPENID_CONNECT`
- `AMAZON_COGNITO_USER_POOLS`

<br />

This is an example of using `AWS_IAM` as an authorization mode:

```javascript
// Creating a post is restricted to IAM 
const createdTodo = await API.graphql({
  query: queries.createTodo,
  variables: {input: todoDetails},
  authMode: 'AWS_IAM'
});
```

Previous examples uses `graphqlOperation` function. That function only creates an object with two attributes `query` and `variables`. In order to use `authMode` you need to pass this object as is mentioned on the previous example.

<amplify-callout>

When using __AWS_IAM__ for public API access, unauthenticated logins must be enabled. To enable unauthenticated logins, run `amplify update auth` from the command line and choose __Walkthrough all the auth configurations__.

</amplify-callout>

## Using AWS AppSync SDK

For client authorization, AppSync supports API Keys, Amazon IAM credentials (we recommend using Amazon Cognito Identity Pools for this option), Amazon Cognito User Pools, and 3rd party OIDC providers. This is inferred from the `aws-exports.js` when you call `.awsConfiguration()` on the `AWSAppSyncClient` builder.

### API Key

API Key is the easiest way to set up and prototype your application with AppSync. It’s also a good option if your application is completely public. If your application needs to interact with other AWS services besides AppSync, such as S3, you will need to use IAM credentials provided by Cognito Identity Pools, which also supports “Guest” access. See the authentication section for more details. Following code snippet shows how to configure `AWSAppSyncClient` using API Key:

```js
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import awsconfig from './aws-exports';

const client = new AWSAppSyncClient({
  url: awsconfig.aws_appsync_graphqlEndpoint,
  region: awsconfig.aws_appsync_region,
  auth: {
    type: AUTH_TYPE.API_KEY,
    apiKey: awsconfig.aws_appsync_apiKey,
  },
});
```


### Cognito User Pools

Amazon Cognito User Pools is the most common service to use with AppSync when adding user Sign-Up and Sign-In to your application. If your application needs to interact with other AWS services besides AppSync, such as S3, you will need to use IAM credentials with Cognito Identity Pools. The Amplify CLI can automatically configure this for you when running `amplify add auth` and can also automatically federate User Pools with Identity Pools. This allows you to have both User Pool credentials for AppSync and AWS credentials for S3. You can then use the Auth category for automatic credentials refresh as [outlined in the authentication section](~/lib/auth/getting-started.md). Following code snippet shows how to configure `AWSAppSyncClient` using Cognito User Pools:

```js
import Amplify, { Auth } from 'aws-amplify';
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

const client = new AWSAppSyncClient({
  url: awsconfig.aws_appsync_graphqlEndpoint,
  region: awsconfig.aws_appsync_region,
  auth: {
    type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
    jwtToken: async () => (await Auth.currentSession()).getIdToken().getJwtToken(),
  },
});
```

> **Note** In React, you can use amplify’s withAuthenticator:

```js
import { withAuthenticator } from 'aws-amplify-react';

export default withAuthenticator(App);
```

### IAM

When using AWS IAM in a mobile application you should leverage Amazon Cognito Identity Pools. The Amplify CLI will automatically configure this for you when running `amplify add auth`. You can then use the Auth category for automatic credentials refresh as [outlined in the authentication section](~/lib/auth/getting-started.md). Following code snippet shows how to configure `AWSAppSyncClient` using AWS IAM:

```js
import Amplify, { Auth } from 'aws-amplify';
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

const client = new AWSAppSyncClient({
  url: awsconfig.aws_appsync_graphqlEndpoint,
  region: awsconfig.aws_appsync_region,
  auth: {
    type: AUTH_TYPE.AWS_IAM,
    credentials: () => Auth.currentCredentials(),
  },
});
```

> **Note** In React, you can use amplify’s withAuthenticator:

```js
import { withAuthenticator } from 'aws-amplify-react';

export default withAuthenticator(App);
```

### OIDC

If you are using a 3rd party OIDC provider you will need to configure it and manage the details of token refreshes yourself. Following code snippet shows how to configure `AWSAppSyncClient` using OIDC:


```js
import Amplify, { Auth } from 'aws-amplify';
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

const getOIDCToken = async () => await 'token'; // Should be an async function that handles token refresh

const client = new AWSAppSyncClient({
  url: awsconfig.aws_appsync_graphqlEndpoint,
  region: awsconfig.aws_appsync_region,
  auth: {
    type: AUTH_TYPE.OPENID_CONNECT,
    jwtToken: () => getOIDCToken(),
  },
});
```
