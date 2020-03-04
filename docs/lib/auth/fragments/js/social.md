## OAuth and Federation Overview

[OAuth 2.0](https://en.wikipedia.org/wiki/OAuth) is the common Authorization framework used by web and mobile applications for getting access to user information ("scopes") in a limited manner. Common analogies you will hear in OAuth is that of boarding a plane or staying in a hotel - showing your identification is the Authentication piece (signing into an app) and using the boarding pass/hotel key is what you are Authorized to access.

OAuth support in Amplify uses Cognito User Pools and supports federation with social providers, which will automatically create a corresponding user in the User Pool after a login. [OIDC](https://en.wikipedia.org/wiki/OpenID_Connect) tokens are available in the app after the application has completed this process.

## Setup social provider

Before adding a social provider to an Amplify project, you must first go to that provider and configure an application identifier as outlined below.

- [Facebook Instructions](./cognito-hosted-ui-federated-identity#facebook-instructions)
- [Google Sign-In Instructions](./cognito-hosted-ui-federated-identity#google-sign-in-instructions)
- [Amazon Login Instructions](./cognito-hosted-ui-federated-identity#amazon-login-instructions)

## Setup Amplify auth backend

Once you have the social provider configured, run the following in your project’s root folder:

```bash
$ amplify add auth     ##"amplify update auth" if already configured
```
Select Default configuration with Social Provider (Federation):

```bash
Do you want to use the default authentication and security configuration? 
  Default configuration 
❯ Default configuration with Social Provider (Federation) 
  Manual configuration 
  I want to learn more.
```

### Sign-in redirect URIs

For *Sign in Redirect URI(s)* inputs, you can put one URI for local development and one for production. Example: `http://localhost:3000/` in dev and `https://www.example.com/` in production. The same is true for *Sign out redirect URI(s)*.
{: .callout .callout--info}

For React Native applications, You need to define a custom URL scheme for your application before testing locally or publishing to the app store. This is different for Expo or vanilla React Native. Follow the steps at the [React Native Linking docs](https://facebook.github.io/react-native/docs/linking) or [Expo Linking docs](https://docs.expo.io/versions/latest/workflow/linking/) for more information. After completing those steps, assuming you are using "myapp" as the name of your URL Scheme (or whatever friendly name you have chosen), you will use these URLs as *Sign in Redirect URI(s)* and/or *Sign out redirect URI(s)* inputs. Your URIs could look like any of these:

- `myapp://`
- `exp://127.0.0.1:19000/--/` (Local development if your app is running [in the Expo client](https://docs.expo.io/versions/latest/workflow/linking/#linking-to-your-app)).

Log back in to your social provider settings and update the app domain (e.g. `https://<your-user-pool-domain`).

## Setup frontend

After configuring the OAuth endpoints, you can use them or the Hosted UI with `Auth.federatedSignIn()`. Passing *LoginWithAmazon*, *Facebook*, or *Google* will bypass the Hosted UI and federate immediately with the social provider as shown in the below React example. If you are looking to add a custom state, you are able to do so by passing a `string`
(e.g. `Auth.federatedSignIn({ customState: 'xyz' })`) value and listening for the custom state via Hub

```javascript
import Amplify, { Auth, Hub } from 'aws-amplify';
import awsconfig from './aws_exports';
Amplify.configure(awsconfig);


class App extends Component {
  state = { user: null, customState: null };

  componentDidMount() {
    Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
          this.setState({ user: data });
          break;
        case "signOut":
          this.setState({ user: null });
          break;
        case "customOAuthState":
          this.setState({ customState: data });
      }
    });

    Auth.currentAuthenticatedUser()
      .then(user => this.setState({ user }))
      .catch(() => console.log("Not signed in"));
  }

  render() {
    const { user } = this.state;

    return (
      <div className="App">
        <button onClick={() => Auth.federatedSignIn({provider: 'Facebook'})}>Open Facebook</button>
        <button onClick={() => Auth.federatedSignIn({provider: 'Google'})}>Open Google</button>
        <button onClick={() => Auth.federatedSignIn()}>Open Hosted UI</button>
        <button onClick={() => Auth.signOut()}>Sign Out {user.getUsername()}</button>
      </div>
    );
  }
}
```

### React Components

When using React and React Native, Amplify provides a `withOAuth` Higher Order Component (HOC) to launch the Hosted UI or bypass and use the social providers directly. The HOCs differ slightly and there are specifics outlined below.

```javascript
import React, { Component } from 'react';
import { withOAuth } from 'aws-amplify-react';


// inside an async function
// Run this after the sign-in
const federatedInfo = await Cache.getItem('federatedInfo');
const { token } = federatedInfo;
```

### Refreshing JWT Tokens

By default, AWS Amplify will automatically refresh the tokens for Google and Facebook when the app is in the web environment, so that your AWS credentials will be valid at all times. But if you are using another federated provider, or the app is running in React Native, you will need to provide your own token refresh method:
```javascript
import { Auth } from 'aws-amplify';

function refreshToken() {
    // refresh the token here and get the new token info
    // ......

    return new Promise(res, rej => {
        const data = {
            token, // the token from the provider
            expires_at, // the timestamp for the expiration
            identity_id, // optional, the identityId for the credentials
        }
        res(data);
    });

class MyApp extends Component {
    // ...
    render() {
        return(
            <button onClick={this.props.OAuthSignIn}>
                Sign in with AWS
            </button>
        )
    }
}

export default withOAuth(MyApp);
```

After being redirected back to your app, you can use the [Hub module]({%if jekyll.environment == 'production'%}{{site.amplify.docs_baseurl}}{%endif%}/js/hub#listening-authentication-events) to detect whether the user is signed in or not.

```javascript
import Amplify, { Hub } from 'aws-amplify';

// in your redirected sign in page
// when the page is loaded, run the following function
Hub.listen('auth', (data) => {
    switch (data.payload.event) {
        case 'signIn':
            console.log('now the user is signed in');
            const user = data.payload.data;
            break;
        case 'signIn_failure':
            console.log('the user failed to sign in');
            console.log('the error is', data.payload.data);
            break;
        default:
            break;
    }
});
```

### Full React Sample

```js
// OAuthButton.js
import { withOAuth } from 'aws-amplify-react';
import React, { Component } from 'react';

class OAuthButton extends Component {
  render() {
    return (
      <button onClick={this.props.OAuthSignIn}>
        Sign in with AWS
      </button>
    )
  }
}

export default withOAuth(OAuthButton);

// App.js
import React, { Component } from 'react';
import './App.css';
import OAuthButton from './OAuthButton';
import Amplify, { Auth, Hub } from 'aws-amplify';
import awsconfig from './aws-exports'; // your Amplify configuration

// your Cognito Hosted UI configuration
const oauth = {
  domain: 'your_cognito_domain',
  scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
  redirectSignIn: 'http://localhost:3000/',
  redirectSignOut: 'http://localhost:3000/',
  responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
};

Amplify.configure(awsconfig);
Auth.configure({ oauth });

class App extends Component {
  constructor(props) {
    super(props);
    this.signOut = this.signOut.bind(this);
    // let the Hub module listen on Auth events
    Hub.listen('auth', (data) => {
        switch (data.payload.event) {
            case 'signIn':
                this.setState({authState: 'signedIn', authData: data.payload.data});
                break;
            case 'signIn_failure':
                this.setState({authState: 'signIn', authData: null, authError: data.payload.data});
                break;
            default:
                break;
        }
    });
    this.state = {
      authState: 'loading',
      authData: null,
      authError: null
    }
  }

  componentDidMount() {
    console.log('on component mount');
    // check the current user when the App component is loaded
    Auth.currentAuthenticatedUser().then(user => {
      console.log(user);
      this.setState({authState: 'signedIn'});
    }).catch(e => {
      console.log(e);
      this.setState({authState: 'signIn'});
    });
  }

  signOut() {
    Auth.signOut().then(() => {
      this.setState({authState: 'signIn'});
    }).catch(e => {
      console.log(e);
    });
  }

  render() {
    const { authState } = this.state;
    return (
      <div className="App">
        {authState === 'loading' && (<div>loading...</div>)}
        {authState === 'signIn' && <OAuthButton/>}
        {authState === 'signedIn' && <button onClick={this.signOut}>Sign out</button>}
      </div>
    );
  }
}

export default App;
```

With React Native, you can use `withOAuth` HOC to launch the hosted UI experience. Just wrap your app's main component with our HOC. Doing so, will pass the following `props` available to your component:

- `oAuthUser`: If the sign was successful, this object will have the user from the user pool.
- `oAuthError`: In case of an error, the string with the error as given by the Cognito Hosted UI.

- `hostedUISignIn`: A callback function to trigger the hosted UI sign in flow, this will show the Cognito Hosted UI.

- `signOut`: A callback function to trigger the hosted UI sign out flow.

The following `props` are used for building a custom UI with buttons if you do not want to show the Cognito UI, however it will still create a User Pool entry once the OAuth flow has completed.
{: .callout .callout--info}

- `facebookSignIn`: A callback function to trigger the hosted UI sign in flow for Facebook, this will show the Facebook login page.
- `googleSignIn`: A callback function to trigger the hosted UI sign in flow for Google, this will show the Google login page.
- `amazonSignIn`: A callback function to trigger the hosted UI sign in flow for LoginWithAmazon, this will show the LoginWithAmazon login page.
- `customProviderSignIn`: A callback function to trigger the hosted UI sign in flow for an OIDC provider, this will show the OIDC provider login page. This function expects a string with the **provider name** specified when [adding the OIDC  IdP to your User Pool](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools-oidc-idp.html#cognito-user-pools-oidc-idp-step-2).

To use `withOAuth` in your React Native application first install the appropriate dependencies:

```bash

yarn add aws-amplify-react-native aws-amplify 
# npm install aws-amplify-react-native aws-amplify
```

The following code snippet shows an example of its possible usage:

```javascript
import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, SafeAreaView, StatusBar, Button } from 'react-native';
import { default as Amplify } from "aws-amplify";
import { withOAuth } from "aws-amplify-react-native";
import { default as awsConfig } from "./aws-exports";

Amplify.configure(awsConfig);

Amplify.configure({
    Auth: {
        oauth: {
            // OAuth config...
        }
    },
});


class App extends Component {
  render() {
    const {
      oAuthUser: user,
      oAuthError: error,
      hostedUISignIn,
      facebookSignIn,
      googleSignIn,
      amazonSignIn,
      customProviderSignIn,
      signOut,
    } = this.props;

    return (
      <SafeAreaView style={styles.safeArea}>
        {user && <Button title="Sign Out" onPress={signOut} icon='logout' />}
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <Text>{JSON.stringify({ user, error, }, null, 2)}</Text>
          {!user && <React.Fragment>
            {/* Go to the Cognito Hosted UI */}
            <Button title="Cognito" onPress={hostedUISignIn} />

            {/* Go directly to a configured identity provider */}
            <Button title="Facebook" onPress={facebookSignIn} />
            <Button title="Google" onPress={googleSignIn}  />
            <Button title="Amazon" onPress={amazonSignIn} />

            {/* e.g. for OIDC providers */}
            <Button title="Yahoo" onPress={() => customProviderSignIn('Yahoo')} />
          </React.Fragment>}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flexGrow: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#FFFFFF',
  },
  scrollViewContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default withOAuth(App);
``` 

### Hosted UI with Expo

It is possible to use Expo's `WebBrowser.openAuthSessionAsync` function to launch the hosted UI pages. To do this, you can provide a `urlOpener` function as below when configuring OAuth in Amplify:

```javascript
import Amplify from 'aws-amplify';

const urlOpener = async (url, redirectUrl) => {
    // On Expo, use WebBrowser.openAuthSessionAsync to open the Hosted UI pages.
    const { type, url: newUrl } = await WebBrowser.openAuthSessionAsync(url, redirectUrl);

    if (type === 'success') {
        await WebBrowser.dismissBrowser();

        if (Platform.OS === 'ios') {
        return Linking.openURL(newUrl);
        }
    }
};

const oauth = {
    // Domain name
    domain : 'your-domain-prefix.auth.us-east-1.amazoncognito.com', 

    // Authorized scopes
    scope : ['phone', 'email', 'profile', 'openid','aws.cognito.signin.user.admin'], 

    // Callback URL
    redirectSignIn : 'http://www.example.com/signin/', // or 'exp://127.0.0.1:19000/--/', 'myapp://main/'

    // Sign out URL
    redirectSignOut : 'http://www.example.com/signout/', // or 'exp://127.0.0.1:19000/--/', 'myapp://main/'

    // 'code' for Authorization code grant, 
    // 'token' for Implicit grant
    // Note that REFRESH token will only be generated when the responseType is code
    responseType: 'code',

    // optional, for Cognito hosted ui specified options
    options: {
        // Indicates if the data collection is enabled to support Cognito advanced security features. By default, this flag is set to true.
        AdvancedSecurityDataCollectionFlag : true
    },

    urlOpener: urlOpener
}

Amplify.configure({
    Auth: {
        // other configurations...
        // ....
        oauth: oauth
    },
    // ...
});
```