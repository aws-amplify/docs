---
title: Use an existing S3 bucket or DynamoDB table
description: Configure the Amplify CLI to use existing S3 bucket or DynamoDB table resources as a storage resource for other Amplify categories. (API, function, and more)
---

Import an existing S3 bucket or DynamoDB tables into your Amplify project. Get started by running `amplify import storage` command to search for & import an S3 or DynamoDB resource from your account. 

```sh
amplify import storage
```

Make sure to run `amplify push` to complete the import process and deploy this backend change to the cloud. 

The `amplify import storage` command will:
* automatically populate your Amplify Library configuration files (aws-exports.js, amplifyconfiguration.json) with your chosen S3 bucket information 
* provide your designated S3 bucket or DynamoDB table as a storage mechanism for all storage-dependent categories 
* enable Lambda functions to access the chosen S3 or DynamoDB resource if you permit it

This feature is particularly useful if you're trying to:
* enable Amplify categories (such as API and function) to access your existing storage resources;
* incrementally adopt Amplify for your application stack;
* independently manage S3 and DynamoDB resources while working with Amplify.

## Import an existing S3 bucket

Select the "Content (Images, audio, video, etc.)" option when you've run `amplify import storage`. In order to successfully import your S3 bucket, your S3 bucket must be hosted in the same region as your Amplify project.

Run `amplify push` to complete the import procedure.

> Amplify projects are limited to one exactly S3 bucket.

### Working with an imported S3 bucket with Amplify Libraries

By default, Amplify Libraries assumes that S3 buckets are configured with the following folder access:
- `public/` - TODO
- `protected/` -  
- `private/` - 

You can either configure your IAM role to use the Amplify-recommended policies or in your Amplify libraries configuration overwrite the default behavior.

### Configuring IAM role to use Amplify-recommended policies

TODO: modifying amplify generated auth

If you're using an imported S3 bucket with an imported Cognito resource, then you'll need to update the policy of your Cognito Identity Pool's authenticated and unauthenticated role.

IAM policy statement for `public/`:
TODO
IAM policy statement for `protected/`:
TODO
IAM policy statement for `private/`:
TODO

## Import an existing DynamoDB table

Select the "NoSQL Database" option when you've run `amplify import storage`. In order to successfully import your DynamoDB....

Run `amplify push` to complete the import procedure.

> Amplify projects can contain multiple DynamoDB tables.

TODO: Limitations / requirements?

## Multi-environment support

When you create a new environment through `amplify env add`, Amplify CLI will assume by default that you're managing your app's storage resources outside of an Amplify project. You'll be asked to either import a different S3 bucket or DynamoDB tables or maintain the same imported storage resource.

If you want to have Amplify manage your storage resources in a new environment, run `amplify remove storage` to unlink the imported storage resources and `amplify add storage` to create new Amplify-managed S3 buckets and DynamoDB tables in the new environment.

## Unlink an existing S3 bucket or DynamoDB table

In order to unlink your existing Cognito resource run `amplify remove storage`. This will only unlink the S3 bucket or DynamoDB table referenced from the Amplify project. It will not delete the S3 bucket or DynamoDB table itself. 

Run `amplify push` to complete the unlink procedure.
