<amplify-authenticator></amplify-authenticator>

<inline-fragment src="~/ui/fragments/web/installation.md"></inline-fragment>

## Usage

<docs-filter framework="react">

### Basic Usage

```jsx
import React from "react";
import Amplify from "aws-amplify";
import {AmplifyAuthenticator, AmplifySignOut} from "@aws-amplify/ui-react";
import awsconfig from "./aws-exports";

Amplify.configure(awsconfig);

const App = () => (
  <AmplifyAuthenticator>
    <div>
      My App
      <AmplifySignOut />
    </div>
  </AmplifyAuthenticator>
);
```

</docs-filter>

### Recommended Usage

In most cases you will need to manage the rendering and layout of the Authenticator separately.

<docs-filter framework="react">
  <inline-fragment src="~/ui/auth/fragments/react/auth-state-management.md"></inline-fragment>
</docs-filter>

<docs-filter framework="angular">
  <inline-fragment src="~/ui/auth/fragments/angular/auth-state-management.md"></inline-fragment>
</docs-filter>

<docs-filter framework="ionic">
  <inline-fragment src="~/ui/auth/fragments/ionic/auth-state-management.md"></inline-fragment>
</docs-filter>

<docs-filter framework="vue">
  <inline-fragment src="~/ui/auth/fragments/vue/auth-state-management.md"></inline-fragment>
</docs-filter>

<docs-filter framework="ionic">

<inline-fragment src="~/ui/fragments/angular/configure-module.md"></inline-fragment>

_app.component.html_

```html
<amplify-authenticator>
  <div>
    My App
    <amplify-sign-out></amplify-sign-out>
  </div>
</amplify-authenticator>
```

</docs-filter>
<docs-filter framework="vue">

<inline-fragment src="~/ui/fragments/vue/configure-app.md"></inline-fragment>

_App.vue_

```html
<template>
  <amplify-authenticator>
    <div>
      My App
      <amplify-sign-out></amplify-sign-out>
    </div>
  </amplify-authenticator>
</template>
```

</docs-filter>



<docs-filter framework="react">

<inline-fragment src="~/ui/auth/fragments/react/password-manager.md"></inline-fragment>

</docs-filter>

<docs-filter framework="angular">

<inline-fragment src="~/ui/auth/fragments/angular/password-manager.md"></inline-fragment>

</docs-filter>

<docs-filter framework="ionic">

<inline-fragment src="~/ui/auth/fragments/angular/password-manager.md"></inline-fragment>

</docs-filter>

<docs-filter framework="vue">

<inline-fragment src="~/ui/auth/fragments/angular/password-manager.md"></inline-fragment>

</docs-filter>

<ui-component-props tag="amplify-authenticator" prop-type='attr' use-table-headers></ui-component-props>

<ui-component-props tag="amplify-authenticator" prop-type='slots' use-table-headers></ui-component-props>

<ui-component-props tag="amplify-authenticator" prop-type='css' use-table-headers></ui-component-props>

## Customization

### Custom Form Fields

If you'd like to customize the form fields in the Authenticator Sign In or Sign Up component, you can do so by using the `formFields` property.

The following example highlights the use of Authenticator with customized Sign Up form fields and [authentication with email](#authenticate-with-email-or-phone-number):

<docs-filter framework="react">

<inline-fragment src="~/ui/auth/fragments/react/custom-form-fields.md"></inline-fragment>

</docs-filter>
<docs-filter framework="angular">

<inline-fragment src="~/ui/auth/fragments/angular/custom-form-fields.md"></inline-fragment>

</docs-filter>
<docs-filter framework="ionic">

<inline-fragment src="~/ui/auth/fragments/ionic/custom-form-fields.md"></inline-fragment>

</docs-filter>
<docs-filter framework="vue">

<inline-fragment src="~/ui/auth/fragments/vue/custom-form-fields.md"></inline-fragment>

</docs-filter>

Here is an example of the component in use:

<docs-component-playground component-name="AuthenticatorWithSlots"></docs-component-playground>

<amplify-callout warning>

If you are using the `usernameAlias` prop with custom `slots`, keep in mind that you must pass the `usernameAlias` prop value to both the Authenticator and custom slotted component since the slotted component overrides the configuration passed from the Authenticator.

</amplify-callout>

For more details on this customization see the `amplify-form-field` [prop documentation](https://github.com/aws-amplify/amplify-js/tree/main/packages/amplify-ui-components/src/components/amplify-form-field#properties) and the internal [`FormFieldType` interface](https://github.com/aws-amplify/amplify-js/blob/main/packages/amplify-ui-components/src/components/amplify-auth-fields/amplify-auth-fields-interface.ts#L3).

### Hiding form fields

Often you will not need a default form field, for example the phone number field. To implement this you can define the array of fields you'd like to show (along with the optional field customizations).

In this example we are also managing the auth state to show and hide the Authenticator component based on the authenticated state of the user. This code will also persist the user sign in state on refresh.

<docs-filter framework="react">

<inline-fragment src="~/ui/auth/fragments/react/hiding-form-fields.md"></inline-fragment>

</docs-filter>

<docs-filter framework="angular">

<inline-fragment src="~/ui/auth/fragments/angular/hiding-form-fields.md"></inline-fragment>

</docs-filter>

<docs-filter framework="ionic">

<inline-fragment src="~/ui/auth/fragments/ionic/hiding-form-fields.md"></inline-fragment>

</docs-filter>

<docs-filter framework="vue">

<inline-fragment src="~/ui/auth/fragments/vue/hiding-form-fields.md"></inline-fragment>

</docs-filter>

### Managing Layout with CSS

Since the UI components are implemented using web components, you can control the top level `amplify-authenticator` component directly using CSS.

```css
amplify-authenticator {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  height: 100vh;
}
```

## Components

### Sign In

<amplify-sign-in header-text="My Custom Sign In Text"></amplify-sign-in>

**Usage**

<docs-filter framework="react">

```jsx
<AmplifyAuthenticator>
  <AmplifySignIn
    headerText="My Custom Sign In Text"
    slot="sign-in"
  ></AmplifySignIn>
</AmplifyAuthenticator>
```

</docs-filter>

<docs-filter framework="angular">

```html
<amplify-authenticator>
  <amplify-sign-in
    header-text="My Custom Sign In Text"
    slot="sign-in"
  ></amplify-sign-in>
</amplify-authenticator>
```

</docs-filter>

<docs-filter framework="ionic">

```html
<amplify-authenticator>
  <amplify-sign-in
    header-text="My Custom Sign In Text"
    slot="sign-in"
  ></amplify-sign-in>
</amplify-authenticator>
```

</docs-filter>

<docs-filter framework="vue">

```html
<amplify-authenticator>
  <amplify-sign-in
    header-text="My Custom Sign In Text"
    slot="sign-in"
  ></amplify-sign-in>
</amplify-authenticator>
```

</docs-filter>

<ui-component-props tag="amplify-sign-in" prop-type="attr"></ui-component-props>

<ui-component-props tag="amplify-sign-in" prop-type="css"></ui-component-props>

<ui-component-props tag="amplify-sign-in" prop-type="slots"></ui-component-props>

### Sign Up

<amplify-sign-up header-text="My Custom Sign Up Text"></amplify-sign-up>

**Usage**

<docs-filter framework="react">

```jsx
<AmplifyAuthenticator>
  <AmplifySignUp
    headerText="My Custom Sign Up Text"
    slot="sign-up"
  ></AmplifySignUp>
</AmplifyAuthenticator>
```

</docs-filter>
<docs-filter framework="angular">

```html
<amplify-authenticator>
  <amplify-sign-up
    header-text="My Custom Sign Up Text"
    slot="sign-up"
  ></amplify-sign-up>
</amplify-authenticator>
```

</docs-filter>
<docs-filter framework="ionic">

```html
<amplify-authenticator>
  <amplify-sign-up
    header-text="My Custom Sign Up Text"
    slot="sign-up"
  ></amplify-sign-up>
</amplify-authenticator>
```

</docs-filter>
<docs-filter framework="vue">

```html
<amplify-authenticator>
  <amplify-sign-up
    header-text="My Custom Sign Up Text"
    slot="sign-up"
  ></amplify-sign-up>
</amplify-authenticator>
```

</docs-filter>

<ui-component-props tag="amplify-sign-up" prop-type='attr'></ui-component-props>

<ui-component-props tag="amplify-sign-up" prop-type='css'></ui-component-props>

<ui-component-props tag="amplify-sign-up" prop-type='slots'></ui-component-props>

### Sign Out

<amplify-sign-out button-text="Custom Text"></amplify-sign-out>

**Usage**

<docs-filter framework="react">

```jsx
<div>
  My App
  <AmplifySignOut buttonText="Custom Text"></AmplifySignOut>
</div>
```

</docs-filter>
<docs-filter framework="angular">

```html
<div>
  My App
  <amplify-sign-out button-text="Custom Text"></amplify-sign-out>
</div>
```

</docs-filter>
<docs-filter framework="ionic">

```html
<div>
  My App
  <amplify-sign-out button-text="Custom Text"></amplify-sign-out>
</div>
```

</docs-filter>
<docs-filter framework="vue">

```html
<div>
  My App
  <amplify-sign-out button-text="Custom Text"></amplify-sign-out>
</div>
```

</docs-filter>

<ui-component-props tag="amplify-sign-out" prop-type="attr"></ui-component-props>

<ui-component-props tag="amplify-sign-out" prop-type="css"></ui-component-props>

<ui-component-props tag="amplify-sign-out" prop-type="slots"></ui-component-props>

### Confirm Sign In

<amplify-confirm-sign-in header-text="My Custom Confirm Sign In Text"></amplify-confirm-sign-in>

**Usage**

<docs-filter framework="react">

```jsx
<AmplifyAuthenticator>
  <AmplifyConfirmSignIn
    headerText="My Custom Confirm Sign In Text"
    slot="confirm-sign-in"
  ></AmplifyConfirmSignIn>
</AmplifyAuthenticator>
```

</docs-filter>
<docs-filter framework="angular">

```html
<amplify-authenticator>
  <amplify-confirm-sign-in
    header-text="My Custom Confirm Sign In Text"
    slot="confirm-sign-in"
  ></amplify-confirm-sign-in>
</amplify-authenticator>
```

</docs-filter>
<docs-filter framework="ionic">

```html
<amplify-authenticator>
  <amplify-confirm-sign-in
    header-text="My Custom Confirm Sign In Text"
    slot="confirm-sign-in"
  ></amplify-confirm-sign-in>
</amplify-authenticator>
```

</docs-filter>
<docs-filter framework="vue">

```html
<amplify-authenticator>
  <amplify-confirm-sign-in
    header-text="My Custom Confirm Sign In Text"
    slot="confirm-sign-in"
  ></amplify-confirm-sign-in>
</amplify-authenticator>
```

</docs-filter>

<ui-component-props tag="amplify-confirm-sign-in" prop-type="attr"></ui-component-props>

### Confirm Sign Up

<amplify-confirm-sign-up header-text="My Custom Confirm Sign Up Text"></amplify-confirm-sign-up>

**Usage**

<docs-filter framework="react">

```jsx
<AmplifyAuthenticator>
  <AmplifyConfirmSignUp
    headerText="My Custom Confirm Sign Up Text"
    slot="confirm-sign-up"
  ></AmplifyConfirmSignUp>
</AmplifyAuthenticator>
```

</docs-filter>
<docs-filter framework="angular">

```html
<amplify-authenticator>
  <amplify-confirm-sign-up
    header-text="My Custom Confirm Sign Up Text"
    slot="confirm-sign-up"
  ></amplify-confirm-sign-up>
</amplify-authenticator>
```

</docs-filter>
<docs-filter framework="ionic">

```html
<amplify-authenticator>
  <amplify-confirm-sign-up
    header-text="My Custom Confirm Sign Up Text"
    slot="confirm-sign-up"
  ></amplify-confirm-sign-up>
</amplify-authenticator>
```

</docs-filter>
<docs-filter framework="vue">

```html
<amplify-authenticator>
  <amplify-confirm-sign-up
    header-text="My Custom Confirm Sign Up Text"
    slot="confirm-sign-up"
  ></amplify-confirm-sign-up>
</amplify-authenticator>
```

</docs-filter>

<ui-component-props tag="amplify-confirm-sign-up" prop-type="attr"></ui-component-props>

### Forgot Password

<amplify-forgot-password header-text="My Custom Forgot Password Text"></amplify-forgot-password>

**Usage**

<docs-filter framework="react">

```jsx
<AmplifyAuthenticator>
  <AmplifyForgotPassword
    headerText="My Custom Forgot Password Text"
    slot="forgot-password"
  ></AmplifyForgotPassword>
</AmplifyAuthenticator>
```

</docs-filter>
<docs-filter framework="angular">

```html
<amplify-authenticator>
  <amplify-forgot-password
    header-text="My Custom Forgot Password Text"
    slot="forgot-password"
  ></amplify-forgot-password>
</amplify-authenticator>
```

</docs-filter>
<docs-filter framework="ionic">

```html
<amplify-authenticator>
  <amplify-forgot-password
    header-text="My Custom Forgot Password Text"
    slot="forgot-password"
  ></amplify-forgot-password>
</amplify-authenticator>
```

</docs-filter>
<docs-filter framework="vue">

```html
<amplify-authenticator>
  <amplify-forgot-password
    header-text="My Custom Forgot Password Text"
    slot="forgot-password"
  ></amplify-forgot-password>
</amplify-authenticator>
```

</docs-filter>

<ui-component-props tag="amplify-forgot-password" prop-type='attr'></ui-component-props>

### Require New Password

<amplify-require-new-password header-text="My Custom Require New Password Text"></amplify-require-new-password>

**Usage**

<docs-filter framework="react">

```jsx
<AmplifyAuthenticator>
  <AmplifyRequireNewPassword
    headerText="My Custom Require New Password Text"
    slot="require-new-password"
  ></AmplifyRequireNewPassword>
</AmplifyAuthenticator>
```

</docs-filter>
<docs-filter framework="angular">

```html
<amplify-authenticator>
  <amplify-require-new-password
    header-text="My Custom Require New Password Text"
    slot="require-new-password"
  ></amplify-require-new-password>
</amplify-authenticator>
```

</docs-filter>
<docs-filter framework="ionic">

```html
<amplify-authenticator>
  <amplify-require-new-password
    header-text="My Custom Require New Password Text"
    slot="require-new-password"
  ></amplify-require-new-password>
</amplify-authenticator>
```

</docs-filter>
<docs-filter framework="vue">

```html
<amplify-authenticator>
  <amplify-require-new-password
    header-text="My Custom Require New Password Text"
    slot="require-new-password"
  ></amplify-require-new-password>
</amplify-authenticator>
```

</docs-filter>

<ui-component-props tag="amplify-require-new-password" prop-type="attr"></ui-component-props>

### TOTP Setup

**Usage**

<docs-filter framework="react">

```jsx
<AmplifyAuthenticator>
  <AmplifyTotpSetup
    headerText="My Custom TOTP Setup Text"
    slot="totp-setup"
  ></AmplifyTotpSetup>
</AmplifyAuthenticator>
```

</docs-filter>
<docs-filter framework="angular">

```html
<amplify-authenticator>
  <amplify-totp-setup
    header-text="My Custom TOTP Setup Text"
    slot="totp-setup"
  ></amplify-totp-setup>
</amplify-authenticator>
```

</docs-filter>
<docs-filter framework="ionic">

```html
<amplify-authenticator>
  <amplify-totp-setup
    header-text="My Custom TOTP Setup Text"
    slot="totp-setup"
  ></amplify-totp-setup>
</amplify-authenticator>
```

</docs-filter>
<docs-filter framework="vue">

```html
<amplify-authenticator>
  <amplify-totp-setup
    header-text="My Custom TOTP Setup Text"
    slot="totp-setup"
  ></amplify-totp-setup>
</amplify-authenticator>
```

</docs-filter>

<ui-component-props tag="amplify-totp-setup" prop-type='attr'></ui-component-props>

### Verify Contact

<docs-filter framework="react">

```jsx
<AmplifyAuthenticator>
  <AmplifyVerifyContact
    headerText="My Custom Verify Contact Text"
    slot="verify-contact"
  ></AmplifyVerifyContact>
</AmplifyAuthenticator>
```

</docs-filter>
<docs-filter framework="angular">

```html
<amplify-authenticator>
  <amplify-verify-contact
    header-text="My Custom Verify Contact Text"
    slot="verify-contact"
  ></amplify-verify-contact>
</amplify-authenticator>
```

</docs-filter>
<docs-filter framework="ionic">

```html
<amplify-authenticator>
  <amplify-verify-contact
    header-text="My Custom Verify Contact Text"
    slot="verify-contact"
  ></amplify-verify-contact>
</amplify-authenticator>
```

</docs-filter>
<docs-filter framework="vue">

```html
<amplify-authenticator>
  <amplify-verify-contact
    header-text="My Custom Verify Contact Text"
    slot="verify-contact"
  ></amplify-verify-contact>
</amplify-authenticator>
```

</docs-filter>

<ui-component-props tag="amplify-verify-contact" prop-type="attr"></ui-component-props>

### Greetings

<amplify-greetings username="username"></amplify-greetings>

**Usage**

<docs-filter framework="react">

```jsx
import React from "react";
import "./App.css";
import Amplify from "aws-amplify";
import {AmplifyAuthenticator, AmplifyGreetings} from "@aws-amplify/ui-react";
import {AuthState, onAuthUIStateChange} from "@aws-amplify/ui-components";
import awsconfig from "./aws-exports";

Amplify.configure(awsconfig);

const GreetingsApp = () => {
  const [authState, setAuthState] = React.useState();
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
    });
  }, []);

  return authState === AuthState.SignedIn && user ? (
    <div className="App">
      <AmplifyGreetings username={user.username}></AmplifyGreetings>
    </div>
  ) : (
    <AmplifyAuthenticator />
  );
};

export default GreetingsApp;
```

</docs-filter>
<docs-filter framework="angular">

<inline-fragment src="~/ui/fragments/angular/configure-module.md"></inline-fragment>

Replace the content inside of _app.component.ts_ with the following:

```js
import { Component, ChangeDetectorRef } from '@angular/core';
import { onAuthUIStateChange, CognitoUserInterface, AuthState } from '@aws-amplify/ui-components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'amplify-angular-auth';
  user: CognitoUserInterface | undefined;
  authState: AuthState;

  constructor(private ref: ChangeDetectorRef) {}

  ngOnInit() {
    onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData as CognitoUserInterface;
      this.ref.detectChanges();
    })
  }

  ngOnDestroy() {
    return onAuthUIStateChange;
  }
}
```

Replace the content inside of _app.component.html_ with the following:

```html
<amplify-authenticator *ngIf="authState !== 'signedin'"></amplify-authenticator>

<div *ngIf="authState === 'signedin' && user" class="App">
  <amplify-greetings [username]="user.username"></amplify-greetings>
</div>
```

</docs-filter>
<docs-filter framework="ionic">

<inline-fragment src="~/ui/fragments/angular/configure-module.md"></inline-fragment>

Replace the content inside of _app.component.ts_ with the following:

```js
import { Component, ChangeDetectorRef } from '@angular/core';
import { onAuthUIStateChange, CognitoUserInterface, AuthState } from '@aws-amplify/ui-components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'amplify-angular-auth';
  user: CognitoUserInterface | undefined;
  authState: AuthState;

  constructor(private ref: ChangeDetectorRef) {}

  ngOnInit() {
    onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData as CognitoUserInterface;
      this.ref.detectChanges();
    })
  }

  ngOnDestroy() {
    return onAuthUIStateChange;
  }
}
```

Replace the content inside of _app.component.html_ with the following:

```html
<amplify-authenticator *ngIf="authState !== 'signedin'"></amplify-authenticator>

<div *ngIf="authState === 'signedin' && user" class="App">
  <amplify-greetings [username]="user.username"></amplify-greetings>
</div>
```

</docs-filter>
<docs-filter framework="vue">

_App.vue_

```html
<template>
  <div>
    <amplify-authenticator
      v-if="authState !== 'signedin'"
    ></amplify-authenticator>
    <div v-if="authState === 'signedin' && user">
      <amplify-greetings :username="user.username"></amplify-greetings>
    </div>
  </div>
</template>
```

<amplify-block-switcher>
<amplify-block name="Vue 3">

```js
import {onAuthUIStateChange} from "@aws-amplify/ui-components";

export default {
  name: "AuthStateApp",
  created() {
    this.unsubscribeAuth = onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData;
    });
  },
  data() {
    return {
      user: undefined,
      authState: undefined,
      unsubscribeAuth: undefined,
    };
  },
  beforeUnmount() {
    this.unsubscribeAuth();
  },
};
```

</amplify-block>
<amplify-block name="Vue 2">

```js
import {onAuthUIStateChange} from "@aws-amplify/ui-components";

export default {
  name: "AuthStateApp",
  created() {
    this.unsubscribeAuth = onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData;
    });
  },
  data() {
    return {
      user: undefined,
      authState: undefined,
      unsubscribeAuth: undefined,
    };
  },
  beforeDestroy() {
    this.unsubscribeAuth();
  },
};
```

</amplify-block>
</amplify-block-switcher>

</docs-filter>

<ui-component-props tag="amplify-greetings" prop-type="attr"></ui-component-props>

<ui-component-props tag="amplify-greetings" prop-type="css"></ui-component-props>

<ui-component-props tag="amplify-greetings" prop-type="slots"></ui-component-props>

<docs-filter framework="react">

### withAuthenticator

<inline-fragment src="~/ui/auth/fragments/react/withauthenticator.md"></inline-fragment>

You can also pass in any of the [AmplifyAuthenticator props](#props-attr-amplify-authenticator):

```jsx
export withAuthenticator(App, {initialAuthState: 'signup'});
```

</docs-filter>

## Methods & Enums

### AuthState

`AuthState` is an enum with the following values:

```js
enum AuthState {
  SignUp = 'signup',
  SignOut = 'signout',
  SignIn = 'signin',
  Loading = 'loading',
  SignedOut = 'signedout',
  SignedIn = 'signedin',
  SigningUp = 'signingup',
  ConfirmSignUp = 'confirmSignUp',
  confirmingSignUpCustomFlow = 'confirmsignupcustomflow',
  ConfirmSignIn = 'confirmSignIn',
  confirmingSignInCustomFlow = 'confirmingsignincustomflow',
  VerifyingAttributes = 'verifyingattributes',
  ForgotPassword = 'forgotpassword',
  ResetPassword = 'resettingpassword',
  SettingMFA = 'settingMFA',
  TOTPSetup = 'TOTPSetup',
  CustomConfirmSignIn = 'customConfirmSignIn',
  VerifyContact = 'verifyContact'
}
```

**Usage**

```js
import {AuthState, onAuthUIStateChange} from "@aws-amplify/ui-components";

onAuthUIStateChange((nextAuthState, authData) => {
  if (nextAuthState === AuthState.SignedIn) {
    console.log("user successfully signed in!");
  }
});
```

### onAuthUIStateChange

`onAuthUIStateChange` is a function that will fire whenever the state of the Authentication UI component changes.

**Usage**

```js
import {AuthState, onAuthUIStateChange} from "@aws-amplify/ui-components";

onAuthUIStateChange((nextAuthState, authData) => {
  if (nextAuthState === AuthState.SignedIn) {
    console.log("user successfully signed in!");
    console.log("user data: ", authData);
  }
  if (!authData) {
    console.log("user is not signed in...");
  }
});
```

<docs-filter framework="react">
  <inline-fragment src="~/ui/auth/fragments/react/handleauthstatechange.md"></inline-fragment>
</docs-filter>

## Use Cases

### Manage Auth State and Conditional app rendering

<docs-filter framework="react">
  <inline-fragment src="~/ui/auth/fragments/react/auth-state-management.md"></inline-fragment>
</docs-filter>

<docs-filter framework="angular">
  <inline-fragment src="~/ui/auth/fragments/angular/auth-state-management.md"></inline-fragment>
</docs-filter>

<docs-filter framework="ionic">
  <inline-fragment src="~/ui/auth/fragments/ionic/auth-state-management.md"></inline-fragment>
</docs-filter>

<docs-filter framework="vue">
  <inline-fragment src="~/ui/auth/fragments/vue/auth-state-management.md"></inline-fragment>
</docs-filter>

### Authenticate with email or phone number

The `amplify-authenticator` component has the ability to sign in / sign up with `email` or `phone_number` instead of default `username`.

To achieve this, you first need to setup the userpool to allow email or phone number as the username [using the cli workflow](~/cli/auth/overview.md#configuring-auth-without-social-providers) or through the [Cognito Console](https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-settings-attributes.html#user-pool-settings-aliases-settings-option-2). To reflect this in the `amplify-authenticator` component, you can use the `usernameAlias` property. It can take one of the three values - `email`, `phone_number` or `username`. Default is set to `username`.

<docs-filter framework="react">

```jsx
<AmplifyAuthenticator usernameAlias="email"></AmplifyAuthenticator>
```

</docs-filter>
<docs-filter framework="angular">

```html
<amplify-authenticator username-alias="email"></amplify-authenticator>
```

</docs-filter>
<docs-filter framework="ionic">

```html
<amplify-authenticator username-alias="email"></amplify-authenticator>
```

</docs-filter>
<docs-filter framework="vue">

```html
<amplify-authenticator username-alias="email"></amplify-authenticator>
```

</docs-filter>

### Override Sign Up

You can override the call to [`signUp`](~/lib/auth/emailpassword.md) function with `handleSignUp` property. For example, you can add a [custom attribute](~/lib/auth/emailpassword.md) like so:


<docs-filter framework="react">

<inline-fragment src="~/ui/auth/fragments/react/overriding-sign-up-submit.md"></inline-fragment>

</docs-filter>

<docs-filter framework="angular">

<inline-fragment src="~/ui/auth/fragments/angular/overriding-sign-up-submit.md"></inline-fragment>

</docs-filter>

<docs-filter framework="ionic">

<inline-fragment src="~/ui/auth/fragments/angular/overriding-sign-up-submit.md"></inline-fragment>

</docs-filter>

<docs-filter framework="vue">

<inline-fragment src="~/ui/auth/fragments/vue/overriding-sign-up-submit.md"></inline-fragment>

</docs-filter>

## Migration

To migrate from using the `aws-amplify-<framework>` library to the latest `@aws-amplify/ui-<framework>` library use the steps below:

<inline-fragment src="~/ui/fragments/web/installation-diff.md"></inline-fragment>

### Usage

<docs-filter framework="react">

```diff
- import { Authenticator } from 'aws-amplify-react';
+ import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';

const App = () => (

+ <AmplifyAuthenticator>
- <Authenticator>
    <div>
      My App
+     <AmplifySignOut />
    </div>
+ </AmplifyAuthenticator>;
- </Authenticator>
);
```

If you are using `withAuthenticator`:

```diff
- import { withAuthenticator } from 'aws-amplify-react';
+ import { withAuthenticator } from '@aws-amplify/ui-react';
```

```jsx
export default withAuthenticator(App);
```

<docs-filter framework="react">

### Breaking changes for withAuthenticator

<amplify-callout warning>

We have deprecated some of the properties passed into `withAuthenticator`. If you were providing additional options to `withAuthenticator` (e.g. `includeGreetings`, `authenticatorComponents`, `federated`, `theme`), these have changed. Refer to the updated list of [Properties here](~/ui/auth/authenticator.md/q/framework/react#props-attr-amplify-authenticator).

</amplify-callout>

The previous `withAuthenticator` component would render a Greetings and Sign Out button at the top of your app after logging in. If you would like to add a Greetings or Sign Out button to your app you can add the [`AmplifyGreetings`](#greetings) or [`AmplifySignOut`](#sign-out) component to your app. Visit the [`withAuthenticator` example](#withauthenticator) above to see this.

</docs-filter>

</docs-filter>
<docs-filter framework="angular">

<inline-fragment src="~/ui/fragments/angular/configure-module-diff.md"></inline-fragment>

</docs-filter>
<docs-filter framework="ionic">

<inline-fragment src="~/ui/fragments/angular/configure-module-diff.md"></inline-fragment>

</docs-filter>
<docs-filter framework="vue">

<inline-fragment src="~/ui/fragments/vue/configure-app-diff.md"></inline-fragment>

</docs-filter>
