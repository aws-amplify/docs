---
---

# Usage

The AWS Amplify CLI helps you set up an AWS IAM user, set up an AWS profile on your local system and then initialize Amplify powered apps with all your defined configurations. We'll also walk through steps as to how you could share the Amplify generated backend configuration between other frontend projects and re-use the same backend infrastructure in-between multiple platforms/users.

In this tutorial, we'll walk through setting up an Amplify-enabled project and go into detail as to what happens behind the scenes when doing so. We'll go over the following commands:
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

**Note**: The use of this CLI version >= 1.0, might cause existing projects initialized using a previous Amplify CLI version (< 1.0) to no longer function when attempting to manage resources in the existing project, or have unexpected side effects. After updating the CLI to >= 1.0, the CLI would prompt you to automatically migrate your project, so that is it compatible with the new version of the CLI. [Read more]({%if jekyll.environment == 'production'%}{{site.amplify.docs_baseurl}}{%endif%}/cli/migrate). CLI version >=1.0 supports multiple enviornments and team workflows. [Read more]({%if jekyll.environment == 'production'%}{{site.amplify.docs_baseurl}}{%endif%}/cli/multienv)

**We recommend backing up your Amplify project directory first before performing a migration.**

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
        |_ local-aws-info.json
        |_ local-env-info.json
        |_ project-config.json
    |_ backend/
        |_amplify-meta.json
    |_team-provider-info.json
```

- The `amplify/backend` directory contains all the local changes to your backend configurations--such as the CloudFormation templates--when you add resources to your project using the `amplify add <category>` command. It contains the `backend-config.json` file which is a structure to represent your backend infrastructure and certain CLI runtime files like the `amplify-meta.json` file which contains all the metadata tied to your resources which you add via the Amplify CLI.


- The `#current-cloud-backend` directory has a similar structure to the `backend` directory. The only differences between it and the `backend` directory are that it has the configurations that reflect what resources were deployed in the cloud with your last `amplify push` command and it helps the CLI diff between the configuration of the resources already provisioned in the cloud and what is currently in your local `backend` directory (which reflects your local changes).

- The `.config` directory consists of the metadata files tied to your project. 
The `project-config.json` file, which can be safely checked into a version control system, represents information specific to the app you're building. For e.g. a sample format shown below reflects the framework you're using for your app:

```
{
    "projectName": "testapp",
    "javascript": {
        "framework": "react",
        "config": {
            "SourceDir": "src",
            "DistributionDir": "dist",
            "BuildCommand": "npm run-script build",
            "StartCommand": "npm run-script start"
        }
    },
    "providers": [
        "awscloudformation"
    ],
    "frontend": "javascript",
    "version": "1.0"
}
```


The `.config` directory also has a `local-aws-info.json` file that lets the CLI know which AWS profile/accesskey-secret key pair to use when adding AWS resources to your project.<br>
Note: This file should not be checked into version control since it has information specific to a system on which the CLI is running on. <br>
If you're using an AWS profile to initialize your project, the format should be the following:

```
{
    "dev": {
        "configLevel": "project",
        "useProfile": true,
        "profileName": "devprofile"
    },
    "prod": {
        "configLevel": "project",
        "useProfile": true,
        "profileName": "prodprofile"
    }
}
```

The `local-env-info.json` file present in the `.config` directory lets the CLI store user/system preferences which the user inputs when initializing the Amplify project in his/her system. These configurations could be later changed using the `amplify configure project` command. <br>
Note: This file should not be checked into version control since it has information specific to a system on which the CLI is running on. <br>
This file has the following format:

```
{
    "projectPath": "/Users/kaustavg/migtest",
    "defaultEditor": "sublime",
    "envName": "dev"
}
```



- The `team-provider-info.json` file consists of deployment-related information for all the environments tied to a project which is specifically useful and should be checked into a version control system when sharing your environments and backend infrastructure within a team. This file isn't required to be shared if you're publicly sharing your app infrastructure. For more information, please refer to [Sharing project within a team](https://aws-amplify.github.io/docs/cli/multienv#sharing-a-project-within-a-team). This file has the following format:

```json
{
    "dev": {
        "awscloudformation": {
            "AuthRoleName": "multenvtest-20181115101929-authRole",
            "UnauthRoleArn": "arn:aws:iam::132393967379:role/multenvtest-20181115101929-unauthRole",
            "AuthRoleArn": "arn:aws:iam::132393967379:role/multenvtest-20181115101929-authRole",
            "Region": "us-east-1",
            "DeploymentBucketName": "multenvtest-20181115101929-deployment",
            "UnauthRoleName": "multenvtest-20181115101929-unauthRole",
            "StackName": "multenvtest-20181115101929",
            "StackId": "arn:aws:cloudformation:us-east-1:132393967379:stack/multenvtest-20181115101929/fc7b1010-e902-11e8-a9bd-50fae97e0835"
        }
    },
    "prod": {
        "awscloudformation": {
            "AuthRoleName": "multenvtest-20181115102119-authRole",
            "UnauthRoleArn": "arn:aws:iam::345090917734:role/multenvtest-20181115102119-unauthRole",
            "AuthRoleArn": "arn:aws:iam::345090917734:role/multenvtest-20181115102119-authRole",
            "Region": "us-east-1",
            "DeploymentBucketName": "multenvtest-20181115102119-deployment",
            "UnauthRoleName": "multenvtest-20181115102119-unauthRole",
            "StackName": "multenvtest-20181115102119",
            "StackId": "arn:aws:cloudformation:us-east-1:345090917734:stack/multenvtest-20181115102119/3e907b70-e903-11e8-a18b-503acac41e61"
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
  
  Note:  When sharing your backend infrastructure between multiple frontend projects or between different machines, you will need to first manually copy the `amplify/` directory from your current project to the other project's root directory and then run the `amplify configure project` command.

 The `amplify configure project` command helps you with the following:
  - Modifying the existing configurations present in the `.config/` directory tied to your project and re-configuring your AWS credentials as well (based on profile on your local machine).
  - If you re-configure the frontend framework of your project it creates the corresponding configuration files required by your frontend code. For example, if you want to change your frontend from a javascript-based react app to an android app it generates a corresponding `awsconfiguration.json` file which could be fed into the AWS Mobile SDK APIs.

What happens behind the scenes?
  - The `.config/` directory is generated in the `amplify/` directory if not already present and the `local-aws-info.json`, `local-env-info.json` and `project-info.json` files are configured to reflect the selections made as a part of the `amplify configure project` command.
  
  
## Headless usage of the CLI

Several commands in the Amplify CLI take command line parameters which could potentially be used in your CI/CD flows. <br/>
The Amplify CLI command line parameters are not simple strings, but complex JSON objects containing information that the CLI would otherwise gather through prompts. The CLI will not prompt for input (work non-interactively) if the information it seeks is provided by a command line parameter. <br/>
The command line parameters are used mostly for scripting so that the command execution flow is not interrupted by prompts. Examples for this could be found [here](https://github.com/aws-amplify/amplify-cli/tree/master/packages/amplify-cli/sample-headless-scripts)

##### `--yes` flag
The `--yes` flag, or its alias `-y`, suppresses command line prompts if defaults are available, and uses the defaults in command execution.<br/>
The following commands take the `--yes` flag: 
- `amplify init`
- `amplify configure project`
- `amplify push`
- `amplify publish`

#### `amplify init` parameters
The `ampify init` command takes these parameters: 
- `--amplify`
- `--frontend`
- `--providers`
- `--yes`

##### `--amplify`
Contains basic information of the project, it has these keys: 
- `projectName`: the name of the project under development
- `envName`: the name of your first environment
- `defaultEditor`: your default code editor 

##### `--frontend`
Contains information for the CLI's frontend plugin, it has these keys:
- `frontend`: the name of the chosen frontend plugin (without the `amplify-frontend-` prefix).
- `framework`: the frontend framework used in the project, such as `react`. Only the `javascript` frontend handler takes it.
- `config`: the configuration settings for the frontend plugin. 

There are currently three official frontend plugins, and the following are the specifications of their respective `config` object: 
##### `config` for `javascript`
- `SourceDir`: <br/>
The project's source directory. The CLI will place and update the `aws-exports.js` file in it, the `aws-exports.js` file is used to configure the `Amplify JS` library. 
- `DistributionDir`: <br/>
The project's distribution directory, where the build artifacts are stored. The CLI will upload the contents inside this directory to the S3 hosting buckets in the execution of the `amplify publish` command. 
- `BuildCommand`: <br/> 
The build command for the project. The CLI invokes the build command before uploading the contents in the distribution directory in the execution of the `amplify publish` command. 
- `StartCommand`: <br/>
The start command for the project, used for local testing. The CLI invokes the start command after it has pushed the latest development of the backend to the cloud in the execution of the `amplify run` command.

##### `config` for `android`
- `ResDir`: The Android project's resource directory, such as `app/src/main/res`.

##### `config` for `ios`
The `ios` frontend handler does NOT take the `config` object.

##### `--providers`
Contains configuration settings for provider plugins. <br/>
The key is the name of the provider plugin (without the `amplify-provider-` prefix), and the value is its configuration.<br/>
Provider plugins contained in this object will be initialized, and able to provide functionalities for creation and maintenance of the cloud resources. <br/>
Currently there is only one official provider plugin: `amplify-provider-awscloudformation`, its configuration is for the CLI to resolve aws credentials and region, the following are the specifications: 

- `configLevel`: <br/> 
The configuration level is either `project` or `general`.<br/>
Unless explicitly set to `general`, the `project` level is chosen. <br/>
`general` level means the CLI will not manage configuration at the project level, it instead relies on the AWS SDK to resolve aws credentials and region. To learn how it works, check the AWS SDK's documents on [credentials](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html) and [region](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-region.html).<br/>
`project` level means the configuration is managed at the project level by the CLI, each project gets its own independent configuration. The following attributes are used only when the configuration is at project level<br/>
- `useProfile`: <br/> 
A boolean indicating weather to use a profile defined in the shared config file (`~/.aws/config`) and credentials file (`~/.aws/credentials`). <br/>
- `profileName`: <br/> 
The name of the profile if `useProfile` is set to true. <br/>
- `accessKeyId`: <br/> 
The aws access key id if `useProfile` is set to false. <br/>
- `secretAccessKey`: <br/> 
The aws secret access key if `useProfile` is set to false. <br/>
- `region`: <br/> 
The aws region if `useProfile` is set to false. <br/>

##### Sample script
```bash
#!/bin/bash
set -e
IFS='|'

REACTCONFIG="{\
\"SourceDir\":\"src\",\
\"DistributionDir\":\"build\",\
\"BuildCommand\":\"npm run-script build\",\
\"StartCommand\":\"npm run-script start\"\
}"
AWSCLOUDFORMATIONCONFIG="{\
\"configLevel\":\"project\",\
\"useProfile\":false,\
\"profileName\":\"default\",\
\"accessKeyId\":\"headlessaccesskeyid\",\
\"secretAccessKey\":\"headlesssecrectaccesskey\",\
\"region\":\"us-east-1\"\
}"
AMPLIFY="{\
\"projectName\":\"headlessProjectName\",\
\"envName\":\"myenvname\",\
\"defaultEditor\":\"code\"\
}"
FRONTEND="{\
\"frontend\":\"javascript\",\
\"framework\":\"react\",\
\"config\":$REACTCONFIG\
}"
PROVIDERS="{\
\"awscloudformation\":$AWSCLOUDFORMATIONCONFIG\
}"

amplify init \
--amplify $AMPLIFY \
--frontend $FRONTEND \
--providers $PROVIDERS \
--yes
```

#### `amplify configure project` parameters
The `amplify configure project` command allows the user to change the configuration settings that were first set by `amplify init`, and it takes the same parameters as the `amplify init` command: 
- `--amplify`
- `--frontend`
- `--providers`
- `--yes`

##### Sample script
```bash
#!/bin/bash
set -e
IFS='|'

REACTCONFIG="{\
\"SourceDir\":\"src\",\
\"DistributionDir\":\"build\",\
\"BuildCommand\":\"npm run-script build\",\
\"StartCommand\":\"npm run-script start\"\
}"
AWSCLOUDFORMATIONCONFIG="{\
\"configLevel\":\"project\",\
\"useProfile\":false,\
\"profileName\":\"default\",\
\"accessKeyId\":\"headlessaccesskeyid\",\
\"secretAccessKey\":\"headlesssecrectaccesskey\",\
\"region\":\"us-east-1\"\
}"
AMPLIFY="{\
\"projectName\":\"headlessProjectName\",\
\"defaultEditor\":\"code\"\
}"
FRONTEND="{\
\"frontend\":\"javascript\",\
\"framework\":\"react\",\
\"config\":$REACTCONFIG\
}"
PROVIDERS="{\
\"awscloudformation\":$AWSCLOUDFORMATIONCONFIG\
}"

amplify configure project \
--amplify $AMPLIFY \
--frontend $FRONTEND \
--providers $PROVIDERS \
--yes
```

#### `amplify push/publish` parameters 
The `amplify publish` command internally executes `amplify push` so it takes the same parameters as push command. The `amplify push` command takes the following parameters
- `--codegen`
- `--yes`

##### `--codegen`
Contains configuration for AppSync [codegen](https://aws-amplify.github.io/docs/cli/codegen?sdk=js), the following are the specifications:
- `generateCode`: <br/>
A boolean indicating if to generate code for your GraphQL API.<br/>
- `codeLanguage`: <br/>
The targeted language of the generated code, such as `javascript`.<br/>
- `fileNamePattern`:  <br/>
The file name pattern of GraphQL queries, mutations and subscriptions.<br/>
- `generatedFileName`:  <br/>
The file name for the generated code.<br/>
- `generateDocs`:  <br/>
A boolean indicating whether to generate GraphQL statements (queries, mutations and subscription) based on the GraphQL schema types. The generated version will overwrite the current GraphQL queries, mutations and subscriptions.<br/>

##### Sample script
```bash
#!/bin/bash
set -e
IFS='|'

CODEGEN="{\
\"generateCode\":true,\
\"codeLanguage\":\"javascript\",\
\"fileNamePattern\":\"src/graphql/**/*.js\",\
\"generatedFileName\":\"API\",\
\"generateDocs\":true\
}"

amplify push \
--codegen $CODEGEN \
--yes
```

## Assuming an IAM Role

You can configure the AWS Amplify CLI to use an IAM role by defining a profile for the role in the shared `~/.aws/config` file. This is similar to how the [AWS CLI](https://aws.amazon.com/cli/) functions.<br/>

When prompted during the execution of `amplify init` or the `amplify configure project` command, you will select a configured profile for the role, and the Amplify CLI will handle the logic to retrieve, cache and refresh the temp credentials. If Multi-Factor Authentication (MFA) is enabled, the CLI will prompt you to enter the MFA token code when it needs to retrieve or refresh temporary credentials. <br/>

The Amplify CLI has its own mechanism of caching temp credentials, it does NOT use the same cache of the AWS CLI. The temporary credentials are cached at `~/.amplify/awscloudformation/cache.json`. You can remove all cached credentials by removing this file.<br/>
If you only want to remove the cached temp credentials associated with a particular project, execute `amplify awscloudformation reset-cache` or it's alias `amplify aws reset-catch` in the project. <br/>

### Step by step guide to create and assume an IAM role
The following is a step by step guide on how to create an IAM role and make it available for the Amplify CLI.

The setup has three parts, we will use an example to demonstrate this capability.<br/>

Assume Biz Corp has decided to hire Dev Corp to develop its inventory management web portal, and the Dev Corp is using the Amplify CLI to speed up the development process. <br/>

#### Part #1: Setup the role (Biz Corp)
1. Sign in to the AWS Management Console and open the [IAM](https://console.aws.amazon.com/iam/) console.
2. In the navigation pane of the console, choose `Roles` and then choose `Create role`.
3. Choose the `Another AWS account` role type.
4. For Account ID, type the AWS account ID of the Dev Corp (account ID of the entity you want to grant access to your AWS resources).
5. Although optional, it is recommended to select `Require external ID` and enter the external id given to you by the Dev Corp. (click [here](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user_externalid.html) for more details on external ID).
6. If you want to restrict the role to users who sign in with multi-factor authentication (MFA), select `Require MFA`(click [here](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa.html) for more details on MFA).
7. Choose `Next: Permissions`.
8. Select permissions policies that you want the developers from the Dev Corp to have when the role is assumed.
Note: You MUST grant the role permissions to perform Cloudformation actions and create associated resources (depending on categories you use in your project) such as:
- Cognito User and Identity Pools
- S3 buckets
- DynamoDB tables
- AppSync APIs
- API Gateway APIs
- Pinpoint endpoints
- Cloudfront distributions
- IAM Roles
- Lambda functions
- Lex bots

9. Choose `Next: Tagging`, attach tags if you want (optional).
10. Choose `Next: Review`, type a name for your role, and optionally add the role description.
11. Enter the required fields such as the "Role name".
11. Choose `Create role`.
12. Give the Role Arn to Dev Corp.

#### Part #2: Setup the user to assume the role (Dev Corp)
##### 2.1 Create a policy that has permission to assume the role created above by Biz corp. 
1. Get the Role Arn from Biz Corp.
2. Sign in to the AWS Management Console and open the [IAM](https://console.aws.amazon.com/iam/) console. (Assuming Dev corp has a separate AWS account).
3. In the navigation pane of the console, choose `Policies` and then choose `Create policy`.
4. Select the 'JSON' tab and paste the following contents in the pane, replacing `<biz_corp_rol_arn>` with the value previously noted.
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "sts:AssumeRole",
            "Resource": "<biz_corp_rol_arn>"
        }
    ]
}
```
3. Choose `Review policy`.
4. Type in the policy Name, and optionally add the policy description. 
5. Choose `Create policy`.

##### 2.2 Attach the policy to the user
1. Sign in to the AWS Management Console and open the [IAM](https://console.aws.amazon.com/iam/) console.
2. In the navigation pane of the console, choose `Users` and then choose `Add user`.
3. Type the `User name` for the new user.
4. Select Programmatic access for `Access type`.
5. Choose `Next: Permissions`.
6. On the Set Permissions Page, select `Attach existing policies directly`.
7. Select the policy created in 2.1.
9. Choose `Next: Tagging`, attach tags if you wish (optional).
10. Choose `Next: Review`.
11. Choose `Create User`.
12. Click `Download .csv` to download a copy of the credentials. You can, optionally, copy paste the Access Key ID and Secret Access Key and store it in a safe location. These credentials would be used in a later section.

##### 2.3 Assign MFA device (Optional)
This must be set up if the Biz Corp selected to `Require MFA` when creating the role. This needs to be set up by the Dev Corp users and in their respective AWS account.<br/>
We are using a virtual MFA device, such as the Google Authenticator app, in this example.

1. Sign in to the AWS Management Console and open the [IAM](https://console.aws.amazon.com/iam/) console. 
2. In the navigation pane of the console, choose `Users` and select the user created above in 2.2.
3. Select the `Security Credentials` tab.
4. Next to the `Assigned MFA device` label, choose the `Manage` option.
5. In the Manage MFA Device wizard, choose `Virtual MFA device`, and then choose `Continue`.
7. Choose `Show QR code` if the MFA app supports QR code, and scan the QR code from your virtual device(Google Authenticator app in our case), if not, choose `Show secret key` and type it into the MFA app.
8. In the MFA code 1 box, type the one-time password that currently appears in the virtual MFA device. Wait for the device to generate a new one-time password. Then type the second one-time password into the MFA code 2 box. Then choose Assign MFA.
9. Copy the MFA device arn next to `Assigned MFA device`, which will be used in part 3.

#### Part #3: Setup the local development environment (Dev Corp)
1. On the local development system, create the following two files if they do not exist.<br/>
  `~/.aws/config`<br/>
  `~/.aws/credentials`<br/>
2. Insert the following contents into the `~/.aws/config` file:

```ini
[profile bizcorprole]
role_arn=<role_arn_from_part#1>
source_profile=devcorpuser
mfa_serial=<mfa_serial_from_part_2.3---optional>
external_id=<external_id_as_mentioned_in_part#1--optional>
region=us-east-1

[profile devcorpuser]
region=us-east-1
```

`mfa_serial` and `external_id` are optional, leave them out if they are not configured.

3. Insert the following contents into the `~/.aws/credentials` file:
```ini
[devcorpuser]
aws_access_key_id=<key_id_from_part_2.2>
aws_secret_access_key=<secret_access_key_from_part_2.2>
```
Now, when Dev Corp is trying to initialize an Amplify Project, the user can select the `bizcorprole` profile configured above, and based on the authentication method set up the user would be prompted with corresponding questions such as MFA codes. After this, the user would be able to successfully deploy/manage AWS resources in Biz corps account (based on the access policies set by the Biz corp).


You can take a look at [AWS IAM](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user.html) and the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-role.html) documentation for more details on IAM role and its usage.<br/>
