---
title: Amplify CLI
description: The Amplify Command Line Interface (CLI) is a unified toolchain to create, integrate, and manage the AWS cloud services for your app. The Amplify CLI makes it easy to provision a cloud backend with features such as Authentication, APIs (REST and GraphQL), Storage, Functions and Hosting.
---

The Amplify Command Line Interface (CLI) is a unified toolchain to create, integrate, and manage the AWS cloud services for your app.

![Amplify CLI feature carousel](~/assets/cli-b-roll.gif)

<docs-internal-link-button href="~/cli/start/install.md">
  <span slot="text">Install Amplify CLI</span>
</docs-internal-link-button>

## Key capabilities

### Data modeling with GraphQL

At the core of most applications is one thing - the data. Easily being able to model and access data in your app allows you to focus on delivering core features and business value instead of architecting and re-architecting your back end.

The GraphQL Transform library allows you to deploy AWS AppSync GraphQL APIs with features like NoSQL databases, authentication, OpenSearch engines, lambda function resolvers, relationships, authorization, and more using GraphQL schema directives. [Learn more](~/cli/graphql-transformer/overview.md)

### Multiple environments

Amplify CLI has support for multiple environments (e.g. dev, qa, and prod). When you initialize a project with the CLI, you create an Amplify backend environment. Every Amplify backend environment is a container for the categories added to your project. You can view all the backend environments as well as the categories added in the Amplify Console. [Learn more](~/cli/teams/overview.md)

### Infrastructure as code

The AWS Amplify CLI uses AWS CloudFormation and nested stacks. This allows you to add or modify configurations locally before you push them for execution in your account. It also takes any “magic” away and allows full transparency in the process of customizing your resources. To see the status of the deployment at any time, run amplify status.

For example, running `amplify add auth` will bootstrap a CloudFormation template in the `amplify/backend/auth` folder. The infrastructure template can be re-used in CI/CD processes (either with the Amplify Console or your own build process), and can be used to replicate stacks.

**Note:** We strongly advise against manually updating or deleting resources created by AWS CloudFormation; it may cause the stack to be stuck in a state that can no longer be updated. Among those operations, manually updating or deleting **Cognito** resources (created by the Amplify Auth category) are considered especially dangerous and you may lose user data or break auth-related functionalities in your app.

### Local mocking

Amplify supports running a local server for mocking and testing your application before pushing to the cloud with certain categories, including API (AWS AppSync), Storage (Amazon DynamoDB and Amazon S3), Functions (AWS Lambda), and Hosting. After running amplify init you can run the following to start a mock server. [Learn more](~/cli/usage/mock.md)

```bash
amplify mock
```

### Serverless containers

Amplify supports AWS Lambda and AWS Fargate compute options for building applications giving a full spectrum of control and integration within your infrastructure. Lambda Functions can be used in your GraphQL and REST APIs in addition to triggers from event sources such as S3 and DynamoDB. Similarly you can bring a [Dockerfile](https://docs.docker.com/engine/reference/builder/) or a [Docker Compose file](https://docs.docker.com/compose/compose-file/) to automatically build and deploy Serverless containers into Amazon Elastic Container Service. [Learn more](~/cli/usage/containers.md).
