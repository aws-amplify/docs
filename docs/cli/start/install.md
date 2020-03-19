---
title: Installation
description: Installation
---  

## Pre-requisites

* [Install Node.js®](https://nodejs.org/en/download/") and [NPM](https://www.npmjs.com/get-npm) if they are not already on your machine.
* Verify that you are running at least Node.js version 10.x and npm version 6.x or greater by running `node -v` and npm -v in a terminal/console window


## Set up locally

Install and configure the Amplify CLI.

```bash
npm install -g @aws-amplify/cli
```

### Configure with your AWS account

Configure the CLI to work with your AWS account by creating an IAM user. Amazon IAM (Identity and Access Management) enables you to manage users and user permissions in AWS. You can create one or more IAM users in your AWS account. By default, Amplify creates a user with `AdministratorAccess` to your account so you can provision resources. 

```
amplify configure
```
The video below demonstrates how to install and configure the Amplify CLI.

<iframe allowfullscreen src="https://www.youtube.com/embed/fWbM5DLh25U">
</iframe>

### Work within your frontend project

After you install the CLI, navigate to a JavaScript, iOS, or Android project root, initialize AWS Amplify in the new directory by running `amplify init`. After a few configuration questions, you can use amplify help at any time to see the overall command structure. When you’re ready to add a feature, run `amplify add <category>`. 
