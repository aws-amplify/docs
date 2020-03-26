> Prerequisite: [Install and configure](/link) the Amplify CLI

## Authentication with Amplify

The Amplify Framework uses [Amazon Cognito](https://aws.amazon.com/cognito/) as the main authentication provider. Amazon Cognito is a robust user directory service that handles user registration, authentication, account recovery & other operations. In this tutorial, you'll learn how to add authentication to your application using Amazon Cognito and username/password login.

## Create authentication service

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

For React apps install `aws-amplify-react`:

```bash
npm install -S aws-amplify aws-amplify-react
```

For React Native applications, install `aws-amplify-react-native` and link:

```bash
yarn add aws-amplify aws-amplify-react-native
react-native link amazon-cognito-identity-js # DO NOT run this when using Expo or ExpoKit
```

If you are using React Native 0.60.0+, iOS and using Auth methods e.g. `Auth.signIn`, `Auth.signUp`, etc., please run the following commands instead of linking:

```
yarn add amazon-cognito-identity-js
cd ios
pod install --repo-update
```

In your app's entry point i.e. App.js, import and load the configuration file:

```javascript
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);
```

## Enable sign-in/sign-up and sign-out

There are two ways to add authentication capabilites to your application. You can either re-use the pre-built UI components or manually call the sign-in / sign-up and sign-out APIs manually.

### Option 1: Use pre-built UI components

Now that we have our authentication service deployed to AWS, it's time to add authentication to our React app. Creating the login flow can be quite difficult and time consuming to get right. Luckily Amplify Framework has an authentication UI component we can use that will provide the entire authentication flow for us, using our configuration specified in our __aws-exports.js__ file.

#### React

Open __src/App.js__ and make the following changes:

1. Import the `withAuthenticator` component:

```javascript
import { withAuthenticator } from 'aws-amplify-react'
```

2. Change the default export to be the `withAuthenticator` wrapping the main component:

```javascript
export default withAuthenticator(App)
```

Run the app to see the new Authentication flow protecting the app:

```sh
npm start
```

#### React Native

Open __App.js__ and make the following changes:

1. Import the `withAuthenticator` component:

```javascript
import { withAuthenticator } from 'aws-amplify-react-native'
```

2. Change the default export to be the `withAuthenticator` wrapping the main component:

```javascript
export default withAuthenticator(App)
```

Run the app to see the new Authentication flow protecting the app:

**With Expo**

```sh
expo start
```

**With the React Native CLI**

```sh
npx react-native run-ios

# or

npx react-native run-android
```

### Option 2: Call Authentication APIs manually

Follow the instructions in the [Sign in, Sign up and Sign out](~/lib/auth/emailpassword.md) to learn about how to integrate these authentication flows in your application with the Auth APIs.

## Summary

Now you should see the app load with an authentication flow allowing users to sign up and sign in.

In this example, you used the Amplify React UI library and the `withAuthenticator` component to quickly get up and running with a real-world authentication flow.

You can also customize this component to add or remove fields, update styling, or other configurations.

In addition to the `withAuthenticator` you can build custom authentication flows using the `Auth` class.

`Auth` has over 30 methods including [`signUp`](auth/emailpassword?platform=js#sign-up), [`signIn`](auth/emailpassword?platform=js#sign-in), [`forgotPasword`](auth/manageusers?platform=js#forgot-password), and [`signOut`](auth/emailpassword?platform=js#sign-out) that allow you full control over all aspects of the user authentication flow. Check out the complete API [here](https://aws-amplify.github.io/amplify-js/api/classes/authclass.html).