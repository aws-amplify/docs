---
title: Use an existing Cognito User Pool and Identity Pool
description: Configure the Amplify CLI to use existing Amazon Cognito User Pool and Identity Pool resources as an authentication & authorization mechanism for other Amplify categories. (API, Storage, and more)
---

Import existing Amazon Cognito resources into your Amplify project. Get started by running `amplify import auth` command to search for & import an existing Cognito User Pool & Identity Pool in your account.

```bash
amplify import auth
```

The `amplify import auth` command will:

- automatically populate your Amplify Library configuration files (aws-exports.js, amplifyconfiguration.json) with your chosen Amazon Cognito resource information
- provide your designated existing Cognito resource as the authentication & authorization mechanism for all auth-dependent categories (API, Storage and more)
- enable Lambda functions to access the chosen Cognito resource if you permit it

Make sure to run `amplify push` to complete the import process and deploy this backend change to the cloud.

This feature is particularly useful if you're trying to:

- enable Amplify categories (such as API, Storage, and function) for your existing user base;
- incrementally adopt Amplify for your application stack;
- independently manage Cognito resources while working with Amplify.

## Import an existing Cognito User Pool

Select the "Cognito User Pool only" option when you've run `amplify import auth`. In order to successfully import your User Pool, your User Pools require at least one app client with the following conditions:

- *A "Web app client"*: an app client **without** a client secret

Run `amplify push` to complete the import procedure.

## Import an existing Identity Pool

Select the "Cognito User Pool and Identity Pool" option when you've run `amplify import auth`. In order to successfully import your Identity Pool, it must have both of the User Pool app clients fulfilling [these requirements](#import-an-existing-cognito-user-pool) associated as an authentication provider.

Your Identity Pool needs:

- an Authenticated Role with a trust relationship to your Identity Pool
- an **optional** Unauthenticated Role if you want to use any guest user access for your Amplify categories. (Example: Guest access for your S3 buckets or REST API endpoints)

These roles are usually automatically configured when you create a new Identity Pool enabling "Unauthenticated" access and have a Cognito User Pool as an authentication provider.

Amplify CLI will update the policies attached to the roles to ensure Amplify categories function correctly. For example, enabling Storage for authenticated & guest users will add private, protected, public, read and upload permissions for the S3 bucket to the unauthenticated & authenticated role.

Run `amplify push` to complete the import procedure.

## Multi-environment support

When you create a new environment through `amplify env add`, Amplify CLI will assume by default that you're managing your app's Cognito resources outside of an Amplify project. You'll be asked to either import a different Cognito resource or maintain the same Cognito resource for your app's auth category.

If you want to have Amplify manage your auth resources in a new environment, run `amplify remove auth` to unlink the imported Cognito resource and `amplify add auth` to create new Amplify-managed auth resources in the new environment.

## Unlink an existing Cognito User Pool or Identity Pool

In order to unlink your existing Cognito resource run `amplify remove auth`. This will only unlink the Cognito resource referenced from the Amplify project. It will not delete the Cognito resource itself.

Run `amplify push` to complete the unlink procedure.
