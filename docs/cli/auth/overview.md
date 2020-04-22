---
title: Overview
description: The Amplify CLI supports configuring many different Authentication and Authorization workflows, including simple and advanced configurations of the login options, triggering Lambda functions during different lifecycle events, and administrative actions which you can optionally expose to your applications.
---


The Amplify CLI supports configuring many different Authentication and Authorization workflows, including simple and advanced configurations of the login options, triggering Lambda functions during different lifecycle events, and administrative actions which you can optionally expose to your applications.

## Configuring auth without social providers

The easiest way to get started is to leverage the default configuration which is optimized for the most common use cases and choices.

```bash
$ amplify add auth     ##"amplify update auth" if already configured

Do you want to use the default authentication and security configuration? 
❯ Default configuration 
  Default configuration with Social Provider (Federation) 
  Manual configuration 
  I want to learn more.
```

## Configuring auth with social providers

Once your User Pool is functioning, you can enable more configurations such as federation with Facebook, Google, or Login with Amazon. You can also configure more advanced settings by selecting *Manual Configuration*.

```bash
$ amplify add auth     ##"amplify update auth" if already configured
```

Select Default configuration with Social Provider (Federation):

```bash
Do you want to use the default authentication and security configuration?
  Default configuration
❯ Default configuration with Social Provider (Federation)
  Manual configuration
  I want to learn more.
```