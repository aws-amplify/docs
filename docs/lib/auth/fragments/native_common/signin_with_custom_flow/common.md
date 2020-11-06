The Auth category can be configured to perform a custom authentication flow defined by you. The following guide shows how to setup a simple passwordless authentication flow.

## Prerequisites

<inline-fragment platform="ios" src="~/lib/auth/fragments/ios/getting_started/10_preReq.md"></inline-fragment>

## Configure Auth Category

<inline-fragment platform="ios" src="~/lib/auth/fragments/ios/signin_with_custom_flow/10_cli_setup.md"></inline-fragment>

## Register a user

The CLI flow as mentioned above requires a username and a valid email id as parameters to register a user. Invoke the following api to initiate a sign up flow.

<inline-fragment platform="ios" src="~/lib/auth/fragments/ios/signin_with_custom_flow/20_signup.md"></inline-fragment>

The next step in the sign up flow is to confirm the user. A confirmation code will be sent to the email id provided during sign up. Enter the confirmation code received via email in the `confirmSignUp` call.

<inline-fragment platform="ios" src="~/lib/auth/fragments/ios/signin_with_custom_flow/30_confirmSignup.md"></inline-fragment>

## Sign in a user

Implement a UI to get the username from the user. After the user enters the username you can start the sign in flow by calling the following method:

<inline-fragment platform="ios" src="~/lib/auth/fragments/ios/signin_with_custom_flow/40_signin.md"></inline-fragment>

## Confirm sign in with custom challenge

Get the custom challenge (`1234` in this case) from the user and pass it to the `confirmSignin()` api. 

<inline-fragment platform="ios" src="~/lib/auth/fragments/ios/signin_with_custom_flow/50_custom_challenge.md"></inline-fragment>

You will know the sign in flow is complete if you see the following in your console window:

```console
Sign in succeeded
```
