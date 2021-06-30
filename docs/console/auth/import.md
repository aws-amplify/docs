---
title: Use an existing Cognito User Pool and Identity Pool
description: Configure the Admin UI to use existing Amazon Cognito User Pool and Identity Pool resources as an authentication & authorization mechanism for other Amplify categories. (API, Storage, and more)
---

Import existing Amazon Cognito resources into your Amplify project in your Admin UI. Get started by going to the Authentication tab in your app's Admin UI and selecting "Reuse existing Amazon Cognito resources".

This feature is particularly useful if you’re trying to:

- enable Amplify categories (such as API, Storage, and function) for your existing user base;
- incrementally adopt Amplify for your application stack;
- independently manage Cognito resources while working with Amplify.

## Import an existing Cognito User Pool
In order to successfully import your User Pool, your User Pools require at least two app clients with the following conditions:

- At least one “Web app client”: an app client without a client secret
- At least one “Native app client“: an app client with a client secret
Run amplify push to complete the import procedure.

[Learn more about getting started with User Pools](https://docs.aws.amazon.com/cognito/latest/developerguide/getting-started-with-cognito-user-pools.html)
or 
[configuring a User Pool App Client](https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-settings-client-apps.html)

## Import an existing Identity Pool
In order to successfully import your Identity Pool, it must have both of the User Pool app clients fulfilling the below requirements:

- An Authenticated Role with a trust relationship to your Identity Pool
- An optional Unauthenticated Role if you want to use any guest user access for your Amplify categories. (Example: Guest access for your S3 buckets or REST API endpoints)

These roles are usually automatically configured when you create a new Identity Pool enabling “Unauthenticated” access and have a Cognito User Pool as an authentication provider.

[Learn more about getting started with Identity Pools.](https://docs.aws.amazon.com/cognito/latest/developerguide/getting-started-with-identity-pools.html)

## Import and update your source code

Click "Import" on the bottom of the page to complete the import procedure. Update your source code by running 
```bash
amplify pull
```
And generate the necessary GraphQL files by running
```bash
amplify codegen add
```

This will
- automatically populate your Amplify Library configuration files (aws-exports.js, amplifyconfiguration.json) with your chosen Amazon Cognito resource information
- provide your designated existing Cognito resource as the authentication & authorization mechanism for all auth-dependent categories (API, Storage and more)
- enable Lambda functions to access the chosen Cognito resource if you permit it

## Multi-environment support
When you create a new environment, Amplify will assume by default that you’re managing your app’s Cognito resources outside of an Amplify project. You’ll be asked to either import a different Cognito resource or maintain the same Cognito resource for your app’s auth category.

If you want to have Amplify manage your authorization resources in a new environment, unlink the imported Cognito resource and add authorization to your new environment. This will create new Amplify-managed authorization resources in the new environment.
  
## Unlink an existing Cognito User Pool or Identity Pool
In order to unlink your existing Cognito resource, click "Unlink Cognito User Pool and Identity Pool" on the bottom of the Authentication page and follow the prompt. This will only unlink the Cognito resource referenced from the Amplify project. It will not delete the Cognito resource itself.