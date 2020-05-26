
Auth category can be used to register a user into the auth plugin and sign-in the registered user using username and password in your app. AWS Cognito Auth Plugin is set up with AWS Cognito User Pools that manages the users and their properties.

## Prerequisites
* An iOS application targeting at least iOS 11.0
* Integrated with Amplify Auth and ability to sign in with an account
  * For a full example, see: [Auth Getting Started](~/lib/auth/getting-started.md)

## Configure the Backend

The backend will be already configured if you have followed the basic setup as mentioned in the prerequisites.

## Register a user

A user should exists in the backend to move forward with the next step of authentication. The defaul CLI flow require a username, password and a valid email id as parameters to register a user. Create a UI to get these values from the user. When you have the needed details invoke the following function to initiate a signUp flow.

<inline-fragment platform="ios" src="~/lib/auth/fragments/ios/authentication/signin/10_signUp.md"></inline-fragment>

If you have followed the default setup in the CLI, the next step for signUp flow will be to confirm the user. A confirmation code will be send to the email id that was given during the above step. Enter the confirmation code received in the email in the next step.

<inline-fragment platform="ios" src="~/lib/auth/fragments/ios/authentication/signin/20_confirmSignUp.md"></inline-fragment>

After this step signUp flow is complete if you see the following in your console window:

```bash
Confirm signUp succeeded
```

## Sign in a user 

Implement an UI to get the username and password from the user. After the user enter the username and password you can start the signIn flow by calling the following method:

<inline-fragment platform="ios" src="~/lib/auth/fragments/ios/authentication/signin/30_signIn.md"></inline-fragment>

After this step signIn flow is complete and you will see the following in your console window:

```bash
Sign in succeeded
```

Congratulations!! you have sucessfully registered and authenticated a user into the auth category of Amplify. If you would like to explore other ways of authenticating a user, check out the next sections.