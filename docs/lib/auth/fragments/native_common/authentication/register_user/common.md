A user should exists in the backend to move forward with the next step of authentication. If you are following the default auth CLI flow that uses normal username / password for authentication read on.

## Goal
Register a user into AWS Cognito Auth plugin

## Prerequisites

<inline-fragment platform="ios" src="~/lib/auth/fragments/ios/getting_started/10_preReq.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/auth/fragments/android/getting_started/10_preReq.md"></inline-fragment>

## Register a user

The defaul CLI flow require a username, password and a valid email id as parameters to register a user. Create a UI to get these values from the user. When you have the needed details invoke the following function to initiate a signUp flow.

<inline-fragment platform="ios" src="~/lib/auth/fragments/ios/register_user/10_signUp.md"></inline-fragment>

If you have followed the default setup in the CLI, the next step for signUp flow will be to confirm the user. A confirmation code will be send to the email id that was given during the above step. Enter the confirmation code received in the email in the next step.
<inline-fragment platform="ios" src="~/lib/auth/fragments/ios/register_user/20_confirmSignUp.md"></inline-fragment>

After this step signUp flow is complete if you see the following in your console window:

```bash
Confirm signUp succeeded
```