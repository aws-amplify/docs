<amplify-authenticator></amplify-authenticator>

## Installation

```
yarn add aws-amplify@ui-preview @aws-amplify/ui-react@ui-preview
```

## Usage

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

```js
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

<ui-component-props tag="amplify-sign-in"></ui-component-props>

### Sign Up

<amplify-sign-up header-text="My Custom Sign Up Text"></amplify-sign-up>

**Usage**

```js
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

<ui-component-props tag="amplify-sign-up"></ui-component-props>

### Sign Out

<amplify-sign-out button-text="Custom Text"></amplify-sign-out>

**Usage**

```js
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

<ui-component-props tag="amplify-sign-out"></ui-component-props>

### Confirm Sign In

<amplify-confirm-sign-in header-text="My Custom Confirm Sign In Text"></amplify-confirm-sign-in>

**Usage**

```js
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

<ui-component-props tag="amplify-confirm-sign-in"></ui-component-props>

### Confirm Sign Up

<amplify-confirm-sign-up header-text="My Custom Confirm Sign Up Text"></amplify-confirm-sign-up>

**Usage**

```js
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

<ui-component-props tag="amplify-confirm-sign-up"></ui-component-props>

### Forgot Password

<amplify-forgot-password header-text="My Custom Forgot Password Text"></amplify-forgot-password>

**Usage**

```js
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

<ui-component-props tag="amplify-forgot-password"></ui-component-props>

### Require New Password

<amplify-require-new-password header-text="My Custom Require New Password Text"></amplify-require-new-password>

**Usage**

```js
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

<ui-component-props tag="amplify-require-new-password"></ui-component-props>

### TOTP Setup

**Usage**

```js
import React from 'react';
import { AmplifyAuthenticator, AmplifyRequireNewPassword, AmplifySignOut } from '@aws-amplify/ui-react';

const App = () => (
  <AmplifyAuthenticator>
    <AmplifyRequireNewPassword headerText="My Custom TOTP Setup Text" slot="totp-setup"></AmplifyRequireNewPassword>

    <div>
      My App
      <AmplifySignOut></AmplifySignOut>
    </div>
  </AmplifyAuthenticator>
);
```

<ui-component-props tag="amplify-totp-setup"></ui-component-props>

### Verify Contact

```js
import React from 'react';
import { AmplifyAuthenticator, AmplifyVerifyContract, AmplifySignOut } from '@aws-amplify/ui-react';

const App = () => (
  <AmplifyAuthenticator>
    <AmplifyVerifyContract headerText="My Custom Verify Contact Text" slot="verify-contact"></AmplifyVerifyContract>

    <div>
      My App
      <AmplifySignOut></AmplifySignOut>
    </div>
  </AmplifyAuthenticator>
);
```

<ui-component-props tag="amplify-verify-contact"></ui-component-props>

### Greetings

<amplify-greetings></amplify-greetings>

**Usage**

```js
import React from 'react';
import { AmplifyAuthenticator, AmplifyGreetings} from '@aws-amplify/ui-react';

const App = () => (
  <AmplifyAuthenticator>
    <div>
      <AmplifyGreetings></AmplifyGreetings>
      My App
    </div>
  </AmplifyAuthenticator>
);
```

<ui-component-props tag="amplify-greetings"></ui-component-props>
