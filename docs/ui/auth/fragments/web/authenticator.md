<amplify-authenticator></amplify-authenticator>

## Installation

<docs-filter framework="react">

```
yarn add aws-amplify @aws-amplify/ui-react
```
</docs-filter>
<docs-filter framework="angular">

```
yarn add aws-amplify @aws-amplify/ui-angular
```
</docs-filter>
<docs-filter framework="ionic">

```
yarn add aws-amplify @aws-amplify/ui-angular
```
</docs-filter>
<docs-filter framework="vue">

```
yarn add aws-amplify @aws-amplify/ui-vue
```
</docs-filter>

## Usage

### Basic Usage

<docs-filter framework="react">

```jsx
import React from 'react';
import Amplify from 'aws-amplify';
import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import awsconfig from './aws-exports';

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

<docs-filter framework="angular">

_app.module.ts_

```js
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

@NgModule({
  declarations: [AppComponent],
  imports: [AmplifyUIAngularModule, BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

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

<docs-filter framework="ionic">

_app.module.ts_

```js
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

@NgModule({
  declarations: [AppComponent],
  imports: [AmplifyUIAngularModule, BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

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

_main.js_

```js
import Vue from 'vue';
import App from './App.vue';
import '@aws-amplify/ui-vue';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

new Vue({
  render: h => h(App),
}).$mount('#app');
```

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

<ui-component-props tag="amplify-authenticator" use-table-headers></ui-component-props>

## Customization

### Slots

Amplify UI Components use `slots` based off of the [Web Components slot element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot) which allow developers to customize and compose the components inside of the Authenticator's state machine.

| Name                     | Description                                                                                                            |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| `sign-in`              | Content placed inside of the sign in workflow for when a user wants to sign into their account                         |
| `confirm-sign-in`      | Content placed inside of the confirm sign in workflow for when a user needs to confirm the account they signed in with |
| `sign-up`              | Content placed inside of the sign up workflow for when a user wants to register a new account                          |
| `confirm-sign-up`      | Content placed inside of the confirm sign up workflow for when a user needs to confirm the account they signed up with |
| `forgot-password`      | Content placed inside of the forgot password workflow for when a user wants to reset their password                    |
| `require-new-password` | Content placed inside of the require new password workflow for when a user is required to update their password        |
| `verify-contact`       | Content placed inside of the verify-contact workflow for when a user must verify their contact information             |
| `totp-setup`           | Content placed inside of the totp-setup workflow for when a user opts to use TOTP MFA                                  |
| `greetings`            | Content placed inside of the greetings navigation for when a user is signed in                                         |
| `loading`              | Content placed inside of the loading workflow for when the app is loading                                              |

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
  <AmplifySignIn headerText="My Custom Sign In Text" slot="sign-in"></AmplifySignIn>
</AmplifyAuthenticator>
```
</docs-filter>

<docs-filter framework="angular">

```html
<amplify-authenticator>
  <amplify-sign-in header-text="My Custom Sign In Text" slot="sign-in"></amplify-sign-in>
</amplify-authenticator>
```
</docs-filter>

<docs-filter framework="ionic">

```html
<amplify-authenticator>
  <amplify-sign-in header-text="My Custom Sign In Text" slot="sign-in"></amplify-sign-in>
</amplify-authenticator>
```
</docs-filter>

<docs-filter framework="vue">

```html
<amplify-authenticator>
  <amplify-sign-in header-text="My Custom Sign In Text" slot="sign-in"></amplify-sign-in>
</amplify-authenticator>
```
</docs-filter>

<ui-component-props tag="amplify-sign-in"></ui-component-props>

### Sign Up

<amplify-sign-up header-text="My Custom Sign Up Text"></amplify-sign-up>

**Usage**

<docs-filter framework="react">

```jsx
<AmplifyAuthenticator>
  <AmplifySignUp headerText="My Custom Sign Up Text" slot="sign-up"></AmplifySignUp>
</AmplifyAuthenticator>
```
</docs-filter>
<docs-filter framework="angular">

```html
<amplify-authenticator>
  <amplify-sign-up header-text="My Custom Sign Up Text" slot="sign-up"></amplify-sign-up>
</amplify-authenticator>
```
</docs-filter>
<docs-filter framework="ionic">

```html
<amplify-authenticator>
  <amplify-sign-up header-text="My Custom Sign Up Text" slot="sign-up"></amplify-sign-up>
</amplify-authenticator>
```
</docs-filter>
<docs-filter framework="vue">

```html
<amplify-authenticator>
  <amplify-sign-up header-text="My Custom Sign Up Text" slot="sign-up"></amplify-sign-up>
</amplify-authenticator>
```
</docs-filter>

<ui-component-props tag="amplify-sign-up"></ui-component-props>

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

<ui-component-props tag="amplify-sign-out"></ui-component-props>

### Confirm Sign In

<amplify-confirm-sign-in header-text="My Custom Confirm Sign In Text"></amplify-confirm-sign-in>

**Usage**

<docs-filter framework="react">

```jsx
<AmplifyAuthenticator>
  <AmplifyConfirmSignIn headerText="My Custom Confirm Sign In Text" slot="confirm-sign-in"></AmplifyConfirmSignIn>
</AmplifyAuthenticator>
```
</docs-filter>
<docs-filter framework="angular">

```html
<amplify-authenticator>
  <amplify-confirm-sign-in header-text="My Custom Confirm Sign In Text" slot="confirm-sign-in"></amplify-confirm-sign-in>
</amplify-authenticator>
```
</docs-filter>
<docs-filter framework="ionic">

```html
<amplify-authenticator>
  <amplify-confirm-sign-in header-text="My Custom Confirm Sign In Text" slot="confirm-sign-in"></amplify-confirm-sign-in>
</amplify-authenticator>
```
</docs-filter>
<docs-filter framework="vue">

```html
<amplify-authenticator>
  <amplify-confirm-sign-in header-text="My Custom Confirm Sign In Text" slot="confirm-sign-in"></amplify-confirm-sign-in>
</amplify-authenticator>
```
</docs-filter>

<ui-component-props tag="amplify-confirm-sign-in"></ui-component-props>

### Confirm Sign Up

<amplify-confirm-sign-up header-text="My Custom Confirm Sign Up Text"></amplify-confirm-sign-up>

**Usage**

<docs-filter framework="react">

```jsx
<AmplifyAuthenticator>
  <AmplifyConfirmSignIn headerText="My Custom Confirm Sign Up Text" slot="confirm-sign-up"></AmplifyConfirmSignIn>
</AmplifyAuthenticator>
```
</docs-filter>
<docs-filter framework="angular">

```html
<amplify-authenticator>
  <amplify-confirm-sign-up header-text="My Custom Confirm Sign Up Text" slot="confirm-sign-up"></amplify-confirm-sign-up>
</amplify-authenticator>
```
</docs-filter>
<docs-filter framework="ionic">

```html
<amplify-authenticator>
  <amplify-confirm-sign-up header-text="My Custom Confirm Sign Up Text" slot="confirm-sign-up"></amplify-confirm-sign-up>
</amplify-authenticator>
```
</docs-filter>
<docs-filter framework="vue">

```html
<amplify-authenticator>
  <amplify-confirm-sign-up header-text="My Custom Confirm Sign Up Text" slot="confirm-sign-up"></amplify-confirm-sign-up>
</amplify-authenticator>
```
</docs-filter>

<ui-component-props tag="amplify-confirm-sign-up"></ui-component-props>

### Forgot Password

<amplify-forgot-password header-text="My Custom Forgot Password Text"></amplify-forgot-password>

**Usage**

<docs-filter framework="react">

```jsx
<AmplifyAuthenticator>
  <AmplifyForgotPassword headerText="My Custom Forgot Password Text" slot="forgot-password"></AmplifyForgotPassword>
</AmplifyAuthenticator>

```
</docs-filter>
<docs-filter framework="angular">

```html
<amplify-authenticator>
  <amplify-forgot-password header-text="My Custom Forgot Password Text" slot="forgot-password"></amplify-forgot-password>
</amplify-authenticator>
```
</docs-filter>
<docs-filter framework="ionic">

```html
<amplify-authenticator>
  <amplify-forgot-password header-text="My Custom Forgot Password Text" slot="forgot-password"></amplify-forgot-password>
</amplify-authenticator>
```
</docs-filter>
<docs-filter framework="vue">

```html
<amplify-authenticator>
  <amplify-forgot-password header-text="My Custom Forgot Password Text" slot="forgot-password"></amplify-forgot-password>
</amplify-authenticator>
```
</docs-filter>

<ui-component-props tag="amplify-forgot-password"></ui-component-props>

### Require New Password

<amplify-require-new-password header-text="My Custom Require New Password Text"></amplify-require-new-password>

**Usage**

<docs-filter framework="react">

```jsx
<AmplifyAuthenticator>
  <AmplifyRequireNewPassword headerText="My Custom Require New Password Text" slot="require-new-password"></AmplifyRequireNewPassword>
</AmplifyAuthenticator>
```
</docs-filter>
<docs-filter framework="angular">

```html
<amplify-authenticator>
  <amplify-require-new-password header-text="My Custom Require New Password Text" slot="require-new-password"></amplify-require-new-password>
</amplify-authenticator>
```
</docs-filter>
<docs-filter framework="ionic">

```html
<amplify-authenticator>
  <amplify-require-new-password header-text="My Custom Require New Password Text" slot="require-new-password"></amplify-require-new-password>
</amplify-authenticator>
```
</docs-filter>
<docs-filter framework="vue">

```html
<amplify-authenticator>
  <amplify-require-new-password header-text="My Custom Require New Password Text" slot="require-new-password"></amplify-require-new-password>
</amplify-authenticator>
```
</docs-filter>

<ui-component-props tag="amplify-require-new-password"></ui-component-props>

### TOTP Setup

**Usage**

<docs-filter framework="react">

```jsx
<AmplifyAuthenticator>
  <AmplifyTOTPSetup headerText="My Custom TOTP Setup Text" slot="totp-setup"></AmplifyTOTPSetup>
</AmplifyAuthenticator>
```
</docs-filter>
<docs-filter framework="angular">

```html
<amplify-authenticator>
  <amplify-totp-setup header-text="My Custom TOTP Setup Text" slot="totp-setup"></amplify-totp-setup>
</amplify-authenticator>
```
</docs-filter>
<docs-filter framework="ionic">

```html
<amplify-authenticator>
  <amplify-totp-setup header-text="My Custom TOTP Setup Text" slot="totp-setup"></amplify-totp-setup>
</amplify-authenticator>
```
</docs-filter>
<docs-filter framework="vue">

```html
<amplify-authenticator>
  <amplify-totp-setup header-text="My Custom TOTP Setup Text" slot="totp-setup"></amplify-totp-setup>
</amplify-authenticator>
```
</docs-filter>

<ui-component-props tag="amplify-totp-setup"></ui-component-props>

### Verify Contact

<docs-filter framework="react">

```jsx
<AmplifyAuthenticator>
  <AmplifyVerifyContact headerText="My Custom Verify Contact Text" slot="verify-contact"></AmplifyVerifyContact>
</AmplifyAuthenticator>
```
</docs-filter>
<docs-filter framework="angular">

```html
<amplify-authenticator>
  <amplify-verify-contact header-text="My Custom Verify Contact Text" slot="verify-contact"></amplify-verify-contact>
</amplify-authenticator>
```
</docs-filter>
<docs-filter framework="ionic">

```html
<amplify-authenticator>
  <amplify-verify-contact header-text="My Custom Verify Contact Text" slot="verify-contact"></amplify-verify-contact>
</amplify-authenticator>
```
</docs-filter>
<docs-filter framework="vue">

```html
<amplify-authenticator>
  <amplify-verify-contact header-text="My Custom Verify Contact Text" slot="verify-contact"></amplify-verify-contact>
</amplify-authenticator>
```
</docs-filter>

<ui-component-props tag="amplify-verify-contact"></ui-component-props>

### Greetings

<amplify-greetings username="username"></amplify-greetings>

**Usage**

<docs-filter framework="react">

```jsx
import React from 'react';
import './App.css';
import Amplify from 'aws-amplify';
import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

const GreetingsApp = () => {
    const [authState, setAuthState] = React.useState();
    const [user, setUser] = React.useState();

    React.useEffect(() => {
        return onAuthUIStateChange((nextAuthState, authData) => {
            setAuthState(nextAuthState);
            setUser(authData)
        });
    }, []);

  return authState === AuthState.SignedIn && user ? (
      <div className="App">
        <AmplifyGreetings username={user.username}></AmplifyGreetings>
      </div>
	) : (
      <AmplifyAuthenticator />
  );
}

export default GreetingsApp;
```
</docs-filter>
<docs-filter framework="angular">

```js
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
import Amplify from 'aws-amplify';
import awsconfig from '../aws-exports';

Amplify.configure(awsconfig);

@NgModule({
  declarations: [AppComponent],
  imports: [AmplifyUIAngularModule, BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

Replace the content inside of *app.component.ts* with the following:
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

Replace the content inside of *app.component.html* with the following:
```html
<amplify-authenticator *ngIf="authState !== 'signedin'"></amplify-authenticator>

<div *ngIf="authState === 'signedin' && user" class="App">
    <amplify-greetings [username]="user.username"></amplify-greetings>
</div>
```
</docs-filter>
<docs-filter framework="ionic">

```js
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
import Amplify from 'aws-amplify';
import awsconfig from '../aws-exports';

Amplify.configure(awsconfig);

@NgModule({
  declarations: [AppComponent],
  imports: [AmplifyUIAngularModule, BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

Replace the content inside of *app.component.ts* with the following:
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

Replace the content inside of *app.component.html* with the following:
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
    <amplify-authenticator v-if="authState !== 'signedin'"></amplify-authenticator>
    <div v-if="authState === 'signedin' && user">
      <amplify-greetings :username="user.username"></amplify-greetings>
    </div>
  </div>
</template>
```
```js
import { onAuthUIStateChange } from '@aws-amplify/ui-components'

export default {
  name: 'AuthStateApp',
  created() {
    onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData;
    })
  },
  data() {
    return {
      user: undefined,
      authState: undefined
    }
  },
  beforeDestroy() {
    return onAuthUIStateChange;
  }
}
```
</docs-filter>

<ui-component-props tag="amplify-greetings"></ui-component-props>

<docs-filter framework="react">

### withAuthenticator

<inline-fragment src="~/ui/auth/fragments/react/withauthenticator.md"></inline-fragment>

You can also pass in any of the [AmplifyAuthenticator props](#props-amplify-authenticator):

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
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components`;

onAuthUIStateChange((nextAuthState, authData) => {
  if (nextAuthState === AuthState.SignedIn) {
    console.log('user successfully signed in!');
  }
});
```

### onAuthUIStateChange

`onAuthUIStateChange` is a function that will fire whenever the state of the Authentication UI component changes.

**Usage**

```js
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components`;

onAuthUIStateChange((nextAuthState, authData) => {
  if (nextAuthState === AuthState.SignedIn) {
    console.log('user successfully signed in!');
    console.log('user data: ', authData);
  }
  if (!authData) {
    console.log('user is not signed in...');
  }
});
```

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

## Migration


To migrate from using the `aws-amplify-<framework>` library to the latest `@aws-amplify/ui-<framework>` library use the steps below:

### Installation

<docs-filter framework="react">

```diff
- yarn add aws-amplify-react
+ yarn add @aws-amplify/ui-react
```
</docs-filter>
<docs-filter framework="angular">

```diff
- yarn add aws-amplify-angular
+ yarn add @aws-amplify/ui-angular
```
</docs-filter>
<docs-filter framework="ionic">

```diff
- yarn add aws-amplify-angular
+ yarn add @aws-amplify/ui-angular
```
</docs-filter>
<docs-filter framework="vue">

```diff
- yarn add aws-amplify-vue
+ yarn add @aws-amplify/ui-vue
```
</docs-filter>


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

We have deprecated some of the properties passed into `withAuthenticator`. If you were providing additional options to `withAuthenticator` (e.g. `includeGreetings`, `authenticatorComponents`, `federated`, `theme`), these have changed. Refer to the updated list of [Properties here](~/ui/auth/authenticator.md/q/framework/react#props-amplify-authenticator).

</amplify-callout>

The previous `withAuthenticator` component would render a Greetings and Sign Out button at the top of your app after logging in. If you would like to add a Greetings or Sign Out button to your app you can add the [`AmplifyGreetings`](#greetings) or [`AmplifySignOut`](#sign-out) component to your app. Visit the [`withAuthenticator` example](#withauthenticator) above to see this.

</docs-filter>

</docs-filter>
<docs-filter framework="angular">

_app.module.ts_

```diff
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
- import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';
+ import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

@NgModule({
  declarations: [AppComponent],
- imports: [AmplifyAngularModule, BrowserModule],
+ imports: [AmplifyUIAngularModule, BrowserModule],
- providers: [AmplifyService],
+ providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```
</docs-filter>
<docs-filter framework="ionic">

_app.module.ts_

```diff
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
- import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';
+ import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

@NgModule({
  declarations: [AppComponent],
- imports: [AmplifyAngularModule, BrowserModule],
+ imports: [AmplifyUIAngularModule, BrowserModule],
- providers: [AmplifyService],
+ providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```
</docs-filter>
<docs-filter framework="vue">

_main.ts_

```diff
import Vue from 'vue';
import App from "./App.vue";
- import Amplify, * as AmplifyModules from 'aws-amplify'
- import { AmplifyPlugin } from 'aws-amplify-vue'
+ import '@aws-amplify/ui-vue';
+ import Amplify from 'aws-amplify';
+ import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

new Vue({
  render: h => h(App),
}).$mount('#app');
```

</docs-filter>
