---
title: Overview
description: The Amplify CLI supports configuring many different Authentication and Authorization workflows, including simple and advanced configurations of the login options, triggering Lambda functions during different lifecycle events, and administrative actions which you can optionally expose to your applications.
---


The Amplify CLI supports configuring many different Authentication and Authorization workflows, including simple and advanced configurations of the login options, triggering Lambda functions during different lifecycle events, and administrative actions which you can optionally expose to your applications.

## Configuring auth without social providers

The easiest way to get started is to leverage the default configuration which is optimized for the most common use cases and choices.

```bash
amplify add auth     ##"amplify update auth" if already configured
```

```console
Do you want to use the default authentication and security configuration? 
❯ Default configuration 
  Default configuration with Social Provider (Federation) 
  Manual configuration 
  I want to learn more.
```

## Configuring auth with social providers

Once your User Pool is functioning, you can enable more configurations such as federation with Facebook, Google, or Login with Amazon. You can also configure more advanced settings by selecting *Manual Configuration*.

```bash
amplify add auth     ##"amplify update auth" if already configured
```

Select Default configuration with Social Provider (Federation):

```console
Do you want to use the default authentication and security configuration?
  Default configuration
❯ Default configuration with Social Provider (Federation)
  Manual configuration
  I want to learn more.
```

You can find [more documentation on adding each social provider in the Libraries section](https://docs.amplify.aws/lib/auth/social/q/platform/js#setup-your-auth-provider) of the docs.

## Re-use an existing Cognito User Pool and Identity Pool

Instead of letting Amplify CLI create a new set of auth resources, you can also import your existing Cognito resources. These resources can be used to auto-generate the Amplify library configuration files, used as an auth dependency for other categories and provided access permissions from within Lambda functions.

Run `amplify import auth` or read the [guide on how to import existing Cognito resources](~/cli/auth/import.md).