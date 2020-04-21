---
title: Amplify CLI
description: The Amplify Command Line Interface (CLI) is a unified toolchain to create, integrate, and manage the AWS cloud services for your app. The CLI is category-based with best practices built in. 
---

The Amplify Command Line Interface (CLI) is a unified toolchain to create, integrate, and manage the AWS cloud services for your app. The CLI is category-based with best practices built in. The categories overlap with those in the Amplify libraries, but the CLI is a superset because some functionality doesn’t apply to the runtime (e.g. hosting or codegen).

The Amplify CLI makes it easy to provision a new cloud backend with features such as authentication, APIs (REST and GraphQL), Storage, Functions and Hosting.

<docs-internal-link-button href="~/cli/start/install.md">
  <span slot="text">Install the CLI</span>
</docs-internal-link-button>

## Key capabilities

### Data modeling with GraphQL
At the core of most applications is one thing - the data. Easily being able to model and access data in your app allows you to focus on delivering core features and business value instead of architecting and re-architecting your back end.

The GraphQL Transform library allows you to deploy AWS AppSync GraphQL APIs with features like NoSQL databases, authentication, elasticsearch engines, lambda function resolvers, relationships, authorization, and more using GraphQL schema directives. [Learn more](~/cli/graphql-transformer/overview.md)

### Multiple environments

Amplify CLI has support for multiple environments (e.g. dev, qa, and prod). When you initialize a project with the CLI, you create an Amplify backend environment. Every Amplify backend environment is a container for the categories added to your project. You can view all the backend environments as well as the categories added in the Amplify Console. [Learn more](~/cli/teams/overview.md)

### Infrastructure as code

The AWS Amplify CLI uses AWS CloudFormation and nested stacks. This allows you to add or modify configurations locally before you push them for execution in your account. It also takes any “magic” away and allows full transparency in the process of customizing your resources. To see the status of the deployment at any time, run amplify status.

For example, running `amplify add auth` will bootstrap a CloudFormation template in the `amplify>auth` folder. The infrastructure template can be re-used in CI/CD processes (either with the Amplify Console or your own build process), and can be used to replicate stacks.

### Local mocking 

Amplify supports running a local server for mocking and testing your application before pushing to the cloud with certain categories, including API (AWS AppSync), Storage (Amazon DynamoDB and Amazon S3), Functions (AWS Lambda), and Hosting. After running amplify init you can run the following to start a mock server. [Learn more](~/cli/usage/mock.md)

```
amplify mock
```