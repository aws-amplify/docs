---
title: Serverless Containers
description: Serverless Containers leverage AWS Fargate when building REST or GraphQL APIs in your account. Containers can be deployed via a single Dockerfile definition or by using a Docker Compose file, with a build and deployment pipeline created inside your AWS account.
---

## Serverless Containers

Serverless containers provide the ability for you to deploy APIs and host websites using AWS Fargate. Customers with existing applications or those who require a lower level of control can bring Docker containers and deploy them into an Amplify project fully integrating with other resources. 

Amplify [libraries](../docs/lib/lib.md) can be used with the [Auth category](../docs/lib/auth/start.md) giving mobile and web applications secure connectivity and access controls to your Serverless Containers. Additionally, existing GraphQL and REST services such as AWS AppSync and Amazon API Gateway can be used in the same project along with Fargate-backed APIs giving flexibility to mix and match for cost optimization and operational needs. 

Note that serverless containers do incur additional costs and operational overhead, as such we recommend using AWS AppSync with the [GraphQL Transform](../docs/cli/graphql-transformer/overview.md) as a starting point when building mobile and web apps with Amplify.


> **Billing warning**: Serverless Containers incurs additional costs when resources are not in use for services such as VPC, Fargate, ECR, API Gateway, Cloud Map, CodePipeline, and CodeBuild. For more information refer to [VPC pricing](https://aws.amazon.com/vpc/pricing/), [Fargate pricing](https://aws.amazon.com/fargate/pricing/), [ECR Pricing](https://aws.amazon.com/ecr/pricing/), [CodePipeline pricing](https://aws.amazon.com/codepipeline/pricing/), [CodeBuild pricing](https://aws.amazon.com/codebuild/pricing/), [API Gateway pricing](https://aws.amazon.com/api-gateway/pricing/), and [Cloud Map pricing](https://aws.amazon.com/cloud-map/pricing/).

### Getting Started

Serverless containers are not enabled in your Amplify CLI project by default. To get started you will need to run `amplify configure project` in order to see the options for deploying to Fargate. To get started initialize your project and enable Serverless Containers:

```console
$ amplify init

$ amplify configure project
 > Enable Serverless Containers
```

Next add a DynamoDB table called **Posts** with a primary key of **id** of type **number** (N). Then add an API using the REST (or GraphQL) default ExpressJS template and grant it access to this DynamoDB table. Finally run `amplify push` to deploy the backend:

```console
$ amplify add storage
  > NoSQL # Name table “Posts”
  > Primary key named “id” of type “N” (number)  # Do not add other columns or indexes

$ amplify add api
  > REST
  > Elastic Container Services
  > ExpressJS Sample Template
  > Require Authentication? (Y/n)              # Will use Amazon Cognito if Yes is selected
  > Do you want to access other resources? Y   # select yes
  > storage  # select posts table              # select post table and all permissions
    ◉ create
    ◉ read
    ◉ update
    ◉ delete

$ amplify push
```

Once this completes your container will be built via an automated pipeline and deployed to Fargate Tasks on an ECS Cluster fronted by an Amazon API Gateway HTTP API using a direct Cloud Map integration to your VPC. If you selected *Yes* to protect your API with Authentication, an Amazon Cognito User Pool will be created with an Authorizer integration for that API. 

// TODO - Fragment for JS/iOS/Android fetch code

### Single Dockerfile

The single Dockerfile scenario allows you to take an application running in a single Container which has been built with a Dockerfile and deploy it to AWS Fargate with the Amplify CLI. 

If you are unfamiliar with using a Dockerfile you may wish to walk through [Dockerizing a Node.js web app](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/) or create a project with a template built into the Amplify CLI to review the Dockerfile and source code structure. You will need an [`EXPOSE` statement in your Dockerfile](https://docs.docker.com/engine/reference/builder/#expose) to specify a port to communicate with the container. If you do not provide one Amplify will suggest to use port 80.


#### Suggested Workflow

It is recommended to test your application locally first before deploying with `amplify push`, otherwise your Fargate Task may fail to start if there are application issues such as missing dependencies. With a Single Dockerfile you can do this by navigating to `./amplify/backend/api/<name>/src` and running `docker build -t` to build and tag your image followed by `docker run` to launch 

```console
$ cd ./amplify/backend/api/<name>/src
$ docker build -t node-app:1.0 .
$ docker run -p 8080:8080 -d node-app:1.0
$ curl -i localhost:8080  ## Alternatively open in a web browser
```

You can also run your application using standard tooling such as running `node index.js` or `python server.py` in Node or Python.

### Docker Compose

If you wish to deploy Amplify will parse a `docker-compose.yml` file in your `./amplify/backend/api/<name>/src` directory to define the ECS


#### Suggested Workflow

As with the Single Dockerfile, it is recommended to test your application locally first before deploying with `amplify push`, otherwise your Fargate Task may fail to start if there are application issues such as missing dependencies. With a Single Dockerfile you can do this by navigating to `./amplify/backend/api/<name>/src` and running `docker build -t` to build and tag your image followed by `docker run` to launch 

```console
$ cd ./amplify/backend/api/<name>/src
$ docker-compose up
$ curl -i localhost:8080  ## Alternatively open in a web browser
```

#### Container networking

Multiple containers are deployed as a single unit in Fargate (e.g. same Task Definition). This opinionated deployment allows ease of networking between containers on the local loopback interface and avoids extra configuration, costs, operations, and debugging. The loopback interface has an IP of 127.0.0.1 and a hostname of `localhost` which you can use in one container's application code to communicate with another. A recommended pattern is to use enviornment variables in your application code that are specified in your Docker Compose file, but do not specify the hostname when deploying in `amplify push`. For example the `DATABASE_HOST` variable below might be specified locally when using `docker-compose up` with the  `environment` setting:

```yaml
environment:
  - DATABASE_DB=amplify
  - DATABASE_USER=root
  - DATABASE_PASSWORD=/run/secrets/db-password
  - DATABASE_HOST=db  #comment out before pushing
```

Then your application code can switch between local and cloud deployment automatically and communicate with the `db` container:

```javascript
module.exports = {
  database: {
    host: process.env.DATABASE_HOST || "localhost",
    port: process.env.DATABASE_PORT || 3306,
    database: process.env.DATABASE_DB,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD
  },
  port: process.env.PORT || 8080
};
```

#### Supported Configurations

Amplify will configure your Fargate infrastructure (ECS Service and Task Definition) automatically while allowing you to override specific settings with a Docker Compose file. All versions of Compose files are supported however not all configuration values will be honored. Additionally if a value has been deprecated in one version of Compose, Amplify will prefer the newest version (3.8).

- build
- name
- portMappings
- command
- entrypoint
- env_file
- image
- healthcheck
- working_dir
- user
- replicas

By default Amplify will use a single Avalaibility Zone however if you choose the *High Availability* option it will spread Fargate Tasks across 3 Availability Zones. The [`replicas`](https://docs.docker.com/compose/compose-file/#replicas) value should be used to increase [the number of Fargate tasks running in your Cluster](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/service_definition_parameters.html#sd-desiredcount) depending on your traffic requirements, however note that more running tasks will accrue more costs. 

### Build Pipeline

Amplify creates APIs as an [ECS Service](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs_services.html) to ensure that your application is monitored and tasks are in a healthy and active state, automatically recovering if an instance fails. When you make changes to your source code, the build and deployment pipeline will take your source code and Dockerfile/Docker Compose configuration as inputs. One or more containers will be built in AWS CodeBuild using your source code and pushed to ECR with a build hash as a tag, allowing you to roll back deployments if something unexpected happens in your application code. After the build is complete, the pipeline will perform a [Blue Green deployment](https://en.wikipedia.org/wiki/Blue-green_deployment) to launch Fargate Tasks automatically. Only when all new versions of the image are in a healthy & running state will the old tasks be stopped. Finally the build artifacts in S3 (in the fully managed scenario) and ECR images are set with a lifecycle policy retention of 7 days for cost optimization.

#### Fully Managed

...explain S3 process

![Fully Managed Pipeline](../../images/containers/BuildWorkflow.png)

#### GitHub Source


[GitHub documentation for creating a personal access token](https://docs.github.com/en/enterprise/2.17/user/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line)

#### Manual Builds