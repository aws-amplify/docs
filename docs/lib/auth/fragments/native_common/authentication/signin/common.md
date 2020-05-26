
The Auth category can be used to register a user, confirm attributes like email/phone, and sign in with optional multi-factor authentication. AWS Cognito Auth Plugin is set up to use Amazon Cognito User Pools which manages the users and their properties.

## Prerequisites

<inline-fragment platform="ios" src="~/lib/auth/fragments/ios/getting_started/10_preReq.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/auth/fragments/android/getting_started/10_preReq.md"></inline-fragment>

## Configure the backend

The backend will be already configured if you followed the basic setup as mentioned in the prerequisites.

## Register a user

The default CLI flow as mentioned in the [getting started guide](~/lib/auth/getting-started.md) requires a username, password and a valid email id as parameters to register a user. Create a UI to get these values from the user. When you have the needed details, invoke the following function to initiate a sign up flow.

<inline-fragment platform="ios" src="~/lib/auth/fragments/ios/authentication/signin/10_signUp.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/auth/fragments/android/signin/10_signUp.md"></inline-fragment>

The next step in the sign up flow is to confirm the user. A confirmation code will be sent to the email id provided during sign up. Enter the confirmation code received via email in the `confirmSignUp` call.

<inline-fragment platform="ios" src="~/lib/auth/fragments/ios/authentication/signin/20_confirmSignUp.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/auth/fragments/android/signin/20_confirmSignUp.md"></inline-fragment>

You will know the sign up flow is complete if you see the following in your console window:

```console
Confirm signUp succeeded
```

## Sign in a user

Implement a UI to get the username and password from the user. After the user enters the username and password you can start the sign in flow by calling the following method:

<inline-fragment platform="ios" src="~/lib/auth/fragments/ios/authentication/signin/30_signIn.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/auth/fragments/android/signin/30_signIn.md"></inline-fragment>

You will know the sign in flow is complete if you see the following in your console window:

```console
Sign in succeeded
```

You have now successfully registered a user and authenticated with that user's username and password with Amplify. The Authentication category supports other mechanisms for authentication such as web UI based sign in, sign in using other providers etc that you can explore in the other sections.
