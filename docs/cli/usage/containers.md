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

Amplify will configure your Fargate infrastructure (ECS Service and Task Definition) automatically while allowing you to override specific settings with a Docker Compose file. Older versions of Compose files are supported however not all configuration values will be honored, therefore [it is recommended you update to 3.8](https://docs.docker.com/compose/compose-file/). Additionally if a value has been deprecated in one version of Compose, Amplify will prefer the newest version (3.8).

- build
- name
- ports
- command
- entrypoint
- env_file
- image
- healthcheck
- working_dir
- user
- secrets
- replicas

By default Amplify will use a single Avalaibility Zone however if you choose the *High Availability* option it will spread Fargate Tasks across 3 Availability Zones. The [`replicas`](https://docs.docker.com/compose/compose-file/#replicas) value should be used to increase [the number of Fargate tasks running in your Cluster](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/service_definition_parameters.html#sd-desiredcount) depending on your traffic requirements, however note that more running tasks will accrue more costs. 

When you have multiple container entries specifying a `port` Amplify will prompt you upon running `amplify push` to select an **Entrypoint Container**. Since all containers are deployed as a "unit" and fronted by an API Gateway HTTP endpoint for client applications to access, Amplify needs to know which container in the Cluster's Service to route requests. The answer to the Entrypoint question will use the first specified `ports` entry to perform this routing.

`secrets` allow you to [pass sensitive data to your containers from AWS Secrets Manager](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/specifying-sensitive-data.html). Amplify will do this for you when you populate the `secrets` configuration at the root level of your `docker-compose.yml`. It must be a file name that starts with `.secret-` and cannot be in the `./amplify/backend/api/<name>/src` directory, but can be anywhere outside of it including a relative path. When you perform an `amplify push` you will be prompted to store the secrets in the cloud or bypass (which may be the case in team workflows when one person controls secrets). The name of the secret will be available in your application code similar to if you specified other variables via the `environment` configuration:

```yaml
version: "3.8"
services:
  backend:
    build:
      args:
      - NODE_ENV=development
      context: backend
    environment:
      - DATABASE_NAME=mydb
secrets:
  DB_PASSWORD:
    file: ../.secret-pass
```
**NodeJS example**

```javascript
const database = process.env.DATABASE_NAME;
const password = process.env.DB_PASSWORD;
```

**Python example**

```python
import os
database = os.environ['DATABASE_NAME']
password = os.environ['DB_PASSWORD']
```

### Client Configuration

Serverless containers are fronted by a secure endpoint by which you can interact with them from a mobile or web application. Amplify CLI will attempt to update the project `aws-exports.js` or `amplifyconfiguration.json` file with the endpoint, however for GraphQL API types this is not possible and you will need to manually specify it in an `Amplify.configure()` call within your application code. The endpoint will be printed out to the screen after running an `amplify push` for you to make these changes, take note of it and follow one of the guides below appropriately.

- [JavaScript GraphQL configuration](../../docs/docs/lib/graphqlapi/fragments/js/create-or-re-use-existing-backend.md)
- [JavaScript REST configuration](../../docs/docs/lib/restapi/fragments/js/getting-started.md#manual-setup-import-existing-rest-api)
- [Android GraphQL configuration](../../docs/docs/lib/graphqlapi/fragments/existing-resources.md)
- [Android REST configuration](../../docs/docs/lib/restapi/fragments/native_common/getting-started/common.md)
- [iOS GraphQL configuration](../../docs/docs/lib/graphqlapi/fragments/existing-resources.md)
- [iOS REST configuration](../../docs/docs/lib/restapi/fragments/native_common/getting-started/common.md)

Note that if you have enabled Authorization checks on your endpoints during `amplify add api` your clients will need to Authenticate against the Cognito User Pool configured and pass tokens. Please see the [appropriate platform guide](../../docs/docs/lib/auth/getting-started.md) for adding Sign-Up and Sign-In calls to your aplication.

### Build Pipeline

Amplify creates APIs as an [ECS Service](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs_services.html) to ensure that your application is monitored and tasks are in a healthy and active state, automatically recovering if an instance fails. When you make changes to your source code, the build and deployment pipeline will take your source code and Dockerfile/Docker Compose configuration as inputs. One or more containers will be built in AWS CodeBuild using your source code and pushed to ECR with a build hash as a tag, allowing you to roll back deployments if something unexpected happens in your application code. After the build is complete, the pipeline will perform a rolling deployment to launch Fargate Tasks automatically. Only when all new versions of the image are in a healthy & running state will the old tasks be stopped. Finally the build artifacts in S3 (in the fully managed scenario) and ECR images are set with a lifecycle policy retention of 7 days for cost optimization.


#### Fully Managed

The fully managed workflow does not require you to have a source control repository or even Docker installed on your local workstation in order to build and deploy a container to Fargate. 

![Fully Managed Pipeline](../../images/containers/BuildWorkflow.png)

#### GitHub Source


[GitHub documentation for creating a personal access token](https://docs.github.com/en/enterprise/2.17/user/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line)

#### Manual Builds


#### Troubleshooting

Note that a container deployment could fail or be problematic in a few different ways ranging from a build issue to bugs in your application code not seen until production. There are different checkpoints along the way to help prevent application issues as well as methods to revert changes which are outlined below.

1. Build failure

When your code is submitted to the pipeline either via `amplify push` or check-in to GitHub, it will be packaged and submitted to a CodeBuild job. If this build phase fails your the rest of the pipeline stops and your code will not even attempt to launch on Fargate until the build errors have been resolved. The job will perform the following:
- Login to ECR
- Create a commit hash
- Build each container (e.g. `docker build`)
- Tag each container (e.g. `docker tag`)
- Push each container to ECR (`docker push` with commit hash)
- Write the build artifact (`imagedefinitions.json`) to S3

If you see a failure in the Code Pipeline console at this step, you can view the details of the build (even clicking "Tail Logs" while the pipeline is running) to see what error occured. It's possible you have a misconfiguration in your Dockerfile or even a network failure pulling an image from a 3rd party repository. To help avoid this issue you can always run `docker build` or `docker-compose up` locally before submitting a build and validating the application runs.

Note that on your first deployment a queueing process will take a bit longer to setup your project networking stack and run initial builds in Code Pipeline. During this time if your build fails for any reason (even external image throttling or Dockerfile config) the process will roll back. If you wish to debug this during initial rollout the Amplify CLI will print out the URL of the pipeline when `amplify push` starts to process the stack for you to view the build phase actively. 

2. Container launch failure

If your build pipeline completes and rolling deployment to your ECS cluster begins, but you notice that the process is not completing, it may be due to an application issue or container configuration problem in the Dockerfile. For example if you had a NodeJS or Python application that crashed upon startup (such as a file/module not found) the task may shut down. Since ECS is trying to keep the service alive it will retry starting the task several times to see if the problem will self correct. If you know what the problem is and want to stop this retry process early so that you can try another push, simply open the Cluster and click on the Service in the ECS console. Update the service and set the desired count for running tasks to 0 (zero) and update the cluster. Then fix the problem and perform another `amplify push` to try a deployment again.

Common issues ar the application level crashes mentioned above, as well as incorrect Dockerfile/Docker-Compose commands such as those specified in `entrypoint`, `command`, or `RUN`. It's also possible that a specified `healthcheck` is continually failing. To troubleshoot this further you can click on the Cluster then Service in the ECS console followed by Tasks to see the **Stopped** containers. If you expand them there may be a top level error message giving information such as permissions or resource issues. Amplify also sets up logging by default and on this screen you will also find "Log Configuration" to view the logs in CloudWatch when you expand each container entry.

3. Application code bug

Finally you may have an issue in your application code. This would be seen either in the CloudWatch logs outlined above or through functional testing. You can log to CloudWatch via standard language logging (e.g. `console.log()` in NodeJS). The simple and most straight forward way to make a fix is roll forward deployments, such as fixing the code and performing another `amplify push`. Sometimes this is not possible and you need to revert a change to an older image. Amplify automatically creates a commit hash for each successful build before storing the record in ECR, with the most recent build having an additional **latest** tag applied. Older revisions are kept in ECR for 7 days before being cleaned up in order to avoid extra storage costs. If you need to revert to an older version you can note the commit hash and re-tag it along with the **latest** tag, then stop the tasks in your Cluster Service. ECS will automatically pull your newly tagged revision from ECR and deploy that version.