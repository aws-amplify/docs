---
title: Introduction
description: Introduction to Admin UI
---

The Amplify Admin UI is a visual interface for frontend web and mobile developers to create and manage app backends outside the AWS console. With Admin UI, teams can easily create and manage enterprise-ready, scalable, and secure cloud backends for their apps. 

<docs-internal-link-button href="~/console/adminui/start.md">
  <span slot="text">Get started with Admin UI</span>
</docs-internal-link-button>

## Key capabilities

### Access outside the AWS console

The Admin UI provides a visual interface to manage your app backend outside the AWS console. The Admin UI is hosted externally to provide a contextual view on your Amplify app backend and to provide easy access to developers and non-developers (QA testers, PMs) to manage app content and to users without creating IAM users. Each Admin UI is hosted at `https://region.admin.amplifyapp.com/appid/envname`.

![adminui](~/images/console/adminui.png)

### Use Admin UI and CLI without an AWS account

Only the *first* backend deployment to Amplify Console requires an AWS account. After that, you can invite team members to use the Admin UI and the Amplify Command Line Interface (CLI) via email. All Admin UI users with full access will be able to use the Amplify CLI without an AWS account.

![access](~/images/console/access.png)

### Visual data modeling

Admin UI’s data model designer allows you to build a backend by focusing on your domain-specific objects (e.g., product with description and price), relationships (e.g., products have many orders), and authorization rules (e.g., only signed in users can order a product) instead of setting up database tables, and APIs.

![datamode](~/images/console/datamodel.gif)

### Content management

After deploying your data model, all app data is available in the Admin UI’s content management view, enabling app admins to manage content (e.g. update a product price or add a new blog post).

![cms](~/images/console/cms.png)

### Authentication, authorization, and user management

Set up authentication (powered by Amazon Cognito) by defining login methods and sign-up attributes. Once deployed create users, add users to groups, and view login activity. Use your Amazon Cognito UserPool to easily define authorization rules on your data model.

![auth](~/images/console/auth.png)


### Infrastructure-as-code that works with the Amplify CLI

The Admin UI uses AWS CloudFormation and nested stacks to deploy backend resources. These CloudFormation stacks allow you to keep your backend infrastructure definition as code. All stack defintions can be pulled locally with the Amplify CLI. Admin UI and the Amplify CLI work together. Changes made in the Admin UI can be made available in the CLI by running the `amplify pull` command. Similarly, CLI changes to the data model or auth will be visible in the Admin UI.




