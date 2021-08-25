---
title: Import Amazon Cognito resources
description: Configure the Admin UI to use existing Amazon Cognito user pool and identity pool resources as an authentication and authorization mechanism for other Amplify categories ( For example, API, Storage, and more).
---

You can import existing Amazon Cognito resources into your Amplify project using the Admin UI. To get started, choose **Authentication** from the **Set up** menu in your app's Admin UI. On the **Authentication** page, choose **Reuse existing Amazon Cognito resources**.

This feature is particularly useful if you’re trying to do the following:

- Authorize user access to fields/tables in the Admin UI's data model
- Manage users and groups from the Admin UI (instead of having to login to the AWS console)
- Reuse the imported auth resource across Amplify environments

## Import an existing Cognito user pool
To successfully import your user pool, your user pools require at least two app clients with the following conditions:

- At least one “Web app client”: an app client without a client secret
- At least one “Native app client“: an app client with a client secret

The client secret is used by applications that have a server-side component that secure the client secret, which is why the native app client needs one.

To complete the import procedure, run the `amplify push` command.

[Learn more about getting started with User Pools](https://docs.aws.amazon.com/cognito/latest/developerguide/getting-started-with-cognito-user-pools.html)
or 
[configuring a User Pool App Client](https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-settings-client-apps.html)

## Import an existing identity pool
In order to successfully import your identity pool, it must have both of the user pool app clients must meet the following requirements:

- An Authenticated Role with a trust relationship to your identity pool
- An optional Unauthenticated Role if you want to use any guest user access for your Amplify categories (For example, guest access for your Amazon S3 buckets or REST API endpoints).

These roles are usually automatically configured when you create a new identity pool enabling “Unauthenticated” access and have an Amazon Cognito user pool as an authentication provider.

[Learn more about getting started with Identity Pools.](https://docs.aws.amazon.com/cognito/latest/developerguide/getting-started-with-identity-pools.html)

## Import and update your source code

Choose **Import** on the bottom of the page to complete the import procedure. Update your source code by running the following command: 
```bash
amplify pull
```
Next, generate the necessary GraphQL files by running the following command:
```bash
amplify codegen add
```

After running this command, the following occurs:
- Your Amplify Library configuration files (aws-exports.js, amplifyconfiguration.json) are automatically populated with your chosen Amazon Cognito resource information
- Your designated existing Amazon Cognito resource is provided as the authentication and authorization mechanism for all auth-dependent categories (API, Storage and more)
- Lambda functions are enabled to access the chosen Amazon Cognito resource if you permit it.

## Multi-environment support
When you clone an environment or create a new one, you’ll be required to import your Amazon Cognito resources.

If you want to have Amplify manage your authorization resources in a new environment, unlink the imported Cognito resource and add authorization to your new environment. This will create new Amplify-managed authorization resources in the new environment.
  
## Unlink an existing Amazon Cognito user pool or identity pool
In order to unlink your existing Amazon Cognito resource, click **Unlink Cognito User Pool and Identity Pool** on the bottom of the **Authentication** page and follow the prompt to confirm this action. This only unlinks the Amazon Cognito resource referenced from the Amplify project. It does not delete the Amazon Cognito resource itself.
