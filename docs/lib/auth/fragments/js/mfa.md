MFA (Multi-factor authentication increases security for your app by adding an authentication method and not relying solely on the username (or alias) and password. AWS Amplify uses Amazon Cognito to provide MFA. Please see [Amazon Cognito Developer Guide](https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-settings-mfa.html) for more information about setting up MFA in Amazon Cognito.

Once you enable MFA on Amazon Cognito, you can configure your app to work with MFA.

## Setup TOTP

With TOTP (Time-based One-time Password), your app user is challenged to complete authentication using a time-based one-time (TOTP) password after their username and password have been verified.

You can setup TOTP for a user in your app:

```javascript
import { Auth } from 'aws-amplify';

// To setup TOTP, first you need to get a `authorization code` from Amazon Cognito
// `user` is the current Authenticated user
Auth.setupTOTP(user).then((code) => {
    // You can directly display the `code` to the user or convert it to a QR code to be scanned.
    // E.g., use following code sample to render a QR code with `qrcode.react` component:  
    //      import QRCode from 'qrcode.react';
    //      const str = "otpauth://totp/AWSCognito:"+ username + "?secret=" + code + "&issuer=" + issuer;
    //      <QRCode value={str}/>
});

// ...

// Then you will have your TOTP account in your TOTP-generating app (like Google Authenticator)
// Use the generated one-time password to verify the setup
Auth.verifyTotpToken(user, challengeAnswer).then(() => {

    // don't forget to set TOTP as the preferred MFA method
    Auth.setPreferredMFA(user, 'TOTP');
    // ...
}).catch( e => {
    // Token is not verified
});
```

## Setup MFA type

Multiple MFA types supported by Amazon Cognito. You can set the preferred method in your code:

```javascript
import { Auth } from 'aws-amplify';

// You can select preferred mfa type, for example:
// Select TOTP as preferred
Auth.setPreferredMFA(user, 'TOTP').then((data) => {
    console.log(data);
    // ...
}).catch(e => {});

// Select SMS as preferred
Auth.setPreferredMFA(user, 'SMS');

// Select no-mfa
Auth.setPreferredMFA(user, 'NOMFA');
```

## Retrieve current preferred MFA type

You can get current preferred MFA type in your code:
```javascript
import { Auth } from 'aws-amplify';

// Will retrieve the current mfa type from cache
Auth.getPreferredMFA(user,{
    // Optional, by default is false. 
    // If set to true, it will get the MFA type from server side instead of from local cache.
    bypassCache: false 
}).then((data) => {
    console.log('Current prefered MFA type is: ' + data);
})
```

## Allow users to select MFA type

When working with multiple MFA Types, you can let the app user select the desired authentication method. `SelectMFAType` UI Component, which is provided with `aws-amplify-react` package, renders a list of available MFA types.

```javascript
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import { SelectMFAType } from 'aws-amplify-react';

Amplify.configure(awsconfig);

// Please have at least TWO types
// Please make sure you set it properly according to your Cognito User pool
const MFATypes = {
    SMS: true, // if SMS enabled in your user pool
    TOTP: true, // if TOTP enabled in your user pool
    Optional: true, // if MFA is set to optional in your user pool
}

class App extends Component {
    // ...
    render() {
        return (
            // ...
            <SelectMFAType authData={this.props.authData} MFATypes={MFATypes}>
        )
    }
}

export default withAuthenticator(App, true);
```