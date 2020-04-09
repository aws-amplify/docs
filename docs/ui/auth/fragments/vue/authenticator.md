<amplify-authenticator></amplify-authenticator>

## Installation

```
yarn add aws-amplify @aws-amplify/ui-vue
```

## Usage

_main.ts_

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

## Components

### Sign In

<amplify-sign-in header-text="My Custom Sign In Text"></amplify-sign-in>

**Usage**

```html
<amplify-authenticator>
  <amplify-sign-in header-text="My Custom Sign In Text" slot="sign-in"></amplify-sign-in>

  <div>
    My App
    <amplify-sign-out></amplify-sign-out>
  </div>
</amplify-authenticator>
```

<ui-component-props tag="amplify-sign-in"></ui-component-props>

### Sign Up

<amplify-sign-up header-text="My Custom Sign Up Text"></amplify-sign-up>

**Usage**

```html
<amplify-authenticator>
  <amplify-sign-up header-text="My Custom Sign Up Text" slot="sign-up"></amplify-sign-up>

  <div>
    My App
    <amplify-sign-out></amplify-sign-out>
  </div>
</amplify-authenticator>
```

<ui-component-props tag="amplify-sign-up"></ui-component-props>

### Sign Out

<amplify-sign-out button-text="Custom Text"></amplify-sign-out>

**Usage**

```html
<amplify-authenticator>
  <div>
    My App
    <amplify-sign-out button-text="Custom Text"></amplify-sign-out>
  </div>
</amplify-authenticator>
```

<ui-component-props tag="amplify-sign-out"></ui-component-props>

### Confirm Sign In

<amplify-confirm-sign-in header-text="My Custom Confirm Sign In Text"></amplify-confirm-sign-in>

**Usage**

```html
<amplify-authenticator>
  <amplify-confirm-sign-in header-text="My Custom Confirm Sign In Text" slot="confirm-sign-in"></amplify-confirm-sign-in>

  <div>
    My App
    <amplify-sign-out></amplify-sign-out>
  </div>
</amplify-authenticator>
```

<ui-component-props tag="amplify-confirm-sign-in"></ui-component-props>

### Confirm Sign Up

<amplify-confirm-sign-up header-text="My Custom Confirm Sign Up Text"></amplify-confirm-sign-up>

**Usage**

```html
<amplify-authenticator>
  <amplify-confirm-sign-up header-text="My Custom Confirm Sign Up Text" slot="confirm-sign-up"></amplify-confirm-sign-up>

  <div>
    My App
    <amplify-sign-out></amplify-sign-out>
  </div>
</amplify-authenticator>
```

<ui-component-props tag="amplify-confirm-sign-up"></ui-component-props>

### Forgot Password

<amplify-forgot-password header-text="My Custom Forgot Password Text"></amplify-forgot-password>

**Usage**

```html
<amplify-authenticator>
  <amplify-forgot-password header-text="My Custom Forgot Password Text" slot="forgot-password"></amplify-forgot-password>

  <div>
    My App
    <amplify-sign-out></amplify-sign-out>
  </div>
</amplify-authenticator>
```

<ui-component-props tag="amplify-forgot-password"></ui-component-props>

### Require New Password

<amplify-require-new-password header-text="My Custom Require New Password Text"></amplify-require-new-password>

**Usage**

```html
<amplify-authenticator>
  <amplify-require-new-password header-text="My Custom Require New Password Text" slot="require-new-password"></amplify-require-new-password>

  <div>
    My App
    <amplify-sign-out></amplify-sign-out>
  </div>
</amplify-authenticator>
```

<ui-component-props tag="amplify-require-new-password"></ui-component-props>

### TOTP Setup

**Usage**

```html
<amplify-authenticator>
  <amplify-totp-setup header-text="My Custom TOTP Setup Text" slot="totp-setup"></amplify-totp-setup>

  <div>
    My App
    <amplify-sign-out></amplify-sign-out>
  </div>
</amplify-authenticator>
```

<ui-component-props tag="amplify-totp-setup"></ui-component-props>

### Verify Contact

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

To achieve this, you first need to setup the userpool to allow email or phone number as the username [using the cli workflow](https://aws-amplify.github.io/docs/cli-toolchain/quickstart#configuring-auth-without-social-providers) or through the [Cognito Console](https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-settings-attributes.html#user-pool-settings-aliases-settings-option-2). To reflect this in the `amplify-authenticator` component, you can use the `usernameAlias` property. It can take one of the three values - `email`, `phone_number` or `username`. Default is set to `username`.

```html
<amplify-authenticator username-alias="email">
  <div>
    My App
    <amplify-sign-out></amplify-sign-out>
  </div>
</amplify-authenticator>
```

## Migration

To migrate from using the `aws-amplify-vue` library to the latest `@aws-amplify/ui-vue` library use the steps below:

### Installation

```diff
- yarn add aws-amplify-vue
+ yarn add @aws-amplify/ui-vue
```

### Usage

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