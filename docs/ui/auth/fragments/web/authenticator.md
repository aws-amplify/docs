<amplify-authenticator></amplify-authenticator>

## Installation

<amplify-block-switcher>
<amplify-block name="React">

```
yarn add aws-amplify @aws-amplify/ui-react
```
</amplify-block>
<amplify-block name="Angular">

```
yarn add aws-amplify @aws-amplify/ui-angular
```
</amplify-block>
<amplify-block name="Ionic">

```
yarn add aws-amplify @aws-amplify/ui-angular
```
</amplify-block>
<amplify-block name="Vue">

```
yarn add aws-amplify @aws-amplify/ui-vue
```
</amplify-block>
</amplify-block-switcher>

## Usage

<amplify-block-switcher>
<amplify-block name="React">

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
</amplify-block>
<amplify-block name="Angular">

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

</amplify-block>
<amplify-block name="Ionic">

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
</amplify-block>
<amplify-block name="Vue">

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
</amplify-block>
</amplify-block-switcher>

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

### Custom Form Fields

If you'd like to customize the form fields in the Authenticator Sign In or Sign Up component, you can do so by using the `formFields` property.

The following example highlights the use of Authenticator with customized Sign Up form fields and [authentication with email](#authenticate-with-email-or-phone-number):

<amplify-block-switcher>
<amplify-block name="React">

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
</amplify-block>
<amplify-block name="Angular">

*app.component.ts*
```js
import { Component } from '@angular/core';
import { FormFieldTypes } from '@aws-amplify/ui-components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  formFields: FormFieldTypes;

  constructor() {
    this.formFields = [
      {
        type: "email",
        label: "Custom email Label",
        placeholder: "custom email placeholder",
        required: true,
      },
      {
        type: "password",
        label: "Custom Password Label",
        placeholder: "custom password placeholder",
        required: true,
      },
      {
        type: "phone_number",
        label: "Custom Phone Label",
        placeholder: "custom Phone placeholder",
        required: false,
      },
    ];
  }
}
```

*app.component.html*

```html
<amplify-authenticator usernameAlias="email">
  <amplify-sign-up
    slot="sign-up"
    usernameAlias="email"
    [formFields]="formFields"
  ></amplify-sign-up>
</amplify-authenticator>
```
</amplify-block>
<amplify-block name="Ionic">

*app.component.ts*
```js
import { Component } from '@angular/core';
import { FormFieldTypes } from '@aws-amplify/ui-components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  formFields: FormFieldTypes;

  constructor() {
    this.formFields = [
      {
        type: "email",
        label: "Custom email Label",
        placeholder: "custom email placeholder",
        required: true,
      },
      {
        type: "password",
        label: "Custom Password Label",
        placeholder: "custom password placeholder",
        required: true,
      },
      {
        type: "phone_number",
        label: "Custom Phone Label",
        placeholder: "custom Phone placeholder",
        required: false,
      },
    ];
  }
}
```

*app.component.html*

```html
<amplify-authenticator usernameAlias="email">
  <amplify-sign-up
    slot="sign-up"
    usernameAlias="email"
    [formFields]="formFields"
  ></amplify-sign-up>
</amplify-authenticator>
```
</amplify-block>
<amplify-block name="Vue">


```html
<template>
  <amplify-authenticator username-alias="email">
    <amplify-sign-up
      slot="sign-up"
      username-alias="email"
      :form-fields.prop="formFields"
    ></amplify-sign-up>
  </amplify-authenticator>
</template>
```
```js
<script>
export default {
  name: 'AuthWithSlots',
  data() {
    return {
      formFields: [
        {
          type: 'email',
          label: 'Custom email Label',
          placeholder: 'custom email placeholder',
          required: true,
        },
        {
          type: 'password',
          label: 'Custom Password Label',
          placeholder: 'custom password placeholder',
          required: true,
        },
        {
          type: 'address',
          label: 'Custom Address Label',
          placeholder: 'Enter your address',
          required: false,
        },
      ]
    }
  }
}
</script>
```
</amplify-block>
</amplify-block-switcher>

Here is an example of the component in use:

<docs-component-playground component-name="AuthenticatorWithSlots"></docs-component-playground>

<amplify-callout warning>

If you are using the `usernameAlias` prop with custom `slots`, keep in mind that you must pass the `usernameAlias` prop value to both the Authenticator and custom slotted component since the slotted component overrides the configuration passed from the Authenticator.

</amplify-callout>

For more details on this customization see the `amplify-form-field` [prop documentation](https://github.com/aws-amplify/amplify-js/tree/master/packages/amplify-ui-components/src/components/amplify-form-field#properties) and the internal [`FormFieldType` interface](https://github.com/aws-amplify/amplify-js/blob/master/packages/amplify-ui-components/src/components/amplify-auth-fields/amplify-auth-fields-interface.ts#L3).

## Components

### Sign In

<amplify-sign-in header-text="My Custom Sign In Text"></amplify-sign-in>

**Usage**

<amplify-block-switcher>
<amplify-block name="React">

```jsx
import React from 'react';
import { AmplifyAuthenticator, AmplifySignIn, AmplifySignOut } from '@aws-amplify/ui-react';

const App = () => (
  <AmplifyAuthenticator>
    <AmplifySignIn headerText="My Custom Sign In Text" slot="sign-in"></AmplifySignIn>

    <div>
      My App
      <AmplifySignOut></AmplifySignOut>
    </div>
  </AmplifyAuthenticator>
);
```
</amplify-block>
<amplify-block name="Angular">

```html
<amplify-authenticator>
  <amplify-sign-in header-text="My Custom Sign In Text" slot="sign-in"></amplify-sign-in>

  <div>
    My App
    <amplify-sign-out></amplify-sign-out>
  </div>
</amplify-authenticator>
```
</amplify-block>
<amplify-block name="Ionic">

```html
<amplify-authenticator>
  <amplify-sign-in header-text="My Custom Sign In Text" slot="sign-in"></amplify-sign-in>

  <div>
    My App
    <amplify-sign-out></amplify-sign-out>
  </div>
</amplify-authenticator>
```
</amplify-block>
<amplify-block name="Vue">

```html
<amplify-authenticator>
  <amplify-sign-in header-text="My Custom Sign In Text" slot="sign-in"></amplify-sign-in>

  <div>
    My App
    <amplify-sign-out></amplify-sign-out>
  </div>
</amplify-authenticator>
```
</amplify-block>
</amplify-block-switcher>



<ui-component-props tag="amplify-sign-in"></ui-component-props>

### Sign Up

<amplify-sign-up header-text="My Custom Sign Up Text"></amplify-sign-up>

**Usage**

<amplify-block-switcher>
<amplify-block name="React">

```jsx
import React from 'react';
import { AmplifyAuthenticator, AmplifySignUp, AmplifySignOut } from '@aws-amplify/ui-react';

const App = () => (
  <AmplifyAuthenticator>
    <AmplifySignUp headerText="My Custom Sign Up Text" slot="sign-up"></AmplifySignUp>

    <div>
      My App
      <AmplifySignOut></AmplifySignOut>
    </div>
  </AmplifyAuthenticator>
);
```
</amplify-block>
<amplify-block name="Angular">

```html
<amplify-authenticator>
  <amplify-sign-up header-text="My Custom Sign Up Text" slot="sign-up"></amplify-sign-up>

  <div>
    My App
    <amplify-sign-out></amplify-sign-out>
  </div>
</amplify-authenticator>
```
</amplify-block>
<amplify-block name="Ionic">

```html
<amplify-authenticator>
  <amplify-sign-up header-text="My Custom Sign Up Text" slot="sign-up"></amplify-sign-up>

  <div>
    My App
    <amplify-sign-out></amplify-sign-out>
  </div>
</amplify-authenticator>
```
</amplify-block>
<amplify-block name="Vue">

```html
<amplify-authenticator>
  <amplify-sign-up header-text="My Custom Sign Up Text" slot="sign-up"></amplify-sign-up>

  <div>
    My App
    <amplify-sign-out></amplify-sign-out>
  </div>
</amplify-authenticator>
```
</amplify-block>
</amplify-block-switcher>

<ui-component-props tag="amplify-sign-up"></ui-component-props>

### Sign Out

<amplify-sign-out button-text="Custom Text"></amplify-sign-out>

**Usage**

<amplify-block-switcher>
<amplify-block name="React">

```jsx
import React from 'react';
import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';

const App = () => (
  <AmplifyAuthenticator>
    <div>
      My App
      <AmplifySignOut buttonText="Custom Text"></AmplifySignOut>
    </div>
  </AmplifyAuthenticator>
);
```
</amplify-block>
<amplify-block name="Angular">

```html
<amplify-authenticator>
  <div>
    My App
    <amplify-sign-out button-text="Custom Text"></amplify-sign-out>
  </div>
</amplify-authenticator>
```
</amplify-block>
<amplify-block name="Ionic">

```html
<amplify-authenticator>
  <div>
    My App
    <amplify-sign-out button-text="Custom Text"></amplify-sign-out>
  </div>
</amplify-authenticator>
```
</amplify-block>
<amplify-block name="Vue">

```html
<amplify-authenticator>
  <div>
    My App
    <amplify-sign-out button-text="Custom Text"></amplify-sign-out>
  </div>
</amplify-authenticator>
```
</amplify-block>
</amplify-block-switcher>

<ui-component-props tag="amplify-sign-out"></ui-component-props>

### Confirm Sign In

<amplify-confirm-sign-in header-text="My Custom Confirm Sign In Text"></amplify-confirm-sign-in>

**Usage**

<amplify-block-switcher>
<amplify-block name="React">

```jsx
import React from 'react';
import { AmplifyAuthenticator, AmplifyConfirmSignIn, AmplifySignOut } from '@aws-amplify/ui-react';

const App = () => (
  <AmplifyAuthenticator>
    <AmplifyConfirmSignIn headerText="My Custom Confirm Sign In Text" slot="confirm-sign-in"></AmplifyConfirmSignIn>

    <div>
      My App
      <AmplifySignOut></AmplifySignOut>
    </div>
  </AmplifyAuthenticator>
);
```
</amplify-block>
<amplify-block name="Angular">

```html
<amplify-authenticator>
  <amplify-confirm-sign-in header-text="My Custom Confirm Sign In Text" slot="confirm-sign-in"></amplify-confirm-sign-in>

  <div>
    My App
    <amplify-sign-out></amplify-sign-out>
  </div>
</amplify-authenticator>
```
</amplify-block>
<amplify-block name="Ionic">

```html
<amplify-authenticator>
  <amplify-confirm-sign-in header-text="My Custom Confirm Sign In Text" slot="confirm-sign-in"></amplify-confirm-sign-in>

  <div>
    My App
    <amplify-sign-out></amplify-sign-out>
  </div>
</amplify-authenticator>
```
</amplify-block>
<amplify-block name="Vue">

```html
<amplify-authenticator>
  <amplify-confirm-sign-in header-text="My Custom Confirm Sign In Text" slot="confirm-sign-in"></amplify-confirm-sign-in>

  <div>
    My App
    <amplify-sign-out></amplify-sign-out>
  </div>
</amplify-authenticator>
```
</amplify-block>
</amplify-block-switcher>

<ui-component-props tag="amplify-confirm-sign-in"></ui-component-props>

### Confirm Sign Up

<amplify-confirm-sign-up header-text="My Custom Confirm Sign Up Text"></amplify-confirm-sign-up>

**Usage**

<amplify-block-switcher>
<amplify-block name="React">

```jsx
import React from 'react';
import { AmplifyAuthenticator, AmplifyConfirmSignIn, AmplifySignOut } from '@aws-amplify/ui-react';

const App = () => (
  <AmplifyAuthenticator>
    <AmplifyConfirmSignIn headerText="My Custom Confirm Sign Up Text" slot="confirm-sign-up"></AmplifyConfirmSignIn>

    <div>
      My App
      <AmplifySignOut></AmplifySignOut>
    </div>
  </AmplifyAuthenticator>
);
```
</amplify-block>
<amplify-block name="Angular">

```html
<amplify-authenticator>
  <amplify-confirm-sign-up header-text="My Custom Confirm Sign Up Text" slot="confirm-sign-up"></amplify-confirm-sign-up>

  <div>
    My App
    <amplify-sign-out></amplify-sign-out>
  </div>
</amplify-authenticator>
```
</amplify-block>
<amplify-block name="Ionic">

```html
<amplify-authenticator>
  <amplify-confirm-sign-up header-text="My Custom Confirm Sign Up Text" slot="confirm-sign-up"></amplify-confirm-sign-up>

  <div>
    My App
    <amplify-sign-out></amplify-sign-out>
  </div>
</amplify-authenticator>
```
</amplify-block>
<amplify-block name="Vue">

```html
<amplify-authenticator>
  <amplify-confirm-sign-up header-text="My Custom Confirm Sign Up Text" slot="confirm-sign-up"></amplify-confirm-sign-up>

  <div>
    My App
    <amplify-sign-out></amplify-sign-out>
  </div>
</amplify-authenticator>
```
</amplify-block>
</amplify-block-switcher>

<ui-component-props tag="amplify-confirm-sign-up"></ui-component-props>

### Forgot Password

<amplify-forgot-password header-text="My Custom Forgot Password Text"></amplify-forgot-password>

**Usage**

<amplify-block-switcher>
<amplify-block name="React">

```jsx
import React from 'react';
import { AmplifyAuthenticator, AmplifyForgotPassword, AmplifySignOut } from '@aws-amplify/ui-react';

const App = () => (
  <AmplifyAuthenticator>
    <AmplifyForgotPassword headerText="My Custom Forgot Password Text" slot="forgot-password"></AmplifyForgotPassword>

    <div>
      My App
      <AmplifySignOut></AmplifySignOut>
    </div>
  </AmplifyAuthenticator>
);
```
</amplify-block>
<amplify-block name="Angular">

```html
<amplify-authenticator>
  <amplify-forgot-password header-text="My Custom Forgot Password Text" slot="forgot-password"></amplify-forgot-password>

  <div>
    My App
    <amplify-sign-out></amplify-sign-out>
  </div>
</amplify-authenticator>
```
</amplify-block>
<amplify-block name="Ionic">

```html
<amplify-authenticator>
  <amplify-forgot-password header-text="My Custom Forgot Password Text" slot="forgot-password"></amplify-forgot-password>

  <div>
    My App
    <amplify-sign-out></amplify-sign-out>
  </div>
</amplify-authenticator>
```
</amplify-block>
<amplify-block name="Vue">

```html
<amplify-authenticator>
  <amplify-forgot-password header-text="My Custom Forgot Password Text" slot="forgot-password"></amplify-forgot-password>

  <div>
    My App
    <amplify-sign-out></amplify-sign-out>
  </div>
</amplify-authenticator>
```
</amplify-block>
</amplify-block-switcher>

<ui-component-props tag="amplify-forgot-password"></ui-component-props>

### Require New Password

<amplify-require-new-password header-text="My Custom Require New Password Text"></amplify-require-new-password>

**Usage**

<amplify-block-switcher>
<amplify-block name="React">

```jsx
import React from 'react';
import { AmplifyAuthenticator, AmplifyRequireNewPassword, AmplifySignOut } from '@aws-amplify/ui-react';

const App = () => (
  <AmplifyAuthenticator>
    <AmplifyRequireNewPassword headerText="My Custom Require New Password Text" slot="require-new-password"></AmplifyRequireNewPassword>

    <div>
      My App
      <AmplifySignOut></AmplifySignOut>
    </div>
  </AmplifyAuthenticator>
);
```
</amplify-block>
<amplify-block name="Angular">

```html
<amplify-authenticator>
  <amplify-require-new-password header-text="My Custom Require New Password Text" slot="require-new-password"></amplify-require-new-password>

  <div>
    My App
    <amplify-sign-out></amplify-sign-out>
  </div>
</amplify-authenticator>
```
</amplify-block>
<amplify-block name="Ionic">

```html
<amplify-authenticator>
  <amplify-require-new-password header-text="My Custom Require New Password Text" slot="require-new-password"></amplify-require-new-password>

  <div>
    My App
    <amplify-sign-out></amplify-sign-out>
  </div>
</amplify-authenticator>
```
</amplify-block>
<amplify-block name="Vue">

```html
<amplify-authenticator>
  <amplify-require-new-password header-text="My Custom Require New Password Text" slot="require-new-password"></amplify-require-new-password>

  <div>
    My App
    <amplify-sign-out></amplify-sign-out>
  </div>
</amplify-authenticator>
```
</amplify-block>
</amplify-block-switcher>

<ui-component-props tag="amplify-require-new-password"></ui-component-props>

### TOTP Setup

**Usage**

<amplify-block-switcher>
<amplify-block name="React">

```jsx
import React from 'react';
import { AmplifyAuthenticator, AmplifyTOTPSetup, AmplifySignOut } from '@aws-amplify/ui-react';

const App = () => (
  <AmplifyAuthenticator>
    <AmplifyTOTPSetup headerText="My Custom TOTP Setup Text" slot="totp-setup"></AmplifyTOTPSetup>

    <div>
      My App
      <AmplifySignOut></AmplifySignOut>
    </div>
  </AmplifyAuthenticator>
);
```
</amplify-block>
<amplify-block name="Angular">

```html
<amplify-authenticator>
  <amplify-totp-setup header-text="My Custom TOTP Setup Text" slot="totp-setup"></amplify-totp-setup>

  <div>
    My App
    <amplify-sign-out></amplify-sign-out>
  </div>
</amplify-authenticator>
```
</amplify-block>
<amplify-block name="Ionic">

```html
<amplify-authenticator>
  <amplify-totp-setup header-text="My Custom TOTP Setup Text" slot="totp-setup"></amplify-totp-setup>

  <div>
    My App
    <amplify-sign-out></amplify-sign-out>
  </div>
</amplify-authenticator>
```
</amplify-block>
<amplify-block name="Vue">

```html
<amplify-authenticator>
  <amplify-totp-setup header-text="My Custom TOTP Setup Text" slot="totp-setup"></amplify-totp-setup>

  <div>
    My App
    <amplify-sign-out></amplify-sign-out>
  </div>
</amplify-authenticator>
```
</amplify-block>
</amplify-block-switcher>

<ui-component-props tag="amplify-totp-setup"></ui-component-props>

### Verify Contact

<amplify-block-switcher>
<amplify-block name="React"></amplify-block>
<amplify-block name="Angular"></amplify-block>
<amplify-block name="Ionic"></amplify-block>
<amplify-block name="Vue"></amplify-block>
</amplify-block-switcher>

```html
<amplify-authenticator>
  <amplify-verify-contact header-text="My Custom Verify Contact Text" slot="verify-contact"></amplify-verify-contact>

  <div>
    My App
    <amplify-sign-out></amplify-sign-out>
  </div>
</amplify-authenticator>
```

<ui-component-props tag="amplify-verify-contact"></ui-component-props>

### Greetings

<amplify-greetings ></amplify-greetings>

**Usage**

<amplify-block-switcher>
<amplify-block name="React"></amplify-block>
<amplify-block name="Angular"></amplify-block>
<amplify-block name="Ionic"></amplify-block>
<amplify-block name="Vue"></amplify-block>
</amplify-block-switcher>

```html
<amplify-authenticator>
  <div>
    <amplify-greetings></amplify-greetings>
    My App
  </div>
</amplify-authenticator>
```

<ui-component-props tag="amplify-greetings"></ui-component-props>

## Use Cases

### Authenticate with email or phone number

The `amplify-authenticator` component has the ability to sign in / sign up with `email` or `phone_number` instead of default `username`. 

To achieve this, you first need to setup the userpool to allow email or phone number as the username [using the cli workflow](~/cli/auth/overview.md#configuring-auth-without-social-providers) or through the [Cognito Console](https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-settings-attributes.html#user-pool-settings-aliases-settings-option-2). To reflect this in the `amplify-authenticator` component, you can use the `usernameAlias` property. It can take one of the three values - `email`, `phone_number` or `username`. Default is set to `username`.

<amplify-block-switcher>
<amplify-block name="React">


</amplify-block>
<amplify-block name="Angular">

```html
<amplify-authenticator username-alias="email">
  <div>
    My App
    <amplify-sign-out></amplify-sign-out>
  </div>
</amplify-authenticator>
```
</amplify-block>
<amplify-block name="Ionic">

```html
<amplify-authenticator username-alias="email">
  <div>
    My App
    <amplify-sign-out></amplify-sign-out>
  </div>
</amplify-authenticator>
```
</amplify-block>
<amplify-block name="Vue">

```html
<amplify-authenticator username-alias="email">
  <div>
    My App
    <amplify-sign-out></amplify-sign-out>
  </div>
</amplify-authenticator>
```
</amplify-block>
</amplify-block-switcher>

## Migration


To migrate from using the `aws-amplify-<framework>` library to the latest `@aws-amplify/ui-<framework>` library use the steps below:

### Installation

<amplify-block-switcher>
<amplify-block name="React">

```diff
- yarn add aws-amplify-react
+ yarn add @aws-amplify/ui-react
```
</amplify-block>
<amplify-block name="Angular">

```diff
- yarn add aws-amplify-angular
+ yarn add @aws-amplify/ui-angular
```
</amplify-block>
<amplify-block name="Ionic">

```diff
- yarn add aws-amplify-angular
+ yarn add @aws-amplify/ui-angular
```
</amplify-block>
<amplify-block name="Vue">

```diff
- yarn add aws-amplify-vue
+ yarn add @aws-amplify/ui-vue
```
</amplify-block>
</amplify-block-switcher>


### Usage

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