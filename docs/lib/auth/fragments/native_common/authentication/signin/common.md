
Auth category can be used to register a user into the auth plugin and sign-in the registered user using username and password in your app. AWS Cognito Auth Plugin is set up with Amazon Cognito User Pools that manages the users and their properties.

## Prerequisites
* An iOS application targeting at least iOS 11.0
* Integrated with Amplify Auth and ability to sign in with an account
  * For a full example, see: [Auth Getting Started](~/lib/auth/getting-started.md)

## Configure the backend

The backend will be already configured if you have followed the basic setup as mentioned in the prerequisites.

## Register a user

The defaul CLI flow as mentioned in [getting started guide](~/lib/auth/getting-started.md) require a username, password and a valid email id as parameters to register a user. Create a UI to get these values from the user. When you have the needed details invoke the following function to initiate a signUp flow.

<inline-fragment platform="ios" src="~/lib/auth/fragments/ios/authentication/signin/10_signUp.md"></inline-fragment>

The next step for signUp flow will be to confirm the user. A confirmation code will be send to the email id that was given during the above step. Enter the confirmation code received in the email in the next step.

<inline-fragment platform="ios" src="~/lib/auth/fragments/ios/authentication/signin/20_confirmSignUp.md"></inline-fragment>

After this step signUp flow is complete if you see the following in your console window:

```console
Confirm signUp succeeded
```

## Sign in a user 

Implement an UI to get the username and password from the user. After the user enter the username and password you can start the signIn flow by calling the following method:

<inline-fragment platform="ios" src="~/lib/auth/fragments/ios/authentication/signin/30_signIn.md"></inline-fragment>

After this step signIn flow is complete and you will see the following in your console window:

```console
Sign in succeeded
```

You have successfully registered a user and authenticated with that user's username and password using Amplify. The Authentication category supports other mechanisms for authentication such as webUI based signIn, signIn using other providers etc that you can explore below.

## Next steps

- [TODO Thing1]
- [TODO Thing2]
- [TODO Thing3]