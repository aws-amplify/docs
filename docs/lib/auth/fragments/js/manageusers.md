This section covers the client-side development experience for password and user management. To learn more about exposing administration actions to your application, click [here](~/cli/auth/admin.md). 

## Password operations

### Change password

```javascript
import { Auth } from 'aws-amplify';

Auth.currentAuthenticatedUser()
    .then(user => {
        return Auth.changePassword(user, 'oldPassword', 'newPassword');
    })
    .then(data => console.log(data))
    .catch(err => console.log(err));
```

### Forgot password

```javascript
import { Auth } from 'aws-amplify';

// Send confirmation code to user's email
Auth.forgotPassword(username)
    .then(data => console.log(data))
    .catch(err => console.log(err));

// Collect confirmation code and new password, then
Auth.forgotPasswordSubmit(username, code, new_password)
    .then(data => console.log(data))
    .catch(err => console.log(err));
```

### Complete new password

The user is asked to provide the new password and required attributes during the first sign-in attempt if a valid user directory is created in Amazon Cognito. During this scenario, the following method can be called to process the new password entered by the user.

```js
import { Auth } from 'aws-amplify';

Auth.signIn(username, password)
.then(user => {
    if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
        const { requiredAttributes } = user.challengeParam; // the array of required attributes, e.g ['email', 'phone_number']
        Auth.completeNewPassword(
            user,               // the Cognito User Object
            newPassword,       // the new password
            // OPTIONAL, the required attributes
            {
              email: 'xxxx@example.com',
              phone_number: '1234567890'
            }
        ).then(user => {
            // at this time the user is logged in if no MFA required
            console.log(user);
        }).catch(e => {
          console.log(e);
        });
    } else {
        // other situations
    }
}).catch(e => {
    console.log(e);
});
```

## Account recovery verification

Either the phone number or the email address is required for account recovery. You can let the user verify those attributes by:
```javascript
// To initiate the process of verifying the attribute like 'phone_number' or 'email'
Auth.verifyCurrentUserAttribute(attr)
.then(() => {
     console.log('a verification code is sent');
}).catch((e) => {
     console.log('failed with error', e);
});

// To verify attribute with the code
Auth.verifyCurrentUserAttributeSubmit(attr, 'the_verification_code')
.then(() => {
     console.log('phone_number verified');
}).catch(e => {
     console.log('failed with error', e);
});
```

## Retrieve current authenticated user

You can call `Auth.currentAuthenticatedUser()` to get the current authenticated user object.

```javascript
import { Auth } from 'aws-amplify';

Auth.currentAuthenticatedUser({
    bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
}).then(user => console.log(user))
.catch(err => console.log(err));
```
This method can be used to check if a user is logged in when the page is loaded. It will throw an error if there is no user logged in.
This method should be called after the Auth module is configured or the user is logged in. To ensure that you can listen on the auth events `configured` or `signIn`. [Learn how to listen on auth events.](~/lib/utilities/hub.md#authentication-events)

### Retrieve attributes for current authenticated user

You can also access the user's attributes like their email address, phone number, sub, or any other attributes that are associated with them from the user object returned by `Auth.currentAuthenticatedUser`.

```js
const { attributes } = await Auth.currentAuthenticatedUser();
```

## Retrieve current session

`Auth.currentSession()` returns a `CognitoUserSession` object which contains JWT `accessToken`, `idToken`, and `refreshToken`. 

This method will automatically refresh the `accessToken` and `idToken` if tokens are expired and a valid `refreshToken` presented. So you can use this method to refresh the session if needed. 


```javascript
import { Auth } from 'aws-amplify';

Auth.currentSession()
  .then(data => console.log(data))
  .catch(err => console.log(err));
```

## Managing user attributes

You can pass user attributes during sign up:

```javascript
Auth.signUp({
    'username': 'jdoe',
    'password': 'mysecurerandompassword#123',
    'attributes': {
        'email': 'me@domain.com',
        'phone_number': '+12128601234', // E.164 number convention
        'given_name': 'Jane',
        'family_name': 'Doe',
        'nickname': 'Jane'
    }
});
```

You can retrieve user attributes:

```javascript
let user = await Auth.currentAuthenticatedUser();

const { attributes } = user;
```

You can update user attributes:

```javascript
let user = await Auth.currentAuthenticatedUser();

let result = await Auth.updateUserAttributes(user, {
    'email': 'me@anotherdomain.com',
    'family_name': 'Lastname'
});
console.log(result); // SUCCESS
```

You can delete user attributes:

```javascript
let user = await Auth.currentAuthenticatedUser();

let result = await Auth.deleteUserAttributes(user, [
    'family_name'
]);
console.log(result); // SUCCESS
```

> You can find a <a href="https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-settings-attributes.html#cognito-user-pools-standard-attributes" target="_blank">list of all custom attributes here</a>.

If you change the email address, the user will receive a confirmation code. In your app, you can confirm the verification code:

```javascript
let result = await Auth.verifyCurrentUserAttributeSubmit('email', 'abc123');
```

## Managing security tokens

> When using Authentication with AWS Amplify, you don't need to refresh Amazon Cognito tokens manually. The tokens are automatically refreshed by the library when necessary.

Security Tokens like *IdToken* or *AccessToken* are stored in *localStorage* for the browser and in *AsyncStorage* for React Native. If you want to store those tokens in a more secure place or you are using Amplify in server side, then you can provide your own `storage` object to store those tokens. 

For example:
```ts
class MyStorage {
    // the promise returned from sync function
    static syncPromise = null;
    // set item with the key
    static setItem(key: string, value: string): string;
    // get item with the key
    static getItem(key: string): string;
    // remove item with the key
    static removeItem(key: string): void;
    // clear out the storage
    static clear(): void;
    // If the storage operations are async(i.e AsyncStorage)
    // Then you need to sync those items into the memory in this method
    static sync(): Promise<void> {
        if (!MyStorage.syncPromise) {
            MyStorage.syncPromise = new Promise((res, rej) => {});
        }
        return MyStorage.syncPromise;
    }
}

// tell Auth to use your storage object
Auth.configure({
    storage: MyStorage
});
```

Here is the example of how to use AsyncStorage as your storage object which will show you how to sync items from AsyncStorage into Memory:
```javascript
import { AsyncStorage } from 'react-native';

const MYSTORAGE_KEY_PREFIX = '@MyStorage:';
let dataMemory = {};

/** @class */
class MyStorage {
    static syncPromise = null;
    /**
     * This is used to set a specific item in storage
     */
    static setItem(key, value) {
        AsyncStorage.setItem(MYSTORAGE_KEY_PREFIX + key, value);
        dataMemory[key] = value;
        return dataMemory[key];
    }

    /**
     * This is used to get a specific key from storage
     */
    static getItem(key) {
        return Object.prototype.hasOwnProperty.call(dataMemory, key) ? dataMemory[key] : undefined;
    }

    /**
     * This is used to remove an item from storage
     */
    static removeItem(key) {
        AsyncStorage.removeItem(MYSTORAGE_KEY_PREFIX + key);
        return delete dataMemory[key];
    }

    /**
     * This is used to clear the storage
     */
    static clear() {
        dataMemory = {};
        return dataMemory;
    }

    /**
     * Will sync the MyStorage data from AsyncStorage to storageWindow MyStorage
    */
    static sync() {
        if (!MyStorage.syncPromise) {
            MyStorage.syncPromise =  new Promise((res, rej) => {
                AsyncStorage.getAllKeys((errKeys, keys) => {
                    if (errKeys) rej(errKeys);
                    const memoryKeys = keys.filter((key) => key.startsWith(MYSTORAGE_KEY_PREFIX));
                    AsyncStorage.multiGet(memoryKeys, (err, stores) => {
                        if (err) rej(err);
                        stores.map((result, index, store) => {
                            const key = store[index][0];
                            const value = store[index][1];
                            const memoryKey = key.replace(MYSTORAGE_KEY_PREFIX, '');
                            dataMemory[memoryKey] = value;
                        });
                        res();
                    });
                });
            });
        }
        return MyStorage.syncPromise;
    }
}

Auth.configure({
    storage: MyStorage
});
```

To learn more about tokens, please visit [Amazon Cognito Developer Documentation](https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-tokens-with-identity-providers.html).
