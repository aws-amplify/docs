The Amplify Auth category provides an interface for <TODO: Add content here>. The Auth category comes with default built-in support for Amazon Cognito User Pool and Identity Pool. The Amplify CLI helps you to create and configure the auth category with an authentication provider. The Amplify AWS Cognito Auth Plugin leverages [Amazon Cognito](https://aws.amazon.com/cognito).

## Goal
To setup and configure your application with Amplify Auth and go through a simple api to check the current auth session

## Prerequisites

<inline-fragment platform="ios" src="~/lib/auth/fragments/ios/getting_started/10_preReq.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/auth/fragments/android/getting_started/10_preReq.md"></inline-fragment>

## Provision Backend Auth Services

To start provisioning auth resources in the backend, go to your project directory and **execute the command**:

```bash
amplify add auth
```

Enter the following when prompted:
```console
? Do you want to use the default authentication and security configuration?
    `Default configuration`
? How do you want users to be able to sign in? 
    `Username`
? Do you want to configure advanced settings?
    `No, I am done.`
```

To push your changes to the cloud, **execute the command**:

```bash
amplify push
```

Upon completion, `amplifyconfiguration.json` should be updated to reference provisioned backend auth resources.  Note that these files should already be a part of your project if you followed the [Project setup walkthrough](~/lib/project-setup/create-application.md).

## Install Amplify Libraries

<inline-fragment platform="ios" src="~/lib/auth/fragments/ios/getting_started/20_installLib.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/auth/fragments/android/getting_started/20_installLib.md"></inline-fragment>

## Initialize Amplify Auth
<inline-fragment platform="ios" src="~/lib/auth/fragments/ios/getting_started/30_initAuth.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/auth/fragments/android/getting_started/30_initAuth.md"></inline-fragment>

## Check the current auth session

We can now check the current auth session

<inline-fragment platform="ios" src="~/lib/auth/fragments/ios/getting_started/40_fetchSession.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/auth/fragments/android/getting_started/40_fetchSession.md"></inline-fragment>

The isSignedIn property of the authSession will be false since we havent signed in to the category yet.

## Next Steps
Congratulations! You've successfully setup AWS Cognito Auth plugin.  Check out the following links to see other Amplify Auth use cases:

* [Authenticate a user with username password]
* [Authenticate a user with another auth provider]