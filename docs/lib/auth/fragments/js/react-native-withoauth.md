**withOAuth Higher-Order Component (HOC)**

With React Native & Expo, you can also use the `withOAuth` HOC to launch the Cognito Hosted UI experience. Just wrap your app's main component with our HOC. Doing so, will pass the following `props` available to your component:

- `oAuthUser`: If the sign was successful, this object will have the user from the user pool.
- `oAuthError`: In case of an error, the string with the error as given by the Cognito Hosted UI.
- `hostedUISignIn`: A callback function to trigger the hosted UI sign in flow, this will show the Cognito Hosted UI.
- `signOut`: A callback function to trigger the hosted UI sign out flow.

<amplify-callout>

The following `props` are used for building a custom UI with buttons if you do not want to show the Cognito UI, however it will still create a User Pool entry once the OAuth flow has completed.

</amplify-callout>

- `facebookSignIn`: A callback function to trigger the hosted UI sign in flow for Facebook, this will show the Facebook login page.
- `googleSignIn`: A callback function to trigger the hosted UI sign in flow for Google, this will show the Google login page.
- `amazonSignIn`: A callback function to trigger the hosted UI sign in flow for LoginWithAmazon, this will show the LoginWithAmazon login page.
- `customProviderSignIn`: A callback function to trigger the hosted UI sign in flow for an OIDC provider, this will show the OIDC provider login page. This function expects a string with the **provider name** specified when [adding the OIDC  IdP to your User Pool](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools-oidc-idp.html#cognito-user-pools-oidc-idp-step-2).

To use `withOAuth` in your React Native application first install the appropriate dependencies:

```terminal
yarn add aws-amplify-react-native aws-amplify 
```

The following code snippet shows an example of its possible usage:

<amplify-callout>

Although `urlOpener` is left out of this sample for brevity, it is still recommended to use the custom example from above in this `withOAuth` sample.

</amplify-callout>

```javascript
import React from 'react';
import { Button, Text, View } from 'react-native';
import Amplify, { Auth, Hub } from 'aws-amplify';
import { withOAuth } from "aws-amplify-react-native";
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

function App(props) {
    const {
      oAuthUser,
      oAuthError,
      hostedUISignIn,
      facebookSignIn,
      googleSignIn,
      amazonSignIn,
      customProviderSignIn,
      signOut,
    } = props;

  return (
    <View>
        <Text>User: {oAuthUser ? JSON.stringify(oAuthUser.attributes) : 'None'}</Text>
        {oAuthUser ? (
            <Button title="Sign Out" onPress={signOut} />
        ) : (
            <>
                {/* Go to the Cognito Hosted UI */}
                <Button title="Cognito" onPress={hostedUISignIn} />

                {/* Go directly to a configured identity provider */}
                <Button title="Facebook" onPress={facebookSignIn} />
                <Button title="Google" onPress={googleSignIn}  />
                <Button title="Amazon" onPress={amazonSignIn} />

                {/* e.g. for OIDC providers */}
                <Button title="Yahoo" onPress={() => customProviderSignIn('Yahoo')} />
            </>
        )}
    </View>
  );
}

export default withOAuth(App);
``` 