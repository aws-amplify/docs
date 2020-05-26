
Auth category can be used to register a user, confirm attributes like email/phone, and sign in with optional multi-factor authentication. AWS Cognito Auth Plugin is set up to use Amazon Cognito User Pools which manages the users and their properties.

## Prerequisites

<inline-fragment platform="ios" src="~/lib/auth/fragments/ios/authentication/signin/00_preReq.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/auth/fragments/android/getting_started/10_preReq.md"></inline-fragment>

## Configure the backend

The backend will be already configured if you have followed the basic setup as mentioned in the prerequisites.

## Register a user

The defaul CLI flow as mentioned in the [getting started guide](~/lib/auth/getting-started.md) requires a username, password and a valid email id as parameters to register a user. Create a UI to get these values from the user. When you have the needed details invoke the following function to initiate a signUp flow.

<inline-fragment platform="ios" src="~/lib/auth/fragments/ios/authentication/signin/10_signUp.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/auth/fragments/android/signin/10_signUp.md"></inline-fragment>

The next step for signUp flow will be to confirm the user. A confirmation code will be send to the email id that was given during the above step. Enter the confirmation code received in the email in the next step.

<inline-fragment platform="ios" src="~/lib/auth/fragments/ios/authentication/signin/20_confirmSignUp.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/auth/fragments/android/signin/20_confirmSignUp.md"></inline-fragment>

After this step signUp flow is complete if you see the following in your console window:

```console
Confirm signUp succeeded
```

## Sign in a user

Implement an UI to get the username and password from the user. After the user enter the username and password you can start the signIn flow by calling the following method:

<inline-fragment platform="ios" src="~/lib/auth/fragments/ios/authentication/signin/30_signIn.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/auth/fragments/android/signin/30_signIn.md"></inline-fragment>

After this step signIn flow is complete and you will see the following in your console window:

```console
Sign in succeeded
```

You have successfully registered a user and authenticated with that user's username and password with Amplify. The Authentication category supports other mechanisms for authentication such as web UI based sign in, sign in using other providers etc that you can explore below.
