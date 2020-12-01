---
title: Extend with the Amplify CLI
description: Install the CLI without npm and use the CLI without an AWS account
---

All backends created in the Amplify Console can be extended with the Amplify Command Line Interface (CLI) to add any of the functionality available in the Amplify CLI. The Amplify CLI is a unified toolchain for creating, integrating, and managing the AWS services for your app. The Amplify CLI simplifies the provisioning of new cloud backend features such as authentication, REST APIs, GraphQL APIs, storage, functions, and hosting. The Amplify Console and Amplify CLI work together. Changes made in the Admin UI can be made available in the CLI by running the `amplify pull` command. Similarly, CLI changes to the data model or auth will be visible in the Admin UI.

With the launch of the Admin UI, a new CLI feature is available that enables the use of the CLI without an AWS account. This will allow you to leverage all the CLI features without the need to configure it with AWS Identity and Access Management (IAM).


## Install the Amplify CLI
1. Open a terminal window.
2. Run the following command to install a packaged version of the Amplify CLI that is not dependent on Node:
```bash
curl -sL https://aws-amplify.github.io/amplify-cli/install | bash && $SHELL
```
3. After the Amplify CLI finishes installing, follow the next procedure to configure the CLI so that you can use it without an AWS account.

## Configure the Amplify CLI to use without an AWS account

1. Open the Admin UI for an app.
2. Open a terminal window and run the following command, replacing the `xxx` values with your unique `apId` and `envName`. You can locate your `apId` and `envName` by selecting any category from the Admin UI **Set up** menu and copying the `apId` and `envName` values displayed in the **Pull Amplify project** command.
```bash
amplify configure --apId xxx --envName xxx
```
3. A browser window will open and ask if you want to continue logging in to the Amplify CLI. Choose **Yes**. 
5. Return to the terminal window. You should see the following success statement:
```bash
Successfully received Amplify Admin tokens.
```
6. Copy and paste the following command in the terminal window, replacing the `xxx` values with your unique `apId` and `envName`. You can also copy and paste the **Pull your Amplify project** command from any category in the Adminu UI **Set up** menu.
```bash
 amplify pull --apId xxx --envName xxx
 ```
7. The CLI is now configured and you can use it to provision new cloud backend features. 

The Admin UI **Set up** menu lists cloud backend features such as functions, storage, and APIs that you can add to your app using the CLI. For each backend resource, the Admin UI displays the CLI commands to run in your terminal window. The following example describes the process for adding storage to your app backend using the CLI.

## Add storage using the CLI
1. On the **Set up** menu, choose **Storage**.
2. On the **Storage** page, copy the command under **Pull your Amplify project** and paste it in your terminal window. Note that before you run this command, you must have already installed and configured the CLI using the preceding procedures.
3. After your backend environment has been successfully pulled from the cloud, copy the following command under **Add storage capabilities** and paste it in your terminal window:
```bash
amplify add storage
```
4. Follow the prompts in the terminal window to configure storage with your desired settings.
5. Run the following command in your terminal window to build your local backend resources and provision them in the cloud:
```bash
amplify push
```
6. Return to the Admin UI **Storage** page. A link to your new storage resource will be available in the **Deployed storage resources** section.


[\\]: * (## Backend updates example)

[\\]: * (Nikhil, we had this in the Asana toc draft, but I'm not exactly sure what you envisioned here.)
