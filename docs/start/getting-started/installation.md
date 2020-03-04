---
title: Install the Amplify CLI
description: Introduction
filterKey: integration
---

## System requirements

Before we begin, make sure you have the following installed:

- [Node.js](https://nodejs.org/) v8.x or later
- [npm](https://www.npmjs.com/) v5.x or later
- [git](https://git-scm.com/) v2.14.1 or later

## Sign up for an AWS account

If you don't already have an AWS account, you'll need to create one in order to follow the steps outlined in this tutorial.

[Create AWS Account](https://portal.aws.amazon.com/billing/signup?redirect_url=https%3A%2F%2Faws.amazon.com%2Fregistration-confirmation#/start)

> There are no upfront charges or any term commitments to create an AWS account and signing up gives you immediate access to the AWS Free Tier.

## Install and setup the Amplify CLI

The Amplify Command Line Interface (CLI) is a unified toolchain to create AWS cloud services for your app.

```bash
npm install -g @aws-amplify/cli
```

Configure the CLI to work with your AWS account by creating an IAM user. Amazon IAM (Identity and Access Management) enables you to manage users and user permissions in AWS. You can create one or more IAM users in your AWS account. By default, Amplify creates a user with `AdministratorAccess` to your account so you can provision resources. The video below demonstrates how to install and configure the Amplify CLI.

```bash
amplify configure
```

<iframe
  width="500"
  height="345"
  src="https://www.youtube.com/embed/fWbM5DLh25U"
></iframe>

Next, we'll set up the React app and initialize Amplify!
