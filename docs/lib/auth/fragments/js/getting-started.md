> Prerequisite: [Install and configure](~/cli/start/install.md) the Amplify CLI

## Authentication with Amplify

The Amplify Framework uses [Amazon Cognito](https://aws.amazon.com/cognito/) as the main authentication provider. Amazon Cognito is a robust user directory service that handles user registration, authentication, account recovery & other operations. In this tutorial, you'll learn how to add authentication to your application using Amazon Cognito and username/password login.

## Create authentication service
To start from scratch, run the following command in your project's root folder:

> If you want to re-use an existing authentication resource from AWS (e.g. Amazon Cognito UserPool or Identity Pool) refer to [this section](~/lib/auth/start.md#re-use-existing-authentication-resource).

```sh
amplify add auth

? Do you want to use the default authentication and security configuration? Default configuration
? How do you want users to be able to sign in? Username
? Do you want to configure advanced settings?  No, I am done.
```

To deploy the service, run the `push` command:

```sh
amplify push

? Are you sure you want to continue? Y
```

Now, the authentication service has been deployed and you can start using it. To view the deployed services in your project at any time, go to Amplify Console by running the following command:

```sh
amplify console
```

## Configure your application

Add Amplify to your app with `yarn` or `npm`:

```bash
npm install aws-amplify
```

In your app's entry point (i.e. __App.js__, __index.js__, or __main.js__), import and load the configuration file:

```javascript
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);
```

## Enable sign-up, sign-in, and sign-out

There are two ways to add authentication capabilities to your application.

1. [Use pre-built UI components](#n1-use-pre-built-ui-components)

2. [Call Authentication APIs manually](#n2-call-authentication-apis-manually)

## 1. Use pre-built UI components

Creating the login flow can be quite difficult and time consuming to get right. Amplify Framework has authentication UI components you can use that will provide the entire authentication flow for you, using your configuration specified in your __aws-exports.js__ file.

Amplify has pre-built UI components for the the following frameworks:

- [React](#react)
- [Vue](#vue)
- [Angular](#angular)
- [React Native](#react-native)

## React

First, install the `@aws-amplify/ui-react` library as well as `aws-amplify` if you have not already:

```sh
npm install aws-amplify @aws-amplify/ui-react
```

Next, open __src/App.js__ and add the `withAuthenticator` component.

<inline-fragment src="~/ui/auth/fragments/react/withauthenticator.md"></inline-fragment>

## Vue

First, install the `@aws-amplify/ui-vue` library as well as `aws-amplify` if you have not already:

```sh
npm install aws-amplify @aws-amplify/ui-vue
```

Now open __src/main.js__ and add the following below your last import:

```js
import '@aws-amplify/ui-vue';
```

Next, open __src/App.js__ and add the `amplify-authenticator` component.

### amplify-authenticator

The `amplify-authenticator` component offers a simple way to add authentication flows into your app. This component encapsulates an authentication workflow in the framework of your choice and is backed by the cloud resources set up in your Auth cloud resources. You’ll also notice the `amplify-sign-out` component. This is an optional component if you’d like to render a sign out button.


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

## Angular

First, install the `@aws-amplify/ui-angular` library as well as `aws-amplify` if you have not already:

```sh
npm install aws-amplify @aws-amplify/ui-angular
```

Now open __app.module.ts__ and add the Amplify imports and configuration:

```js
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

/* Add Amplify imports */
import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';

/* Configure Amplify resources */
Amplify.configure(awsconfig);

@NgModule({
  declarations: [AppComponent],
  imports: [AmplifyUIAngularModule /* Add Amplify module */, BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

Next, open __app.component.html__ and add the `amplify-authenticator` component.

### amplify-authenticator

The `amplify-authenticator` component offers a simple way to add authentication flows into your app. This component encapsulates an authentication workflow in the framework of your choice and is backed by the cloud resources set up in your Auth cloud resources. You’ll also notice the `amplify-sign-out` component. This is an optional component if you’d like to render a sign out button.


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

## React Native

<inline-fragment src="~/start/getting-started/fragments/reactnative/getting-started-steps.md"></inline-fragment>

### Integrate with the front end

Open __App.js__ and make the following changes:

1. Import the `withAuthenticator` component:

```javascript
import { withAuthenticator } from 'aws-amplify-react-native'
```

2. Change the default export to be the `withAuthenticator` wrapping the main component:

```javascript
export default withAuthenticator(App)
```

## 2. Call Authentication APIs manually

Follow the instructions in the [Sign in, Sign up and Sign out](~/lib/auth/emailpassword.md) to learn about how to integrate these authentication flows in your application with the Auth APIs.

## Summary

To implement authentication flows using Amplify you can either use the Amplify UI libraries or call authentication methods directly on the `Auth` class.

`Auth` has over 30 methods including [`signUp`](~/lib/auth/emailpassword.md#sign-up), [`signIn`](~/lib/auth/emailpassword.md#sign-in), [`forgotPasword`](~/lib/auth/manageusers.md#forgot-password), and [`signOut`](~/lib/auth/emailpassword.md#sign-out) that allow you full control over all aspects of the user authentication flow.

Check out the complete API [here](https://aws-amplify.github.io/amplify-js/api/classes/authclass.html).