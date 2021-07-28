## Configure Lambda Authorizers with DataStore

You can implement your own API authorization logic using an AWS Lambda function. To add a Lambda authorizer as an authentication mode for you AppSync API, please see the Settings section of the AppSync console.

You will need to manage the details of token refreshes in your application code yourself. 

When using Lambda authorizers with DataStore here's how you can specify a function for handling token refresh:

```js
import { DataStore } from 'aws-amplify';

DataStore.configure({
  authProviders: {
    functionAuthProvider: async () => {
      const authToken = await refreshAuthToken(); // refreshAuthToken 
      
      return {
        token: authToken
      }
    },
  }
});
```