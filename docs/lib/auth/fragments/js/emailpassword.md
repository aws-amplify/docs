## Sign-up

Create a new user in the Amazon Cognito UserPool by passing the new user's email address, password, and other attributes to `Auth.signUp`.

```javascript
import { Auth } from 'aws-amplify';

async function signUp() {
    try {
        const user = await Auth.signUp({
            username,
            password,
            attributes: {
                email,          // optional
                phone_number,   // optional - E.164 number convention
                // other custom attributes 
            }
        });
        console.log({ user });
    } catch (error) {
        console.log('error signing up:', error);
    }
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
import { Auth } from 'aws-amplify';

async function confirmSignUp() {
    try {
      await Auth.confirmSignUp(username, code);
    } catch (error) {
        console.log('error confirming sign up', error);
    }
}
```

### Custom Attributes

To create a custom attribute during your sign-up process, add it to the attributes field of the signUp method prepended with `custom:`.

```js
Auth.signUp({
    username,
    password,
    attributes: {
        email,
        'custom:favorite_flavor': 'Cookie Dough'  // custom attribute, not standard
    }
})
```

> Amazon Cognito does not dynamically create custom attributes on sign up. In order to use a custom attribute, the attribute must be first created in the user pool. To open the User Pool to create custom attributes using the Amplify ClI, run `amplify console auth`. If you are not using the Amplify CLI, you can view the user pool by visiting the AWS console and opening the Amazon Cognito dashboard.

## Sign-in

When signing in with user name and password, you will pass in the username and the password to the `signIn` method of the Auth class.

```javascript
import { Auth } from 'aws-amplify';

async function SignIn() {
    try {
        const user = await Auth.signIn(username, password);
    } catch (error) {
        console.log('error signing in', error);
    }
}
```

### Re-send confirmation code

```js
import { Auth } from 'aws-amplify';

async function resendConfirmationCode() {
    try {
        await Auth.resendSignUp(username);
        console.log('code resent succesfully');
    } catch (err) {
        console.log('error resending code: ', err);
    }
}
```

## Sign-out

```javascript
import { Auth } from 'aws-amplify';

async function signOut() {
    try {
        await Auth.signOut();
    } catch (error) {
        console.log('error signing out: ', error);
    }
}
```

### Global sign-out

By doing this, you are revoking all the auth tokens (id token, access token and refresh token) which means the user is signed out from all the devices
Note: although the tokens are revoked, the AWS credentials will remain valid until they expire (which by default is 1 hour)

```js
import { Auth } from 'aws-amplify';

async function signOut() {
    try {
        await Auth.signOut({ global: true });
    } catch (error) {
        console.log('error signing out: ', error);
    }
}
```
