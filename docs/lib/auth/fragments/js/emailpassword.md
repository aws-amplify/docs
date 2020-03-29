## Sign-up

Create a new user in the Amazon Cognito UserPool by passing the new user's email address, password, and other attributes to `Auth.signUp`.

```javascript
import { Auth } from 'aws-amplify';

try {
    const user = await Auth.signUp({
        username,
        password,
        attributes: {
            email,          // optional
            phone_number,   // optional - E.164 number convention
            // other custom attributes 
        },
        validationData: []  //optional
    });
    console.log({ user });
} catch (error) {
    console.log('error signing up:', error);
}
```

The `Auth.signUp` promise returns a data object of type [`ISignUpResult`](https://github.com/aws-amplify/amplify-js/blob/4644b4322ee260165dd756ca9faeb235445000e3/packages/amazon-cognito-identity-js/index.d.ts#L136-L139) with a [`CognitoUser`](https://github.com/aws-amplify/amplify-js/blob/4644b4322ee260165dd756ca9faeb235445000e3/packages/amazon-cognito-identity-js/index.d.ts#L48). 

```js
{
    user: CognitoUser;
    userConfirmed: boolean;
    userSub: string;
}
```

### Confirm sign up

If you enabled multi-factor auth, confirm the sign-up after retrieving a confirmation code from the user.

```js
try {
    await Auth.confirmSignUp(username, code)
} catch (error) {
    console.log('error confirming sign up', error)
}
```

## Sign-in

When signing in with user name and password, you will pass in the username and the password to the `signIn` method of the Auth class.

```javascript
import { Auth } from 'aws-amplify';

async function SignIn() {
    try {
        const user = await Auth.signIn(username, password);
    } catch (error) {
        console.log('error signing in', error)  
    }
}
```

### Re-send confirmation code

```js
import { Auth } from 'aws-amplify';

try {
    await Auth.resendSignUp(username);
    console.log('code resent succesfully')
} catch (err) {
    console.log('error resending code: ', err);
}
```

## Sign-out

```javascript
import { Auth } from 'aws-amplify';

try {
    await Auth.signOut();
} catch (error) {
    console.log('error signing out: ', error);
}
```

### Global sign-out

By doing this, you are revoking all the auth tokens (id token, access token and refresh token) which means the user is signed out from all the devices
Note: although the tokens are revoked, the AWS credentials will remain valid until they expire (which by default is 1 hour)

```js
import { Auth } from 'aws-amplify';

try {
    await Auth.signOut({ global: true });
} catch (error) {
    console.log('error signing out: ', error);
}
```

## Advanced use cases

### Sign-in with custom auth challenges

When signing in with user name and password, you will either sign in directly or be asked to pass some challenges before getting authenticated.

The `user` object returned from `Auth.signIn` will contain `challengeName` and `challengeParam` if the user needs to pass those challenges. You can call corresponding functions based on those two parameters.

ChallengeName:

* `SMS_MFA`: The user needs to input the code received from SMS message. You can submit the code by `Auth.confirmSignIn`.
* `SOFTWARE_TOKEN_MFA`: The user needs to input the OTP(one time password). You can submit the code by `Auth.confirmSignIn`.
* `NEW_PASSWORD_REQUIRED`: This happens when the user account is created through the Cognito console. The user needs to input the new password and required attributes. You can submit those data by `Auth.completeNewPassword`.
* `MFA_SETUP`: This happens when the MFA method is TOTP(the one time password) which requires the user to go through some steps to generate those passwords. You can start the setup process by `Auth.setupTOTP`.

The following code is only for demonstration purpose:

```javascript
import { Auth } from 'aws-amplify';

async function SignIn() {
    try {
        const user = await Auth.signIn(username, password);
        if (user.challengeName === 'SMS_MFA' ||
            user.challengeName === 'SOFTWARE_TOKEN_MFA') {
            // You need to get the code from the UI inputs
            // and then trigger the following function with a button click
            const code = getCodeFromUserInput();
            // If MFA is enabled, sign-in should be confirmed with the confirmation code
            const loggedUser = await Auth.confirmSignIn(
                user,   // Return object from Auth.signIn()
                code,   // Confirmation code  
                mfaType // MFA Type e.g. SMS_MFA, SOFTWARE_TOKEN_MFA
            );
        } else if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
            const {requiredAttributes} = user.challengeParam; // the array of required attributes, e.g ['email', 'phone_number']
            // You need to get the new password and required attributes from the UI inputs
            // and then trigger the following function with a button click
            // For example, the email and phone_number are required attributes
            const {username, email, phone_number} = getInfoFromUserInput();
            const loggedUser = await Auth.completeNewPassword(
                user,              // the Cognito User Object
                newPassword,       // the new password
                // OPTIONAL, the required attributes
                {
                    email,
                    phone_number,
                }
            );
        } else if (user.challengeName === 'MFA_SETUP') {
            // This happens when the MFA method is TOTP
            // The user needs to setup the TOTP before using it
            // More info please check the Enabling MFA part
            Auth.setupTOTP(user);
        } else {
            // The user directly signs in
            console.log(user);
        }
    } catch (err) {
        if (err.code === 'UserNotConfirmedException') {
            // The error happens if the user didn't finish the confirmation step when signing up
            // In this case you need to resend the code and confirm the user
            // About how to resend the code and confirm the user, please check the signUp part
        } else if (err.code === 'PasswordResetRequiredException') {
            // The error happens when the password is reset in the Cognito console
            // In this case you need to call forgotPassword to reset the password
            // Please check the Forgot Password part.
        } else if (err.code === 'NotAuthorizedException') {
            // The error happens when the incorrect password is provided
        } else if (err.code === 'UserNotFoundException') {
            // The error happens when the supplied username/email does not exist in the Cognito user pool
        } else {
            console.log(err);
        }
    }
}
```

### Sign-in with custom validation data for Lambda Trigger

You can also pass an object which has the username, password and validationData which is sent to a PreAuthentication Lambda trigger

```js
try {
    const user = await Auth.signIn({
        username, // Required, the username
        password, // Optional, the password
        validationData, // Optional, a random key-value pair map which can contain any key and will be passed to your PreAuthentication Lambda trigger as-is. It can be used to implement additional validations around authentication
    });
    console.log('user is signed in!', user);
} catch (error) {
    console.log('error signing in:' , error);
}
```

### Forcing Email Uniqueness in Cognito User Pools

When your Cognito User Pool sign-in options are set to "*Username*", and "*Also allow sign in with verified email address*", the *signUp()* method creates a new user account every time it's called, without validating email uniqueness. In this case you will end up having multiple user pool identities and all previously created accounts will have their *email_verified* attribute changed to *false*. 

To enforce Cognito User Pool signups with a unique email, you need to change your User Pool's *Attributes* setting in [Amazon Cognito console](https://console.aws.amazon.com/cognito) as the following:

![cup](https://aws-amplify.github.io/docs/js/images/cognito_user_pool_settings.png)