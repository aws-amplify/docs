## Subscribing Events

You can take specific actions when users sign-in or sign-out by subscribing authentication events in your app. Please see our [Hub Module Developer Guide](~/lib/utilities/hub.md) for more information.

## Identity Pool Federation

You can alternatively use `Auth.federatedSignIn()` to get AWS credentials directly from Cognito Federated Identities and not use User Pool federation. If you have logged in with `Auth.signIn()` you **can not** call  `Auth.federatedSignIn()` as Amplify will perform this federation automatically for you in the background.

In general, if you are using Cognito User Pools to manage user Sign-Up and Sign-In, you should only call `Auth.federatedSignIn()` when using OAuth flows or the Hosted UI.

```js
import { Auth } from 'aws-amplify';

// To derive necessary data from the provider
const {
    token, // the token you get from the provider
    domainOrProviderName, // Either the domain of the provider(e.g. accounts.your-openid-provider.com) or the provider name, for now the library only supports 'google', 'facebook', 'amazon', 'developer'
    expiresIn, // the time in ms which describes how long the token could live
    user,  // the user object you defined, e.g. { username, email, phone_number }
    identity_id // Optional, the identity id specified by the provider
} = getFromProvider(); // arbitrary function

Auth.federatedSignIn(
    domain,
    {
        token,
        identity_id, // Optional
        expires_at: expiresIn * 1000 + new Date().getTime() // the expiration timestamp
    },
    user
).then(cred => {
    // If success, you will get the AWS credentials
    console.log(cred);
    return Auth.currentAuthenticatedUser();
}).then(user => {
    // If success, the user object you passed in Auth.federatedSignIn
    console.log(user);
}).catch(e => {
    console.log(e)
});
```

<amplify-callout>
Note that this isn't from a Cognito User Pool so the user you get after calling this method is not a *Cognito User*.
</amplify-callout>

### Facebook sign-in (React)

```js
import React, { useEffect } from 'react';
import { Auth } from 'aws-amplify';
// To federated sign in from Facebook
const SignInWithFacebook = () => {

    useEffect(() => {
        if (!window.FB) createScript();
    }, [])

    const signIn = () => {
        const fb = window.FB;
        fb.getLoginStatus(response => {
            if (response.status === 'connected') {
                getAWSCredentials(response.authResponse);
            } else {
                fb.login(
                    response => {
                        if (!response || !response.authResponse) {
                            return;
                        }
                        getAWSCredentials(response.authResponse);
                    },
                    {
                        // the authorized scopes
                        scope: 'public_profile,email'
                    }
                );
            }
        });
    }

    const getAWSCredentials = (response) => {
            const { accessToken, expiresIn } = response;
            const date = new Date();
            const expires_at = expiresIn * 1000 + date.getTime();
            if (!accessToken) {
                return;
            }

            const fb = window.FB;
            fb.api('/me', { fields: 'name,email' }, response => {
                const user = {
                    name: response.name,
                    email: response.email
                };
                
                Auth.federatedSignIn('facebook', { token: accessToken, expires_at }, user)
                .then(credentials => {
                    console.log(credentials);
                });
            });
        }

    const createScript = () => {
        // load the sdk
        window.fbAsyncInit = fbAsyncInit;
        const script = document.createElement('script');
        script.src = 'https://connect.facebook.net/en_US/sdk.js';
        script.async = true;
        script.onload = initFB;
        document.body.appendChild(script);
    }

    const initFB = () => {
        const fb = window.FB;
        console.log('FB SDK initialized');
    }

    const fbAsyncInit = () => {
        // init the fb sdk client
        const fb = window.FB;
        fb.init({
            appId   : 'your_facebook_app_id',
            cookie  : true,
            xfbml   : true,
            version : 'v2.11'
        });
    }
   
    return (
        <div>
            <button onClick={signIn}>Sign in with Facebook</button>
        </div>
    );
}
```
### Facebook Sign-in (React Native - Expo)

```javascript
import Expo from 'expo';
import React from 'react';
import Amplify, { Auth } from 'aws-amplify';

const App = () => {
  const signIn = async () => {
    const { type, token, expires } = await Expo.Facebook.logInWithReadPermissionsAsync('YOUR_FACEBOOK_APP_ID', {
        permissions: ['public_profile'],
      });
    if (type === 'success') {
      // sign in with federated identity
      Auth.federatedSignIn('facebook', { token, expires_at: expires}, { name: 'USER_NAME' })
        .then(credentials => {
          console.log('get aws credentials', credentials);
        }).catch(e => {
          console.log(e);
        });
    }
  }

  // ...

  return (
    <View style={styles.container}>
      <Button title="FBSignIn" onPress={signIn} />
    </View>
  );

}
```

### Google sign-in (React)

```js
import React, { useEffect } from 'react';
import { Auth } from 'aws-amplify';
// To federated sign in from Google
const SignInWithGoogle = () => {

    useEffect(() => {
        const ga = window.gapi && window.gapi.auth2 ? 
            window.gapi.auth2.getAuthInstance() : 
            null;

        if (!ga) createScript();
    }, [])

    const signIn = () => {
        const ga = window.gapi.auth2.getAuthInstance();
        ga.signIn().then(
            googleUser => {
                getAWSCredentials(googleUser);
            },
            error => {
                console.log(error);
            }
        );
    }

    const getAWSCredentials = async (googleUser) => {
        const { id_token, expires_at } = googleUser.getAuthResponse();
        const profile = googleUser.getBasicProfile();
        let user = {
            email: profile.getEmail(),
            name: profile.getName()
        };
        
        const credentials = await Auth.federatedSignIn(
            'google',
            { token: id_token, expires_at },
            user
        );
        console.log('credentials', credentials);
    }

    const createScript = () => {
        // load the Google SDK
        const script = document.createElement('script');
        script.src = 'https://apis.google.com/js/platform.js';
        script.async = true;
        script.onload = initGapi;
        document.body.appendChild(script);
    }

    const initGapi = () => {
        // init the Google SDK client
        const g = window.gapi;
        g.load('auth2', function() {
            g.auth2.init({
                client_id: 'your_google_client_id',
                // authorized scopes
                scope: 'profile email openid'
            });
        });
    }

    return (
        <div>
            <button onClick={signIn}>Sign in with Google</button>
        </div>
    );
}
```

### Using Amplify UI components

To enable social sign-in in your app with Identity Pools, add `Google client_id`, `Facebook app_id` and/or `Amazon client_id` properties to `Authenticator` component. This will create a sign in button when rendering the `Authenticator` in your app.

```javascript
import { Authenticator } from 'aws-amplify-react/dist/Auth';

const federated = {
    google_client_id: '',
    facebook_app_id: '',
    amazon_client_id: ''
};

return (
    <Authenticator federated={federated}>
)
```

Or you can use it with `withAuthenticator`:
```js
const AppWithAuth = withAuthenticator(App);

const federated = {
    google_client_id: '', // Enter your google_client_id here
    facebook_app_id: '', // Enter your facebook_app_id here
    amazon_client_id: '' // Enter your amazon_client_id here
};

ReactDOM.render(<AppWithAuth federated={federated}/>, document.getElementById('root'));
```

### Retrieve JWT Tokens

After the federated login, you can retrieve related JWT tokens from the local cache using the *Cache* module:

#### Browser sample

```javascript
import { Cache } from 'aws-amplify';

// Run this after the sign-in
const federatedInfo = Cache.getItem('federatedInfo');
const { token } = federatedInfo;
```

### React Native sample 

```javascript
import { Cache } from 'aws-amplify';

// inside an async function
// Run this after the sign-in
const federatedInfo = await Cache.getItem('federatedInfo');
const { token } = federatedInfo;
```

### Token Refresh

By default, Amplify will automatically refresh the tokens for Google and Facebook, so that your AWS credentials will be valid at all times. But if you are using another federated provider, you will need to provide your own token refresh method:

<amplify-callout>
Note: Automatic token refresh is not supported in React Native.
</amplify-callout>

#### JWT Token Refresh sample

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
}

Auth.configure({
    refreshHandlers: {
        'developer': refreshToken // the property could be 'google', 'facebook', 'amazon', 'developer', OpenId domain
    }
})
```


### Federate with Auth0

You can use `Auth0` as one of the providers of your Cognito Identity Pool. This will allow users authenticated via Auth0 have access to your AWS resources.

Step 1. [Follow Auth0 integration instructions for Cognito Federated Identity Pools](https://auth0.com/docs/integrations/integrating-auth0-amazon-cognito-mobile-apps)

Step 2. Login with `Auth0`, then use the id token returned to get AWS credentials from `Cognito Federated Identity Pools` using `Auth.federatedSignIn`:

```js
const { idToken, domain, name, email, phoneNumber } = getFromAuth0(); // get the user credentials and info from auth0
const { exp } = decodeJWTToken(idToken); // Please decode the id token in order to get the expiration time

Auth.federatedSignIn(
    domain, // The Auth0 Domain,
    {
        token: idToken, // The id token from Auth0
        // expires_at means the timestamp when the token provided expires,
        // here we can derive it from the expiresIn parameter provided,
        // then convert its unit from second to millisecond, and add the current timestamp
        expires_at: exp * 1000 // the expiration timestamp
    },
    { 
        // the user object, you can put whatever property you get from the Auth0
        // for example:
        name, // the user name
        email, // Optional, the email address
        phoneNumber, // Optional, the phone number
    } 
).then(cred => {
    console.log(cred);
});
```

Step 3. Get the current user and current Credentials:

```js
Auth.currentAuthenticatedUser().then(user => console.log(user));
Auth.currentCredentials().then(creds => console.log(creds));
// Auth.currentSession() does not currently support federated identities. Please store the auth0 session info manually(for example, store tokens into the local storage).
```

Step 4. You can pass a refresh handler to the Auth module to refresh the id token from `Auth0`:

```js
function refreshToken() {
    // refresh the token here and get the new token info
    // ......

    return new Promise(res, rej => {
        const data = {
            token, // the token from the provider
            expires_at, // the timestamp when the token expires (in milliseconds)
            identity_id, // optional, the identityId for the credentials
        }
        res(data);
    });
}

Auth.configure({
    refreshHandlers: {
        'your_auth0_domain': refreshToken
    }
})
```

This feature is also integrated into `aws-amplify-react`:
```js
import { withAuthenticator } from 'aws-amplify-react';
import { Auth } from 'aws-amplify';

// auth0 configuration, more info in: https://auth0.com/docs/libraries/auth0js/v9#available-parameters
Auth.configure({
    auth0: {
        domain: 'your auth0 domain', 
        clientID: 'your client id',
        redirectUri: 'your call back url',
        audience: 'https://your_domain/userinfo',
        responseType: 'token id_token', // for now we only support implicit grant flow
        scope: 'openid profile email', // the scope used by your app
        returnTo: 'your sign out url'
    }
});

const App = () => { //... }

export default withAuthenticator(App);
```

Note: The code grant flow is not supported when using Auth0 with `aws-amplify-react` per [Auth0 documentation](https://auth0.com/docs/api-auth/tutorials/authorization-code-grant#2-exchange-the-authorization-code-for-an-access-token).

Alternatively you can use the `withAuth0` HOC:
```js
import { withAuth0 } from 'aws-amplify-react';
import { Auth } from 'aws-amplify';

Auth.configure({
    auth0: {
        domain: 'your auth0 domain', 
        clientID: 'your client id',
        redirectUri: 'your call back url',
        audience: 'https://your_domain/userinfo',
        responseType: 'token id_token', // for now we only support implicit grant flow
        scope: 'openid profile email', // the scope used by your app
        returnTo: 'your sign out url'
    }
});

const Button = (props) => (
    <div>
        <img
            onClick={props.auth0SignIn}
            src={auth0_icon}
        />
    </div>
);

export default withAuth0(Button);
```

## Lambda Triggers

The CLI allows you to configure [Lambda Triggers](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-identity-pools-working-with-aws-lambda-triggers.html) for your AWS Cognito User Pool.  These enable you to add custom functionality to your registration and authentication flows. [Read more](~/cli/function/function.md)

### Pre Authentication and Pre Sign-up Lambda triggers

If you have a Pre Sign-up or Pre Authentication Lambda trigger enabled, you can pass `validationData` as one the properties for `signUp` or `signIn`. This metadata can be used to implement additional validations around authentication, such as restricting the types of user accounts that can be registered.

```js
Auth.signIn({
    username, // Required, the username
    password, // Optional, the password
    validationData, // Optional, an array of key-value pairs which can contain any key and will be passed to your Lambda trigger as-is.
}).then(user => console.log(user))
  .catch(err => console.log(err));
```

### Passing metadata to other Lambda triggers

Many Cognito Lambda Triggers also accept unsanitized key/value pairs in the form of a `clientMetadata` attribute.  To configure a static set of key/value pairs, you can define a `clientMetadata` key in the `Auth.configure` function.  You can also pass a `clientMetadata` parameter to the various `Auth` functions which result in Cognito Lambda Trigger execution.

These functions include:

- `Auth.changePassword`
- `Auth.completeNewPassword`
- `Auth.confirmSignIn`
- `Auth.confirmSignUp`
- `Auth.forgotPasswordSubmit`
- `Auth.resendSignUp`
- `Auth.sendCustomChallengeAnswer`
- `Auth.signIn`
- `Auth.signUp`
- `Auth.updateUserAttributes`
- `Auth.verifyUserAttribute`

Please note that some of triggers which accept a `validationData` attribute will use `clientMetadata` as the value for `validationData`.  Exercise caution with using `clientMetadata` when you are relying on `validationData`.

## Working with AWS service objects

You can use AWS *Service Interface Objects* to work AWS Services in authenticated State. You can call methods on any AWS Service interface object by passing your credentials from `Auth` object to the service call constructor:

```javascript
import Route53 from 'aws-sdk/clients/route53';

Auth.currentCredentials()
  .then(credentials => {
    const route53 = new Route53({
      apiVersion: '2013-04-01',
      credentials: Auth.essentialCredentials(credentials)
    });

    // more code working with route53 object
    // route53.changeResourceRecordSets();
  })
```

Full API Documentation for Service Interface Objects is available [here](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/_index.html).

<amplify-callout warning>

Note: To work with Service Interface Objects, your Amazon Cognito users' [IAM role](https://docs.aws.amazon.com/cognito/latest/developerguide/iam-roles.html) must have the appropriate permissions to call the requested services.

</amplify-callout>

## API reference

For the complete API documentation for Authentication module, visit our [API Reference](https://aws-amplify.github.io/amplify-js/api/classes/authclass.html)
