The AWS Cognito Auth Plugin along with the CLI provides different ways in which a developer can authenticate a user into an app. Lets see the simplest use case first ie authenticate a user with username password.

## Goal
Use AWS Cognito Auth plugin to authenticate a user. 

## Prerequisites

<inline-fragment platform="ios" src="~/lib/auth/fragments/ios/getting_started/10_preReq.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/auth/fragments/android/getting_started/10_preReq.md"></inline-fragment>

A user should exists in the backend before we can signIn. You can create a user by following the register a user guide.

## SignIn with username password

### Provisioning backend

Should have followed the steps in getting started guide [TODO add link]()

### SignIn 

Implement an UI to get the username and password from the user. After the user enter the username and password you can start the signIn flow by calling the following method:

<inline-fragment platform="ios" src="~/lib/auth/fragments/ios/authentication/username_password/10_signIn.md"></inline-fragment>

After this step signIn flow is complete and you will see the following in your console window:

```bash
Sign in succeeded
```

Congratulations!! you have sucessfully registered and authenticated a user into the auth category of Amplify. If you would like to explore other ways of authenticating a user, check out the session below.
## Other authenticate use cases

### SignIn with a prebuild WebUI
AWS Cognito provides a prebuild hostedUI that you can use instead of providing a custom UI for registration and signIn a user.

#### Provisioning backend
The Amplify CLI steps are different for enabling a webUI signIn, so if you have already setup auth using Amplify CLI without webUI follow the steps below:

```bash
amplify update auth

What do you want to do? 
    Walkthrough all the auth configurations
Select the authentication/authorization services that you want to use: 
    User Sign-Up, Sign-In, connected with AWS IAM controls (Enables per-user Storage features for images or other content, Analytics, and
more)
Allow unauthenticated logins? (Provides scoped down permissions that you can control via AWS IAM) 
    No
Do you want to enable 3rd party authentication providers in your identity pool? 
    No
Do you want to add User Pool Groups? 
    No
Do you want to add an admin queries API? 
    No
Multifactor authentication (MFA) user login options: 
    OFF
Email based user registration/forgot password: 
    Enabled (Requires per-user email entry at registration)
Please specify an email verification subject: 
    Your verification code
Please specify an email verification message: 
    Your verification code is {####}
Do you want to override the default password policy for this User Pool? 
    No
Specify the app's refresh token expiration period (in days): 
    30
Do you want to specify the user attributes this app can read and write? 
    No
Do you want to enable any of the following capabilities?
Do you want to use an OAuth flow? 
    Yes
What domain name prefix you want us to create for you? 
    authsampleapp
Enter your redirect signin URI: 
    myapp://
? Do you want to add another redirect signin URI 
    No
Enter your redirect signout URI: 
    myapp://
? Do you want to add another redirect signout URI 
    No
Select the OAuth scopes enabled for this project. 
    Phone, Email, OpenID, Profile, aws.cognito.signin.user.admin
Select the identity providers you want to configure for your user pool:
? Do you want to configure Lambda Triggers for Cognito? 
    No

```


#### Project setup 
<inline-fragment platform="ios" src="~/lib/auth/fragments/ios/authentication/prebuild_webUI/10_project_setup.md"></inline-fragment>

#### Show the webUI to signIn
<inline-fragment platform="ios" src="~/lib/auth/fragments/ios/authentication/prebuild_webUI/20_signIn.md"></inline-fragment>

After this step signIn flow is complete and you will see the following in your console window:

```bash
Sign in succeeded
```

### SignIn with another auth provider

#### Provisioning backend


<amplify-block-switcher>
<amplify-block name="Login with Amazon">
[Todo:]
</amplify-block>
<amplify-block name="Sign in with Apple">
[Todo:]
</amplify-block>
<amplify-block name="Facebook Login">
[Todo:]
</amplify-block>
<amplify-block name="Google Sign-In">
[Todo:]
</amplify-block>
</amplify-block-switcher>

#### SignIn 

### SignIn with custom auth flow
<!--
<inline-fragment platform="ios" src="~/sdk/auth/fragments/ios/custom-auth-flow.md"></inline-fragment>
<inline-fragment platform="android" src="~/sdk/auth/fragments/android/custom-auth-flow.md"></inline-fragment>
-->