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

### Custom Form Fields

If you'd like to customize the form fields in the Authenticator Sign In or Sign Up component, you can do so by using the `formFields` property.

The following example highlights the use of Authenticator with customized Sign Up form fields and [authentication with email](#authenticate-with-email-or-phone-number):

<docs-filter framework="react">

```jsx
import React from 'react';
import { AmplifyAuthenticator, AmplifySignUp, AmplifySignOut } from '@aws-amplify/ui-react';

const App = () => {
  return (
    <AmplifyAuthenticator usernameAlias="email">
      <AmplifySignUp
        slot="sign-up"
        usernameAlias="email"
        formFields={[
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
        ]} 
      />
      <AmplifySignIn slot="sign-in" usernameAlias="email" />
    </AmplifyAuthenticator>
  );
};
```
</docs-filter>
<docs-filter framework="angular">

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
  <amplify-sign-in slot="sign-in" usernameAlias="email"></amplify-sign-in>
</amplify-authenticator>
```
</docs-filter>
<docs-filter framework="ionic">

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
  <amplify-sign-in slot="sign-in" usernameAlias="email"></amplify-sign-in>
</amplify-authenticator>
```
</docs-filter>
<docs-filter framework="vue">


```html
<template>
  <amplify-authenticator username-alias="email">
    <amplify-sign-up
      slot="sign-up"
      username-alias="email"
      :form-fields.prop="formFields"
    ></amplify-sign-up>
    <amplify-sign-in slot="sign-in" username-alias="email"></amplify-sign-in>
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
</docs-filter>

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

<docs-filter framework="react">

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
</docs-filter>
<docs-filter framework="angular">

```html
<amplify-authenticator>
  <amplify-sign-in header-text="My Custom Sign In Text" slot="sign-in"></amplify-sign-in>

  <div>
    My App
    <amplify-sign-out></amplify-sign-out>
  </div>
</amplify-authenticator>
```
</docs-filter>
<docs-filter framework="ionic">

```html
<amplify-authenticator>
  <amplify-sign-in header-text="My Custom Sign In Text" slot="sign-in"></amplify-sign-in>

  <div>
    My App
    <amplify-sign-out></amplify-sign-out>
  </div>
</amplify-authenticator>
```
</docs-filter>
<docs-filter framework="vue">

```html
<amplify-authenticator>
  <amplify-sign-in header-text="My Custom Sign In Text" slot="sign-in"></amplify-sign-in>

  <div>
    My App
    <amplify-sign-out></amplify-sign-out>
  </div>
</amplify-authenticator>
```
</docs-filter>



<ui-component-props tag="amplify-sign-in"></ui-component-props>

### Sign Up

<amplify-sign-up header-text="My Custom Sign Up Text"></amplify-sign-up>

**Usage**

<docs-filter framework="react">

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
</docs-filter>
<docs-filter framework="angular">

```html
<amplify-authenticator>
  <amplify-sign-up header-text="My Custom Sign Up Text" slot="sign-up"></amplify-sign-up>

  <div>
    My App
    <amplify-sign-out></amplify-sign-out>
  </div>
</amplify-authenticator>
```
</docs-filter>
<docs-filter framework="ionic">

```html
<amplify-authenticator>
  <amplify-sign-up header-text="My Custom Sign Up Text" slot="sign-up"></amplify-sign-up>

  <div>
    My App
    <amplify-sign-out></amplify-sign-out>
  </div>
</amplify-authenticator>
```
</docs-filter>
<docs-filter framework="vue">

```html
<amplify-authenticator>
  <amplify-sign-up header-text="My Custom Sign Up Text" slot="sign-up"></amplify-sign-up>

  <div>
    My App
    <amplify-sign-out></amplify-sign-out>
  </div>
</amplify-authenticator>
```
</docs-filter>

<ui-component-props tag="amplify-sign-up"></ui-component-props>

### Sign Out

<amplify-sign-out button-text="Custom Text"></amplify-sign-out>

**Usage**

<docs-filter framework="react">

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
</docs-filter>
<docs-filter framework="angular">

```html
<amplify-authenticator>
  <div>
    My App
    <amplify-sign-out button-text="Custom Text"></amplify-sign-out>
  </div>
</amplify-authenticator>
```
</docs-filter>
<docs-filter framework="ionic">

```html
<amplify-authenticator>
  <div>
    My App
    <amplify-sign-out button-text="Custom Text"></amplify-sign-out>
  </div>
</amplify-authenticator>
```
</docs-filter>
<docs-filter framework="vue">

```html
<amplify-authenticator>
  <div>
    My App
    <amplify-sign-out button-text="Custom Text"></amplify-sign-out>
  </div>
</amplify-authenticator>
```
</docs-filter>

<ui-component-props tag="amplify-sign-out"></ui-component-props>

### Confirm Sign In

<amplify-confirm-sign-in header-text="My Custom Confirm Sign In Text"></amplify-confirm-sign-in>

**Usage**

<docs-filter framework="react">

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
</docs-filter>
<docs-filter framework="angular">

```html
<amplify-authenticator>
  <amplify-confirm-sign-in header-text="My Custom Confirm Sign In Text" slot="confirm-sign-in"></amplify-confirm-sign-in>

  <div>
    My App
    <amplify-sign-out></amplify-sign-out>
  </div>
</amplify-authenticator>
```
</docs-filter>
<docs-filter framework="ionic">

```html
<amplify-authenticator>
  <amplify-confirm-sign-in header-text="My Custom Confirm Sign In Text" slot="confirm-sign-in"></amplify-confirm-sign-in>

  <div>
    My App
    <amplify-sign-out></amplify-sign-out>
  </div>
</amplify-authenticator>
```
</docs-filter>
<docs-filter framework="vue">

```html
<amplify-authenticator>
  <amplify-confirm-sign-in header-text="My Custom Confirm Sign In Text" slot="confirm-sign-in"></amplify-confirm-sign-in>

  <div>
    My App
    <amplify-sign-out></amplify-sign-out>
  </div>
</amplify-authenticator>
```
</docs-filter>

<ui-component-props tag="amplify-confirm-sign-in"></ui-component-props>

### Confirm Sign Up

<amplify-confirm-sign-up header-text="My Custom Confirm Sign Up Text"></amplify-confirm-sign-up>

**Usage**

<docs-filter framework="react">

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
</docs-filter>
<docs-filter framework="angular">

```html
<amplify-authenticator>
  <amplify-confirm-sign-up header-text="My Custom Confirm Sign Up Text" slot="confirm-sign-up"></amplify-confirm-sign-up>

  <div>
    My App
    <amplify-sign-out></amplify-sign-out>
  </div>
</amplify-authenticator>
```
</docs-filter>
<docs-filter framework="ionic">

```html
<amplify-authenticator>
  <amplify-confirm-sign-up header-text="My Custom Confirm Sign Up Text" slot="confirm-sign-up"></amplify-confirm-sign-up>

  <div>
    My App
    <amplify-sign-out></amplify-sign-out>
  </div>
</amplify-authenticator>
```
</docs-filter>
<docs-filter framework="vue">

```html
<amplify-authenticator>
  <amplify-confirm-sign-up header-text="My Custom Confirm Sign Up Text" slot="confirm-sign-up"></amplify-confirm-sign-up>

  <div>
    My App
    <amplify-sign-out></amplify-sign-out>
  </div>
</amplify-authenticator>
```
</docs-filter>

<ui-component-props tag="amplify-confirm-sign-up"></ui-component-props>

### Forgot Password

<amplify-forgot-password header-text="My Custom Forgot Password Text"></amplify-forgot-password>

**Usage**

<docs-filter framework="react">

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
</docs-filter>
<docs-filter framework="angular">

```html
<amplify-authenticator>
  <amplify-forgot-password header-text="My Custom Forgot Password Text" slot="forgot-password"></amplify-forgot-password>

  <div>
    My App
    <amplify-sign-out></amplify-sign-out>
  </div>
</amplify-authenticator>
```
</docs-filter>
<docs-filter framework="ionic">

```html
<amplify-authenticator>
  <amplify-forgot-password header-text="My Custom Forgot Password Text" slot="forgot-password"></amplify-forgot-password>

  <div>
    My App
    <amplify-sign-out></amplify-sign-out>
  </div>
</amplify-authenticator>
```
</docs-filter>
<docs-filter framework="vue">

```html
<amplify-authenticator>
  <amplify-forgot-password header-text="My Custom Forgot Password Text" slot="forgot-password"></amplify-forgot-password>

  <div>
    My App
    <amplify-sign-out></amplify-sign-out>
  </div>
</amplify-authenticator>
```
</docs-filter>

<ui-component-props tag="amplify-forgot-password"></ui-component-props>

### Require New Password

<amplify-require-new-password header-text="My Custom Require New Password Text"></amplify-require-new-password>

**Usage**

<docs-filter framework="react">

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
</docs-filter>
<docs-filter framework="angular">

```html
<amplify-authenticator>
  <amplify-require-new-password header-text="My Custom Require New Password Text" slot="require-new-password"></amplify-require-new-password>

  <div>
    My App
    <amplify-sign-out></amplify-sign-out>
  </div>
</amplify-authenticator>
```
</docs-filter>
<docs-filter framework="ionic">

```html
<amplify-authenticator>
  <amplify-require-new-password header-text="My Custom Require New Password Text" slot="require-new-password"></amplify-require-new-password>

  <div>
    My App
    <amplify-sign-out></amplify-sign-out>
  </div>
</amplify-authenticator>
```
</docs-filter>
<docs-filter framework="vue">

```html
<amplify-authenticator>
  <amplify-require-new-password header-text="My Custom Require New Password Text" slot="require-new-password"></amplify-require-new-password>

  <div>
    My App
    <amplify-sign-out></amplify-sign-out>
  </div>
</amplify-authenticator>
```
</docs-filter>

<ui-component-props tag="amplify-require-new-password"></ui-component-props>

### TOTP Setup

**Usage**

<docs-filter framework="react">

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
</docs-filter>
<docs-filter framework="angular">

```html
<amplify-authenticator>
  <amplify-totp-setup header-text="My Custom TOTP Setup Text" slot="totp-setup"></amplify-totp-setup>

  <div>
    My App
    <amplify-sign-out></amplify-sign-out>
  </div>
</amplify-authenticator>
```
</docs-filter>
<docs-filter framework="ionic">

```html
<amplify-authenticator>
  <amplify-totp-setup header-text="My Custom TOTP Setup Text" slot="totp-setup"></amplify-totp-setup>

  <div>
    My App
    <amplify-sign-out></amplify-sign-out>
  </div>
</amplify-authenticator>
```
</docs-filter>
<docs-filter framework="vue">

```html
<amplify-authenticator>
  <amplify-totp-setup header-text="My Custom TOTP Setup Text" slot="totp-setup"></amplify-totp-setup>

  <div>
    My App
    <amplify-sign-out></amplify-sign-out>
  </div>
</amplify-authenticator>
```
</docs-filter>

<ui-component-props tag="amplify-totp-setup"></ui-component-props>

### Verify Contact

<docs-filter framework="react">

```jsx
import React from 'react';
import { AmplifyAuthenticator, AmplifyVerifyContact, AmplifySignOut } from '@aws-amplify/ui-react';

const App = () => (
  <AmplifyAuthenticator>
    <AmplifyVerifyContact headerText="My Custom Verify Contact Text" slot="verify-contact"></AmplifyVerifyContact>

    <div>
      My App
      <AmplifySignOut></AmplifySignOut>
    </div>
  </AmplifyAuthenticator>
);
```
</docs-filter>
<docs-filter framework="angular">

```html
<amplify-authenticator>
  <amplify-verify-contact header-text="My Custom Verify Contact Text" slot="verify-contact"></amplify-verify-contact>

  <div>
    My App
    <amplify-sign-out></amplify-sign-out>
  </div>
</amplify-authenticator>
```
</docs-filter>
<docs-filter framework="ionic">

```html
<amplify-authenticator>
  <amplify-verify-contact header-text="My Custom Verify Contact Text" slot="verify-contact"></amplify-verify-contact>

  <div>
    My App
    <amplify-sign-out></amplify-sign-out>
  </div>
</amplify-authenticator>
```
</docs-filter>
<docs-filter framework="vue">

```html
<amplify-authenticator>
  <amplify-verify-contact header-text="My Custom Verify Contact Text" slot="verify-contact"></amplify-verify-contact>

  <div>
    My App
    <amplify-sign-out></amplify-sign-out>
  </div>
</amplify-authenticator>
```
</docs-filter>

<ui-component-props tag="amplify-verify-contact"></ui-component-props>

### Greetings

<amplify-greetings ></amplify-greetings>

**Usage**

<docs-filter framework="react">

```jsx
import React from 'react';
import { AmplifyAuthenticator, AmplifyGreetings} from '@aws-amplify/ui-react';

const App = () => (
  <AmplifyAuthenticator>
    <div>
      <AmplifyGreetings username="Test Username"></AmplifyGreetings>
      My App
    </div>
  </AmplifyAuthenticator>
);
```
</docs-filter>
<docs-filter framework="angular">

```html
<amplify-authenticator>
  <div>
    <amplify-greetings></amplify-greetings>
    My App
  </div>
</amplify-authenticator>
```
</docs-filter>
<docs-filter framework="ionic">

```html
<amplify-authenticator>
  <div>
    <amplify-greetings></amplify-greetings>
    My App
  </div>
</amplify-authenticator>
```
</docs-filter>
<docs-filter framework="vue">

```html
<amplify-authenticator>
  <div>
    <amplify-greetings></amplify-greetings>
    My App
  </div>
</amplify-authenticator>
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
const App = () => (
  <AmplifyAuthenticator usernameAlias="email">
    <div>
      My App
      <AmplifySignOut />
    </div>
  </AmplifyAuthenticator>
);
```
</docs-filter>
<docs-filter framework="angular">

```html
<amplify-authenticator username-alias="email">
  <div>
    My App
    <amplify-sign-out></amplify-sign-out>
  </div>
</amplify-authenticator>
```
</docs-filter>
<docs-filter framework="ionic">

```html
<amplify-authenticator username-alias="email">
  <div>
    My App
    <amplify-sign-out></amplify-sign-out>
  </div>
</amplify-authenticator>
```
</docs-filter>
<docs-filter framework="vue">

```html
<amplify-authenticator username-alias="email">
  <div>
    My App
    <amplify-sign-out></amplify-sign-out>
  </div>
</amplify-authenticator>
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
