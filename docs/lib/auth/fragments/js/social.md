## OAuth and Federation Overview

[OAuth 2.0](https://en.wikipedia.org/wiki/OAuth) is the common Authorization framework used by web and mobile applications for getting access to user information ("scopes") in a limited manner. Common analogies you will hear in OAuth is that of boarding a plane or staying in a hotel - showing your identification is the Authentication piece (signing into an app) and using the boarding pass/hotel key is what you are Authorized to access.

OAuth support in Amplify uses Cognito User Pools and supports federation with social providers, which will automatically create a corresponding user in the User Pool after a login. [OIDC](https://en.wikipedia.org/wiki/OpenID_Connect) tokens are available in the app after the application has completed this process.

<inline-fragment src="~/lib/auth/fragments/common/social_signin_web_ui/setup_auth_provider.md"></inline-fragment>

## Configure Auth Category

Once you have the social provider configured, run the following in your project’s root folder:

```bash
amplify add auth     ## "amplify update auth" if already configured
```

Select Default configuration with Social Provider (Federation):

```console
Do you want to use the default authentication and security configuration? 
  Default configuration 
❯ Default configuration with Social Provider (Federation) 
  Manual configuration 
  I want to learn more.
```

For *Sign in Redirect URI(s)* inputs, you can put one URI for local development and one for production. Example: `http://localhost:3000/` in dev and `https://www.example.com/` in production. The same is true for *Sign out redirect URI(s)*.

<amplify-callout>

For **React Native** applications, You need to define a custom URL scheme for your application before testing locally or publishing to the app store. This is different for Expo or vanilla React Native. Follow the steps at the [React Native Linking docs](https://facebook.github.io/react-native/docs/linking) or [Expo Linking docs](https://docs.expo.io/versions/latest/workflow/linking/) for more information. After completing those steps, assuming you are using "myapp" as the name of your URL Scheme (or whatever friendly name you have chosen), you will use these URLs as *Sign in Redirect URI(s)* and/or *Sign out redirect URI(s)* inputs. Your URIs could look like any of these:

- `myapp://`
- `exp://127.0.0.1:19000/--/` (Local development if your app is running [in the Expo client](https://docs.expo.io/versions/latest/workflow/linking/#linking-to-your-app)).

</amplify-callout>

<inline-fragment src="~/lib/auth/fragments/common/social_signin_web_ui/configure_auth_category.md"></inline-fragment>

## Setup frontend

After configuring the OAuth endpoints, you can use them or the Hosted UI with `Auth.federatedSignIn()`. Passing `LoginWithAmazon`, `Facebook`, `Google`, or `SignInWithApple` will bypass the Hosted UI and federate immediately with the social provider as shown in the below React example. If you are looking to add a custom state, you are able to do so by passing a string (e.g. `Auth.federatedSignIn({ customState: 'xyz' })`) value and listening for the custom state via Hub.

```javascript
import Amplify, { Auth, Hub } from 'aws-amplify';
import awsconfig from './aws-exports';
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

TODO Remove whatever we can from these sections

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

After being redirected back to your app, you can use the [Hub module](~/lib/utilities/hub.md#authentication-events) to detect whether the user is signed in or not.

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

### Full Samples

<amplify-block-switcher>

<amplify-block name="React">

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
</amplify-block>

<amplify-block name="React Native">

<amplify-callout>

**Note for iOS Apps**

In order for Amplify to listen for data from Cognito when linking back to your app, you will need to setup the `Linking` module in `AppDelegate.m` (see [React Native docs](https://reactnative.dev/docs/linking#enabling-deep-links) for more information):

```objective-c
#import <React/RCTLinkingManager.h>

- (BOOL)application:(UIApplication *)application
   openURL:(NSURL *)url
   options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
  return [RCTLinkingManager application:application openURL:url options:options];
}
```
</amplify-callout>

**In-App Browser Setup (optional, but recommended)**

By default, Amplify will opened the Cognito Hosted UI in Safari/Chrome, but you can override that behavior by providing a custom `urlOpener`. The sample below uses [react-native-inappbrowser-reborn](https://github.com/proyecto26/react-native-inappbrowser), but you can use any other in-app browser available.

**Sample**

```js
import React, { useEffect, useState } from 'react';
import { Button, Linking, Text, View } from 'react-native';
import Amplify, { Auth, Hub } from 'aws-amplify';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import awsconfig from './aws-exports';

async function urlOpener(url, redirectUrl) {
  await InAppBrowser.isAvailable();
  const { type, url: newUrl } = await InAppBrowser.openAuth(url, redirectUrl, {
    showTitle: false,
    enableUrlBarHiding: true,
    enableDefaultShare: false,
    ephemeralWebSession: false,
  });

  if (type === 'success') {
    Linking.openURL(newUrl);
  }
}

Amplify.configure({
  ...awsconfig,
  oauth: {
    ...awsconfig.oauth,
    urlOpener,
  },
});

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
        case 'cognitoHostedUI':
          getUser().then(userData => setUser(userData));
          break;
        case 'signOut':
          setUser(null);
          break;
        case 'signIn_failure':
        case 'cognitoHostedUI_failure':
          console.log('Sign in failure', data);
          break;
      }
    });

    getUser().then(userData => setUser(userData));
  }, []);

  function getUser() {
    return Auth.currentAuthenticatedUser()
      .then(userData => userData)
      .catch(() => console.log('Not signed in'));
  }
  return (
    <View>
      <Text>User: {user ? JSON.stringify(user.attributes) : 'None'}</Text>
      {user ? (
        <Button title="Sign Out" onPress={() => Auth.signOut()} />
      ) : (
        <Button title="Google Sign In" onPress={() => Auth.federatedSignIn()} />
      )}
    </View>
  );
}

export default App;
```

<inline-fragment src="~/lib/auth/fragments/js/react-native-withoauth.md"></inline-fragment>

</amplify-block>

<amplify-block name="Expo">

**In-App Browser Setup (optional, but recommended)**

By default, Amplify will opened the Cognito Hosted UI in Safari/Chrome, but you can override that behavior by providing a custom `urlOpener`. The sample below uses Expo's [WebBrowser.openAuthSessionAsync](https://docs.expo.io/versions/v37.0.0/sdk/webbrowser/).

**Sample**

```js
import React, { useEffect, useState } from 'react';
import { Button, Linking, Platform, Text, View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import Amplify, { Auth, Hub } from 'aws-amplify';
import awsconfig from './aws-exports';

async function urlOpener(url, redirectUrl) {
	const { type, url: newUrl } = await WebBrowser.openAuthSessionAsync(
		url,
		redirectUrl
	);

	if (type === 'success' && Platform.OS === 'ios') {
		WebBrowser.dismissBrowser();
		return Linking.openURL(newUrl);
	}
}

Amplify.configure({
	...awsconfig,
	oauth: {
		...awsconfig.oauth,
		urlOpener,
	},
});

function App() {
	const [user, setUser] = useState(null);

	useEffect(() => {
		Hub.listen('auth', ({ payload: { event, data } }) => {
			switch (event) {
				case 'signIn':
					getUser().then((userData) => setUser(userData));
					break;
				case 'signOut':
					setUser(null);
					break;
				case 'signIn_failure':
				case 'cognitoHostedUI_failure':
					console.log('Sign in failure', data);
					break;
			}
		});

		getUser().then((userData) => setUser(userData));
	}, []);

	function getUser() {
		return Auth.currentAuthenticatedUser()
			.then((userData) => userData)
			.catch(() => console.log('Not signed in'));
	}

	return (
		<View>
			<Text>User: {user ? JSON.stringify(user.attributes) : 'None'}</Text>
			{user ? (
				<Button title="Sign Out" onPress={() => Auth.signOut()} />
			) : (
				<Button title="Google Sign In" onPress={() => Auth.federatedSignIn()} />
			)}
		</View>
	);
}

export default App;

```

<inline-fragment src="~/lib/auth/fragments/js/react-native-withoauth.md"></inline-fragment>

</amplify-block>

</amplify-block-switcher>
