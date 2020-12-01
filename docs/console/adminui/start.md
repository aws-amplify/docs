---
title: Getting started
description: Getting started with the Admin UI
---

The Admin UI provides a visual interface to develop and manage your app backend outside the AWS console. [Learn more](~/console/adminui/intro.md).
<br/>
You can get started with or without an AWS Account. Without an AWS account, you can begin modeling data for your backend and test it locally. If you choose to create an AWS account and deploy your backend to Amplify Console, an expanded set of features become available for configuring your backend environment. 

<amplify-responsive-grid grid-gap="2" columns="2" class="margin-top-lg margin-bottom-lg">
<docs-card external url="https://sandbox.amplifyapp.com/" container-tag="amplify-external-link" >
  <img slot="graphic" src="~/images/console/adminui.svg" />
  <h4 slot="heading">Launch Sandbox</h4>
  <p slot="description">Get started without an AWS account</p>
</docs-card>
<docs-card external url="https://console.aws.amazon.com/amplify/home?#/deploy-backend" container-tag="amplify-external-link" >
  <img slot="graphic" src="~/assets/logo-dark.svg" />
  <h4 slot="heading">Launch Amplify Console</h4>
  <p slot="description">Get started with an AWS account</p>
</docs-card>
</amplify-responsive-grid>

## Get started without an AWS account 

If you are new to AWS, you don't need an AWS account to get started. You will have the ability to model and test your data before deploying to the cloud. After building your data model you will be required to connect an AWS account to deploy your backend environment with the Admin UI to the Amplify Console. The sandbox interface displays the option to perform the following tasks.
  * Set up your data model. For instructions on creating models and setting relationships, see [Data modeling without an AWS account](~/console/data/data-model.md#Data-modeling-without-an-AWS-account).
  * Test your new data model locally.
  * Deploy your backend to the cloud. This requires an AWS account.

## Get started with your AWS account

Alternatively, if you want to skip the sandbox experience and already have an AWS account, deploy the Admin UI to start using any Amplify feature including DataStore, user authentication and authorization, and file storage. After you deploy a backend in Amplify Console, you can launch Admin UI from your Amplify Console app. Your entire team can use the Admin UI to add new features, update app data, and manage users and groups.


1. Sign in to your account in the AWS Management Console and open AWS Amplify.
2. Enter a name for your app and choose **Confirm deployment**. This will deploy a default **staging** backend environment.
3. On the application information page, choose the **Backend environments** tab.
4. Choose **Open Admin UI**. This will automatically log you in to the Admin UI.

### Get started from an existing Amplify app

If you already have an existing backend environment, you can visit the console to enable the Admin UI.

1. Sign in to your account in the AWS Management Console and open AWS Amplify or type `amplify console` from the Amplify CLI.
2. In the navigation pane, choose **Admin UI management**
3. Turn on **Enable Admin UI (All environments)**. 
4. In the **Backend environments** section, choose **Open Admin UI**.  This will automatically log you in to the Admin UI and you will be able to use all the Admin UI capabilities.

## Next steps

You are ready to start creating and managing your application's backend in Admin UI. See the following topics to learn more about the tasks you can perform.
  * [Manage team access to your project](~/console/adminui/access-management.md)
  * [Access Admin UI on a custom domain](~/console/adminui/custom-domain.md)
  * [Add authentication for an app](~/console/auth/authentication.md)
  * [Model data](~/console/data/data-model.md#Data-modeling-with-an-AWS-account)
  * [Configure authorization rules](~/console/authz/authorization.md)
  * [Create users and groups](~/console/auth/user-management.md)
  * [Manage content](~/console/data/content-management.md)
  * Extend the Amplify CLI 


