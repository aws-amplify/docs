---
title: Commands
description: Use these Amplify CLI commands to manage a team workflow with multiple environments.
---
 
## Team workflows
 
Amplify environments help you manage your local and cloud environments to mimic your team workflows. Common tasks include:
- Manage environments to support development processes. Eg: development, staging, production
- Test new features safely
- Share environments between team members
- Support team workflows
 
To display all commands available for a new Amplify project, run the following command from the root directory.
```
amplify env
```
 
## Commands overview
 
| Command  | Description  |
|---|---|
| `amplify env add` | Adds a new environment. [More](#add-a-new-environment) |
| `amplify env pull [--restore]` | Pulls the current environment from the cloud. [More](#pull-the-environment-from-the-cloud) |
| `amplify env checkout <env-name> [--restore]` | Switches to the selected environment. [More](#checkout-the-environment) |
| `amplify env list [--details] [--json]` | Displays a list of all the environments. [More](#list-environments) |
| `amplify env get --name <env-name>` | Displays the environment details. [More](#show-environment-details) |
| `amplify env import --name <env-name> --config <provider-configs> [--awsInfo <aws-configs>]` | Imports an environment. [More](#import-an-environment) |
| `amplify env remove <env-name>` | Removes an environment. [More](#remove-an-environment) |
 
## Environment CLI commands
 
### Add a new environment
```
amplify env add
```
The `add` command goes through the following steps:
- Asks for a name for the new environment
- Creates IAM role for unauthenticated users
- Creates IAM role for authenticated users
- Creates S3 bucket for deployment
- Creates a new backend environment in [AWS Amplify Console](https://console.aws.amazon.com/amplify) to view and manage resources.
 
### Pull the environment from the cloud
```
amplify env pull [--restore]
```
Use this command to pull the current environment from the cloud. Add the `--restore` flag to overwrite your local changes like `amplify pull` command.
 
### Checkout an environment
```
amplify env checkout <env-name> [--restore]
```
Use this command to checkout the \<env-name\> environment. Add the `--restore` flag to overwrite your local changes.
 
### List environments
```
amplify env list [--details] [--json]
```
Use this command to list all the environments. Add the `--details` or `--json` flags to see more details and format the output. Details include the AWS Region, IAM roles, S3 bucket and stack information.
 
See the output below for an Amplify project with `dev` and `test` environments. The active environment is preceded with an asterisk.
 
```
> amplify env list
 
| Environments |
| ------------ |
| *dev         |
| test         |
```
 
### Show environment details
```
amplify env get --name <env-name>
```
Use this command to list all details for \<env-name\> environment. Details include the AWS Region, IAM roles, S3 bucket and stack information.
 
### Import an environment
```
amplify env import --name <env-name> --config <provider-configs> [--awsInfo <aws-configs>]
```
Use this command to import an existing environment. Find below an example of a bash command.
 
```
#!/bin/bash
set -e
IFS='|'
 
AWSCLOUDFORMATIONCONFIG="{\
\"Region\": \"us-east-1\",\
\"DeploymentBucketName\": \"mytestproject-20181106123241-deployment\",\
\"UnauthRoleName\": \"mytestproject-20181106123241-unauthRole\",\
\"StackName\": \"mytestproject-20181106123241\",\
\"StackId\": \"arn:aws:cloudformation:us-east-1:132393967379:stack/mytestproject67-20181106123241/1c03a3e0-e203-11e8-bea9-500c20ff1436\",\
\"AuthRoleName\": \"mytestproject67-20181106123241-authRole\",\
\"UnauthRoleArn\": \"arn:aws:iam::132393967379:role/mytestproject67-20181106123241-unauthRole\",\
\"AuthRoleArn\": \"arn:aws:iam::132393967379:role/mytestproject67-20181106123241-authRole\"\
}"
PROVIDER_CONFIG="{\
\"awscloudformation\":$AWSCLOUDFORMATIONCONFIG\
}"
 
 
AWS_CONFIG="{\
\"configLevel\":\"project\",\
\"useProfile\":true,\
\"profileName\":\"default\"\
}"
 
amplify env import \
--name dev \
--config $PROVIDER_CONFIG \
--awsInfo $AWS_CONFIG \
--yes
 
```
 
You can get the `AWSCLOUDFORMATIONCONFIG` from the `team-provider-info.json` file from your existing Amplify project.
 
### Remove an environment
```
amplify env remove <env-name>
```
Use this command to remove an environment. This will remove both the local and the cloud environments including all provisioned services and resources.