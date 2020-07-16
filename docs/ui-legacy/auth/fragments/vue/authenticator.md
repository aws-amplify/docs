The Authenticator component provides basic login/logout functionality for your application, as well confirmation steps for new user registration and user login. It uses the following components as children:

* SignIn
* ConfirmSignIn
* SignUp
* ConfirmSignUp
* ForgotPassword


Usage: ```<amplify-authenticator></amplify-authenticator>```

Config: 

```
<amplify-authenticator v-bind:authConfig="authConfig"></amplify-authenticator>
```

| Attribute                                                | Type   |
|----------------------------------------------------------|--------|
| [confirmSignInConfig](#confirmsignin)                    | object |
| [confirmSignUpConfig](#confirmsignup)                    | object |
| [forgotPasswordConfig](#forgotpassword)                  | object |
| [signInConfig](#signinconfig)                            | object |
| [signUpConfig](#signupconfig)                            | object |
| [usernameAttributes](#Sign-up/in-with-email/phone-number)| string |

&ast; The attributes above reference the config objects for the components that are nested inside Authenticator.  See the individual components for details. 


Events: None

### SignIn

The SignIn component provides your users with the ability to sign in.  

Usage: ```<amplify-sign-in></amplify-sign-in>```

Config:
```
<amplify-sign-in v-bind:signInConfig="signInConfig"></amplify-sign-in>
```

<inline-fragment framework="vue" src="~/ui-legacy/fragments/sign-in-attributes.md"></inline-fragment>

Events: 

* ```AmplifyEventBus.$emit('authState', 'signedIn')```: Emitted when a user successfully signs in without answering an MFA challenge.
* ```AmplifyEventBus.$emit('authState', 'confirmSignIn')```: Emitted when a user successfully provides their credentials but is then asked to answer and MFA challenge.
* ```AmplifyEventBus.$emit('authState', 'forgotPassword')```: Emitted when a user clicks the 'Forgot Password' button.
* ```AmplifyEventBus.$emit('authState', 'signUp')```: Emitted when a user clicks 'Back to Sign Up'.

### ConfirmSignIn

The ConfirmSignIn component provides your users with the ability to answer an MFA challenge.  

Usage: ```<amplify-confirm-sign-in></amplify-confirm-sign-in>```

Config:
```
<amplify-confirm-sign-in v-bind:confirmSignInConfig="confirmSignInConfig"></amplify-confirm-sign-in>
```

<inline-fragment framework="vue" src="~/ui-legacy/fragments/confirm-sign-in-attributes.md"></inline-fragment>


Events: 

* ```AmplifyEventBus.$emit('authState', 'signedIn')```: Emitted when a user successfully answers their MFA challenge.
* ```AmplifyEventBus.$emit('authState', 'signIn');```: Emitted when a user clicks 'Back to Sign In'.


### SignUp

The SignUp component provides your users with the ability to sign up.  

Usage: ```<amplify-sign-up></amplify-sign-up>```

Config:
```
<amplify-sign-up v-bind:signUpConfig="signUpConfig"></amplify-sign-up>
```

<inline-fragment framework="vue" src="~/ui-legacy/fragments/sign-up-attributes.md"></inline-fragment>

The signUpFields array in turn consist of an array of objects, each describing a field that will appear in sign up form that your users fill out (see below).

Events: 

* ```AmplifyEventBus.$emit('authState', 'confirmSignUp')```: Emitted when a user successfully enters their information but has not yet completed a required verification step.
* ```AmplifyEventBus.$emit('authState', 'signIn')```: Emitted when a user successfully provides their information and does not need to complete a required verification step, or when they click 'Back to Sign In'.


### ConfirmSignUp

The ConfirmSignUp component provides your users with the ability to verify their identity.  

Usage: ```<amplify-confirm-sign-up></amplify-confirm-sign-up>```

Config:
```
<amplify-confirm-sign-up v-bind:confirmSignUpConfig="confirmSignUpConfig"></amplify-confirm-sign-up>
```

<inline-fragment framework="vue" src="~/ui-legacy/fragments/confirm-sign-up-attributes.md"></inline-fragment>


Events: 

* ```AmplifyEventBus.$emit('authState', 'signIn')```: Emitted when a user successfully completes their verification step or clicks 'Back to Sign In'.

### ForgotPassword

The ForgotPassword component provides your users with the ability to reset their password.  

Usage: ```<amplify-forgot-password></amplify-forgot-password>```

Config:
```
<amplify-forgot-password v-bind:forgotPasswordConfig="forgotPasswordConfig"></amplify-forgot-password>
```

<inline-fragment framework="vue" src="~/ui-legacy/fragments/forgot-password-attributes.md"></inline-fragment>


Events: 

* ```AmplifyEventBus.$emit('authState', 'signIn')```: Emitted when a user successfully resets their password or clicks 'Back to Sign In'.

### SignOut

The SignOut component provides your users with the ability to sign out.  

Usage: ```<amplify-sign-out></amplify-sign-out>```

Config:
```
<amplify-sign-out v-bind:signOutConfig="signOutConfig"></amplify-sign-out>
```

<inline-fragment framework="vue" src="~/ui-legacy/fragments/sign-out-attributes.md"></inline-fragment>


Events: 

* ```AmplifyEventBus.$emit('authState', 'signedOut')```: Emitted when a user successfully signs out.

### SetMFA

The SetMFA component provides your users with the ability to set their preferred Multifactor Authentication (MFA) method.  It has the ability to show three options - SMS Text Message, TOTP, or None (depending on the options that you pass into it).

Usage: ```<amplify-set-mfa></amplify-set-mfa>```

Config:
```
<amplify-set-mfa v-bind:mfaConfig="mfaConfig"></amplify-set-mfa>
```

<inline-fragment framework="vue" src="~/ui-legacy/fragments/set-mfa-attributes.md"></inline-fragment>


Events: None

### SignUp Fields

The `aws-amplify-vue` SignUp component allows you to programmatically define the user input fields that are displayed to the user. Information entered into these fields will populate the user's record in your User Pool.

Usage: 

```
<amplify-sign-up v-bind:signUpConfig="signUpConfig"></amplify-sign-up>
``` 

#### SignUp Field Attributes
<inline-fragment framework="vue" src="~/ui-legacy/fragments/sign-up-fields.md"></inline-fragment>

The following example will replace all the default sign up fields with the ones defined in the `signUpFields` array. It will also indicate that the `Email` field will be used to sign up with.

`MyComponent.vue`:
```html
<template>
  <div>
    <amplify-authenticator v-bind:authConfig="authConfig"></amplify-authenticator>
  </div>
</template>
<script>
export default {
  name: 'MyComponent',
  props: [],
  data () {
    return {
      authConfig: {
          signUpConfig: {
            header: 'My Customized Sign Up',
            hideAllDefaults: true,
            defaultCountryCode: '1',
            signUpFields: [
              {
                label: 'Email',
                key: 'email',
                required: true,
                displayOrder: 1,
                type: 'string',
                signUpWith: true
              },
              {
                label: 'Password',
                key: 'password',
                required: true,
                displayOrder: 2,
                type: 'password'
              },
              {
                label: 'PhoneNumber',
                key: 'phone_number',
                required: true,
                displayOrder: 3,
                type: 'string'
              },
              {
                label: 'Custom Attribute',
                key: 'custom_attr',
                required: false,
                displayOrder: 4,
                type: 'string',
                custom: true
              }
            ]
          }
        }
      }
    }
  }
</script>
```

### Sign up/in with email/phone number
If the user pool is set to allow email addresses/phone numbers as the username, you can then change the UI components accordingly by using `usernameAttributes`.

Setting `usernameAttributes` to `email` when signing up/in with email address.
Setting `usernameAttributes` to `phone_number` when signing up/in with phone number.

Note: if you are using custom signUpFields to customize the `username` field, then you need to make sure either the label of that field is the same value you set in `usernameAttributes` or the key of the field is `username`.

For example:
```html
<template>
  <div>
    <amplify-authenticator v-bind:authConfig="authConfig"></amplify-authenticator>
  </div>
</template>
<script>
export default {
  name: 'MyComponent',
  props: [],
  data () {
    return {
      authConfig: {
          usernameAttributes: 'My user name',
          signUpConfig: {
            header: 'My Customized Sign Up',
            hideAllDefaults: true,
            defaultCountryCode: '1',
            signUpFields: [
              {
                label: 'My user name',
                key: 'username',
                required: true,
                displayOrder: 1,
                type: 'string',
              },
              {
                label: 'Password',
                key: 'password',
                required: true,
                displayOrder: 2,
                type: 'password'
              },
              {
                label: 'Phone Number',
                key: 'phone_number',
                required: true,
                displayOrder: 3,
                type: 'string'
              },
              {
                label: 'Custom Attribute',
                key: 'custom_attr',
                required: false,
                displayOrder: 4,
                type: 'string',
                custom: true
              }
            ]
          }
        }
      }
    }
  }
</script>
```