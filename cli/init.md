---
---

# Usage

The AWS Amplify CLI helps you set up an AWS IAM user, set up an AWS profile on your local system and then initialize Amplify powered apps with all your defined configurations. We'll also walk through steps as to how you could share the Amplify generated backend configuration between other frontend projects and re-use the same backend infrastructure in-between multiple platforms/users.

In this tutorial, we'll walk through setting up an Amplify-enabled project and go into detail as to what happens behind the scenes when doing so. We'll go over the following commands
* [amplify configure](#amplify-configure)
* [amplify init](#amplify-init)
* [amplify configure project](#amplify-configure-project)

## Install the CLI

Before you install the CLI, ensure you:

- <a href="https://portal.aws.amazon.com/billing/signup?redirect_url=https%3A%2F%2Faws.amazon.com%2Fregistration-confirmation#/start" target="_blank">Sign up for an AWS Account</a>.
- Install <a href="https://nodejs.org/en/download/" target="_blank">Node.js®</a> and <a href="https://www.npmjs.com/get-npm" target="_blank">npm</a> if they are not already on your machine.

Verify that you are running at least Node.js version 8.11+ or greater and npm version 5.x or greater by running `node -v` and `npm -v` in a terminal/console window.
{: .callout .callout--action}

```bash
$ npm install -g @aws-amplify/cli
```

## amplify configure
```bash
$ amplify configure
```
The `amplify configure` command is a one-time setup step. After you perform this on your system you only need to run amplify init going forward on new projects. If you already have the AWS CLI configured on your system you can usually skip this step.
The amplify configure step helps you with the following:
  - Signing up and signing in into AWS
  - Setting up an IAM user with the appropriate policies for the CLI to deploy AWS resources on behalf of the customer. (By default we give administrator access to this IAM user since the CLI needs access to a variety of services for deployments.)
  - Creating an AWS Profile on your local system with reference to the accessKey and secretKey tied to the IAM user created in the above step. This AWS Profile could be given a custom name (by default we name it "default") and can be used for initializing any number of projects moving forward. Essentially the AWS profile defines which AWS account and region the AWS resources would be deployed to.

What happens behind the scenes?

  - An IAM user is created in your AWS account with the appropriate policies required for the CLI to work
  - An AWS Profile is created on your local machine. If you check your ~/.aws/config file on your machine, you would observe a region associated with your profile name in the following format:

```bash
  [profile amplifyprofile]
  region=us-east-1
```
  
  - Similarly, in your ~/.aws/credentials file, you would see the accesskey and secretkey associated with your profile in the following format

```bash
[amplifyprofile]
aws_access_key_id=AKIAI6N66xxxxxxxxxxxx
aws_secret_access_key=4Nmtuxxxxxxxxxxxxxxxxxxxx
```

When you initialize a new project, the CLI will ask you to select an AWS profile. Based on upon your selection all the corresponding resources are deployed to the region and IAM user tied to the selected profile.

## amplify init
```bash
$ amplify init
```

The `amplify init` command is a one-time initialization step for your Amplify powered cloud app. You run this once for each project (JavaScript, iOS, or Android) to connect your app with an AWS backend. 
This setup helps you with the following:
  - Selecting your AWS Profile which would be used to provision cloud resources for your app
  - Selecting the frontend framework for your app and corresponding frontend framework related configurations (like the build command to build your frontend code). This information helps the CLI publish the app to the cloud (after executing the build command), as well as helping to run the app locally for you to test using the `amplify run` command.
 
What happens behind the scenes?
- A CloudFormation stack is deployed for you (which we like to call the parent stack)
- The parent CloudFormation stack provisions the following resources:
  - S3 deployment bucket. It is used to store the following contents: 
     - Parent CloudFormation template
     - Nested CloudFormation templates when you add further AWS resources to your project. 
     - Lambda Zip files (which are used when using API Gateway & Lambda services in your project)
     - AppSync schema and resolver files
  - Auth & Unauth Role with no policies in it during the initialization phase. The policies get populated in it eventually, based on your permission/authorization selections when adding resources to your project like API, Storage, and Analytics
- An `amplify/` directory gets created at the root of your project with the following structure:

```
<project-root>
    |_amplify/
    |_ #current-cloud-backend/
        |_ amplify-meta.json
    |_ .config
        |_ aws-info.json
        |_ project-config.json
    |_ backend/
        |_amplify-meta.json
    |_.amplifyrc
```

- The `amplify/backend` directory contains all the local changes to your backend configurations--such as the CloudFormation templates--when you add resources to your project using the `amplify add <category>` command. It also contains the `amplify-meta.json` file which contains all the metadata tied to your resources which you add via the Amplify CLI. This file has the following format after you first initialize your project:

```
{
"providers": {
    "awscloudformation": {
        "AuthRoleName": "test890-xxxxxxx-authRole",
        "UnauthRoleArn": "arn:aws:iam::132393967379:role/test890-xxxxx-unauthRole",
        "AuthRoleArn": "arn:aws:iam::132393967379:role/test890-xxxxxxxx-authRole",
        "Region": "us-east-1",
        "DeploymentBucketName": "test890-xxxxxxx-deployment",
        "UnauthRoleName": "test890-xxxxxx-unauthRole",
        "StackName": "test890-xxxxxxxxx",
        "StackId": "arn:aws:cloudformation:us-east-1:132393967379:stack/test890-20181006145850/fe8b16d0-xxxxxxxxxxx"
    }
}
}
```

- The `#current-cloud-backend` directory has exactly a similar structure to the `backend` directory. The only differences between it and the `backend` directory are that it has the configurations that reflect what resources were deployed in the cloud with your last `amplify push` command and it helps the CLI diff between the configuration of the resources already provisioned in the cloud and what is currently in your local `backend` directory (which reflects your local changes).

- The `.config` directory consists of the metadata files tied to your project. The `project-config.json` file has the following format:

```
{
    "projectName": "test890",
    "projectPath": "/Users/kaustavg/test890",
    "defaultEditor": "sublime",
    "frontendHandler": {
        "javascript": "/Users/xxxxx/aws-amplify-cli/amplify-cli/packages/amplify-cli/node_modules/amplify-frontend-javascript"
    },
    "javascript": {
        "framework": "none",
        "config": {
            "SourceDir": "src",
            "DistributionDir": "dist",
            "BuildCommand": "npm run-script build",
            "StartCommand": "npm run-script start"
        }
    },
    "providers": {
        "awscloudformation": "/Users/xxxxx/aws-amplify-cli/amplify-cli/packages/amplify-cli/node_modules/amplify-provider-awscloudformation"
    }
}
```

Note: The `project-config.json` file has your local system-specific paths and shouldn't be checked in to your source control if sharing the project with another team member working on another system.

The `.config` directory also has a `aws-info.json` file which lets the CLI know which AWS profile/accesskey-secret key pair to use when adding AWS resources to your project. If you're using an AWS profile to initialize your project, the format should be the following:

```
{
    "useProfile": true,
    "profileName": "amplifyprofile"
}
```

- The `.amplifyrc` file consists of deployment-related information which is not currently used but would be used in the future for CI/CD workflows. It should have the following format:

```json
{
    "providers": {
        "awscloudformation": {
            "AuthRoleName": "test890-xxxxxxx-authRole",
            "UnauthRoleArn": "arn:aws:iam::132393967379:role/test890-xxxxx-unauthRole",
            "AuthRoleArn": "arn:aws:iam::132393967379:role/test890-xxxxxxxx-authRole",
            "Region": "us-east-1",
            "DeploymentBucketName": "test890-xxxxxxx-deployment",
            "UnauthRoleName": "test890-xxxxxx-unauthRole",
            "StackName": "test890-xxxxxxxxx",
            "StackId": "arn:aws:cloudformation:us-east-1:132393967379:stack/test890-20181006145850/fe8b16d0-xxxxxxxxxxx"
        }
    }
}
```
        
## amplify configure project

```bash
$ amplify configure project
```

The `amplify configure project` command is an advanced command and not commonly used for getting started or individual development projects. 
The command should be used in the following cases:
  - When wanting to modify the project and AWS configurations set during the `amplify init` step
  - When sharing your backend infrastructure code with multiple frontends
  - When sharing your backend infrastructure code with multiple team members working on different machines
  
  Note:  When sharing your backend infrastructure between multiple frontend projects or between different machines, you will need to first manually copy the `amplify/` directory from your current project to the other project's root directory and then run the `amplify configure project` command.

 The `amplify configure project` command helps you with the following:
  - Modifying the existing configurations present in the `.config/` directory tied to your project and re-configuring your AWS credentials as well (based on profile on your local machine).
  - If you re-configure the frontend framework of your project it creates the corresponding configuration files required by your frontend code. For example, if you want to change your frontend from a javascript-based react app to an android app it generates a corresponding `awsconfiguration.json` file which could be fed into the AWS Mobile SDK APIs.

What happens behind the scenes?
  - The `.config/` directory is generated in the `amplify/` directory if not already present and the `aws-info.json` and `project-info.json` files are configured to reflect the selections made as a part of the `amplify configure project` command.
