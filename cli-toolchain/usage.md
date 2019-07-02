---
title: Usage
---
{% if jekyll.environment == 'production' %}
  {% assign base_dir = site.amplify.docs_baseurl %}
{% endif %}
{% assign media_base = base_dir | append: page.dir | append: "images" %}


# Usage

## Environments & Teams
### Concepts

Amplify fits into the standard Git workflow where you switch between different branches using the `env` command. Similarly to how you will run `git checkout BRANCHNAME` you will run `amplify env checkout ENVIRONMENT_NAME`. The below diagram shows a workflow of how to initialize new environments when creating new git branches.

![Image]({{media_base}}/AmplifyEnvSwitching.jpg)

You can independently add features to each environment which allows you to develop and test before moving them to different stages. This is contingent on which branch you ran a checkout from using Git. Using the same example above of **Dev** being the base which **Test** and **Prod** were derived, you could add (or remove) features and merge & deploy accordingly once you are comfortable with your setup.

![Image]({{media_base}}/AmplifyEnvAddDeploy.jpg)

This can be done in an iterative manner as you work through your deployment pipeline:

![Image]({{media_base}}/AmplifyEnvAddDeploySwitching.jpg)

Multiple developers on a team can also share and manipulate the environment as well by using the credentials in the account. For instance suppose they wanted to test a change to the API without impacting the **Test** or **Prod** deployments. This will allow them to test the configured resources and, if they have been granted appropriate CloudFormation permissions, they can push resources as well to the backend with `amplify push`.

![Image]({{media_base}}/AmplifyEnvMultDevelopers.jpg)

You can alternatively, have developers setup their own isolated replica of these environments in different AWS account. To do this simply:
1. Clone the existing project
2. Run `amplify env add` and set up a new environment (e.g. "mydev") with that developer's account and AWS profile
3. Deploy with `amplify push`

This workflow can be used to share complete Amplify projects with people outside of your organization as well by committing the project into a Git repository. If you are doing this remove (or add to the .gitignore) the **team-provider-info.json** which is located in the `amplify` directory. You can learn more about this file [here](#teamprovider).

### Continuous deployment and Hosting

The Amplify CLI supports basic web application hosting with Amazon S3 and CloudFront. You can use the multi-environments feature with the Amplify Console for a fully managed web application hosting and continuous deployment solution. For more information please learn more in the [official documentation](https://docs.aws.amazon.com/amplify/latest/userguide/multi-environments.html).

### Setting up master and dev environments 

Create a Git repository for your project if you haven't already. It is recommended managing separate Git branches for different environments (try to have the same branch name as your environment name to avoid confusion).
From the root of your project, execute the following commands:

```
$ amplify init
? Enter a name for the environment master
// Provide AWS Profile info
// Add amplify categories using `amplify add <category>`
$ git init
$ git add <all project related files>
$ git commit -m "Creation of a master amplify environment"
$ git remote add origin git@github.com:<repo-name>
$ git push -u origin master
```

**Note**: When you initialize a project using the Amplify CLI, it appends (if a gitignore file exists at the root of the project) or creates one for you (if a gitignore file doesn't exist at the root of your project), with a list of recommended files to check in from the Amplify CLI generated list of files, into your Git repository.

Once you have your 'master' branch setup in Git, set up a 'dev' environment in your Amplify project (which would be based on your 'master' environment), and then walk through the following steps to create a corresponding git branch for it.

```
$ amplify env add
? Do you want to use an existing environment? No
? Enter a name for the environment dev
// Provide AWS Profile info
```

This will set up another environment for the project in the cloud. The backend-configs and resources are now cloned from the 'master' environment. Run `amplify push` to provision all the AWS resources for your new environment (dev).

Now push the changes to the 'master' branch (you would just see changes to the team-provider-info.json file - when running a `git status` command, which has cumulative stack information for all the project environments which are useful when you want to share the same backend within a team). After this, let's create a new git branch - 'dev' corresponding to the new environment we just created.

```
$ git add .
$ git commit -m "Creation of a dev amplify environment"
$ git push -u origin master
$ git checkout -b dev
$ git push -u origin dev
```

### Team workflow

#### Sharing a project within a team
There are two ways to work with Amplify projects within a team:
1. Team members working on their own sandbox environments (Recommended)
2. Team-members sharing the same dev backend to work on 

##### Team-members working on their own sandbox environments (Recommended)
Now you have two independent environments (master & dev) in the cloud and have corresponding git branches with your amplify backend infrastructure code on Git. Suppose a team member wants to work on the same Amplify project, add some features to it and then push changes to the dev environment to test some changes. They would perform the following steps:

```
$ git clone <git-repo>
$ cd <project-dir>
$ git checkout -b mysandbox
$ amplify env add
? Do you want to use an existing environment? No
? Enter a name for the environment mysandbox
// Rest of init steps
// Add/update any backend configurations using amplify add/update <category>
$ amplify push
$ git push -u origin mysandbox
```

Next, suppose the team-member wants to move these changes to dev and master environments/branches: 

```
$ git checkout dev
$ amplify env checkout dev
$ git merge mysandbox
$ amplify push
$ git push -u origin dev
```

After testing that everything works fine in the dev stage, you could now merge dev to the master git branch:

```
$ git checkout master
$ amplify env checkout master
$ git merge dev
$ amplify push
$ git push -u origin master
```

In this approach, you can consider the git branches (dev & master) as the source of truth and all the team members should work off the branches and keep their workspaces in sync.

##### Team-members sharing the same dev backend 
You have two independent environments (master & dev) in the cloud and have corresponding git branches with your amplify backend infrastructure code on Git. Suppose all team members want to work on the same Amplify project and push backend related changes to the same dev environment to test their changes. Each team member would run the following:

```
$ git clone <git-repo>
$ cd <project-dir>
$ git checkout dev
$ amplify init
? Do you want to use an existing environment? Yes
? Choose the environment you would like to use: 
❯ dev 
master
// The rest of init steps
// Add/update any backend configurations using amplify add/update <category>
$ amplify push
$ git push -u origin dev
```

Since the team is sharing the same dev backend, periodically team members would need to pull in changes which their team members pushed for the dev environment to be in sync. Let's pull in the changes from the dev branch & environment.

```
$ cd <your-project>
$ git checkout dev
$ amplify init
? Do you want to use an existing environment? Yes
? Choose the environment you would like to use: 
❯ dev 
master
$ amplify env pull
$ git pull origin dev
```

#### Sharing projects outside the team <a name="teamprovider"></a>
Inside the amplify/ dir file-structure you will observe a **team-provider-info.json** file which contains a structure similar to the following:

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
    "master": {
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

This file is to be shared between team members, so that they have the ability to push/provision resources to the same Cloudformation stack and that way teams can work in a push/pull way and can always be in sync with the latest state of the project in the cloud.

Note: Team members would only be able to push to a stack only if they have the correct credentials (access key/secret keys) to do so.

If you want to share a project publicly and open source your serverless infrastructure, you should remove or put the amplify/team-provider-info.json file in gitignore file.

### Quick Tips
* git and amplify cli should work hand in hand (ideally a CI tool should be used to automate this process - amplify CLI now provides headless support for its init/push commands. Check out <https://github.com/aws-amplify/amplify-cli/tree/multienv/packages/amplify-cli/sample-headless-scripts> for examples)
* git checkout <branch-name> & amplify init (to initialize the env based on the git branch) should go hand in hand 
* git pull & amplify env pull should go hand in hand
* git push & amplify push should go hand in hand

### Environment related commands
* amplify env add <br>
Adds a new environment to your Amplify Project 
* amplify env list [--details] [--json] <br>
Displays a list of all the environments in your Amplify project 
* amplify env remove <env-name> <br>
Removes an environment from the Amplify project
* amplify env get --name <env-name> <br>
Displays the details of the environment specified in the command 
* amplify env pull --restore <br>
Pulls your environment with the current cloud environment. Use the restore flag to overwrite your local backend configs with that in the cloud.
* amplify env import<br>
Imports an already existing Amplify project environment stack to your local backend. Here's a sample usage of the same

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

## Hosting

There are multiple ways to deploy and host your Amplify app. Two options are listed below:


<a href="#using-the-amplify-cli">Amplify CLI</a><br/>
<a href="#using-the-aws-amplify-console">AWS Amplify Console</a>

### Using the Amplify CLI

The `amplify publish` command is designed to build and publish both the backend and the front end of the project. Depending on the stage that the project is at, the command can be configured to publish either to a DEV or a PROD environment.<br/>
In the current implementation, the frontend publish is only available for JavaScript project for static web hosting. This is accomplished by the category plugin amplify-category-hosting, using Amazon S3 and Amazon CloudFront. <br/>
The amplify-category-hosting module uses the amplify-provider-awscloudformation to create and update the S3 and CloudFront resources.
For more  information of the Amazon S3 and Amazon CloudFront, check their docs:<br/>
[S3 static web hosting](https://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html)<br/>
[CloudFront DEV Guide](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html)

#### Workflow
- `amplify hosting add`<br/>
This adds the hosting resources to the backend. The command will first prompt for environment selection, either DEV or PROD. Upon completion, the CloudFormation template for the resources is placed in the amplify/backend/hosting directory. <br/><br/>
- `amplify hosting configure`<br/>
This command walks through the steps to configure the different sections of the resources used in hosting, including S3, CloudFront, and publish ignore. See below for more details.<br/><br/>
- `amplify publish`<br/>
This command first builds and pushes the update of backend resources to the cloud (including the resources used in hosting), and then builds and publishes the frontend.<br/>
For the amplify-category-hosting implementation, the frontend build artifacts will be uploaded to the S3 hosting bucket, and then if the CloudFront is used and the command is executed with the `--invalidateCloudFront` or `-c` flag, an invalidation request will be sent to the CloudFront to invalidate its cache. 


#### Configuration
The command `amplify hosting configure` walks through the steps to configure the different sections of the resources used in hosting. 
- `Website`<br/>
Configures the S3 bucket for static web hosting, the user can set the index doc and error doc, both are set to be `index.html` by default.<br/><br/>
- `CloudFront`<br/>
Configures the CloudFront content delivery network (CDN), the user can configure TTLs (Time To Live) for the default cache behavior, and configure custom error responses.<br/><br/>
- `Publish`<br/>
Configures the publish ignore patterns (just like what's in the .gitignore) for the publish command, the publish command will ignore directories and files in the distribution folder that have names matching the patterns. 

#### Stages
For the amplify-category-hosting implementation, there are two stages you can select from:
- DEV: only S3 static web hosting
- PROD: S3 and CloudFront

It can take time to create and replicate a CloudFront Distribution across the global CDN footprint, in some cases 15 minutes or more. Therefore the Amplify CLI provides a DEV configuration with an S3 static site only when prototyping your application; and a PROD configuration when you are ready to deploy in production. Note that the DEV stage using S3 static sites does not have full HTTPS end to end so it is only recommended for prototyping your app. <br/>
You will be prompted to select a stage when you add hosting. <br/>
CloudFront can also be added or removed in your project afterwards by the `amplify hosting configure` command. <br/>
Note that if the hosting S3 bucket is newly created in regions other than us-east-1, you might get the `HTTP 307 Temporary Redirect` error in the beginning when you access your published application through CloudFront. This is because CloudFront forwards requests to the default S3 endpoint (s3.amazonaws.com), which is in the us-east-1 region, and it can take up to 24 hours for the new hosting bucket name to propagate globally.


### Using the AWS Amplify Console

The AWS Amplify Console is a continuous deployment and hosting service for Amplify web apps. [Learn more](http://console.amplify.aws){: .target='new'}.
{: .callout .callout--action}

The AWS Amplify Console provides a Git-based workflow for building, deploying, and hosting your Amplify web app — both the frontend and backend — from source control. Once you connect a feature branch, all code commits are automatically deployed to an `amplifyapp.com` subdomain or your custom domain. **[Get started >>](https://docs.aws.amazon.com/amplify/latest/userguide/getting-started.html)**

## Headless mode

Several commands in the Amplify CLI take command line parameters which could potentially be used in your CI/CD flows. <br/>
The Amplify CLI command line parameters are not simple strings, but complex JSON objects containing information that the CLI would otherwise gather through prompts. The CLI will not prompt for input (work non-interactively) if the information it seeks is provided by a command line parameter. <br/>
The command line parameters are used mostly for scripting so that the command execution flow is not interrupted by prompts. Examples for this could be found [here](https://github.com/aws-amplify/amplify-cli/tree/master/packages/amplify-cli/sample-headless-scripts)

**`--yes` flag**

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
**`config` for `javascript`**

- `SourceDir`: <br/>
The project's source directory. The CLI will place and update the `aws-exports.js` file in it, the `aws-exports.js` file is used to configure the `Amplify JS` library. 
- `DistributionDir`: <br/>
The project's distribution directory, where the build artifacts are stored. The CLI will upload the contents inside this directory to the S3 hosting buckets in the execution of the `amplify publish` command. 
- `BuildCommand`: <br/> 
The build command for the project. The CLI invokes the build command before uploading the contents in the distribution directory in the execution of the `amplify publish` command. 
- `StartCommand`: <br/>
The start command for the project, used for local testing. The CLI invokes the start command after it has pushed the latest development of the backend to the cloud in the execution of the `amplify run` command.

**`config` for `android`**

- `ResDir`: The Android project's resource directory, such as `app/src/main/res`.

**`config` for `ios`**

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
A boolean indicating whether to use a profile defined in the shared config file (`~/.aws/config`) and credentials file (`~/.aws/credentials`). <br/>
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

## Assuming IAM Role & MFA

You can configure the AWS Amplify CLI to use an IAM role by defining a profile for the role in the shared `~/.aws/config` file. This is similar to how the [AWS CLI](https://aws.amazon.com/cli/) functions.<br/>

When prompted during the execution of `amplify init` or the `amplify configure project` command, you will select a configured profile for the role, and the Amplify CLI will handle the logic to retrieve, cache and refresh the temp credentials. If Multi-Factor Authentication (MFA) is enabled, the CLI will prompt you to enter the MFA token code when it needs to retrieve or refresh temporary credentials. <br/>

The Amplify CLI has its own mechanism of caching temp credentials, it does NOT use the same cache of the AWS CLI. The temporary credentials are cached at `~/.amplify/awscloudformation/cache.json`. You can remove all cached credentials by removing this file.<br/>
If you only want to remove the cached temp credentials associated with a particular project, execute `amplify awscloudformation reset-cache` or it's alias `amplify aws reset-cache` in the project. <br/>

### Step by step guide to create and assume an IAM role
The following is a step by step guide on how to create an IAM role and make it available for the Amplify CLI.

The setup has three parts, we will use an example to demonstrate this capability.<br/>

Assume Biz Corp has decided to hire Dev Corp to develop its inventory management web portal, and Dev Corp is using the Amplify CLI to speed up the development process. <br/>

#### Part #1: Set up the role (Biz Corp)
1. Sign in to the AWS Management Console and open the [IAM](https://console.aws.amazon.com/iam/) console.
2. In the navigation pane of the console, choose `Roles` and then choose `Create role`.
3. Choose the `Another AWS account` role type.
4. For Account ID, type Dev Corp's AWS account ID (the account ID of the entity you want to grant access to your AWS resources).
5. Although optional, it is recommended to select `Require external ID` and enter the external id given to you by Dev Corp. (click [here](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user_externalid.html) for more details on external IDs).
6. If you want to restrict the role to users who sign in with multi-factor authentication (MFA), select `Require MFA`(click [here](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa.html) for more details on MFA).
7. Choose `Next: Permissions`.
8. Select permissions policies that you want the developers from Dev Corp to have when the role is assumed.
Note: You MUST grant the role permissions to perform CloudFormation actions and create associated resources (depending on the categories you use in your project) such as:
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

#### Part #2: Set up the user to assume the role (Dev Corp)
**2.1 Create a policy that has permission to assume the role created above by Biz corp.**

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

**2.2 Attach the policy to the user**

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

**2.3 Assign MFA device (Optional)**

This must be set up if the Biz Corp selected to `Require MFA` when creating the role. This needs to be set up by Dev Corp users and in their respective AWS account.<br/>
We are using a virtual MFA device, such as the Google Authenticator app, in this example.

1. Sign in to the AWS Management Console and open the [IAM](https://console.aws.amazon.com/iam/) console. 
2. In the navigation pane of the console, choose `Users` and select the user created above in 2.2.
3. Select the `Security Credentials` tab.
4. Next to the `Assigned MFA device` label, choose the `Manage` option.
5. In the Manage MFA Device wizard, choose `Virtual MFA device`, and then choose `Continue`.
7. Choose `Show QR code` if the MFA app supports QR code, and scan the QR code from your virtual device(Google Authenticator app in our case), if not, choose `Show secret key` and type it into the MFA app.
8. In the MFA code 1 box, type the one-time password that currently appears in the virtual MFA device. Wait for the device to generate a new one-time password. Then type the second one-time password into the MFA code 2 box. Then choose Assign MFA.
9. Copy the MFA device arn next to `Assigned MFA device`, which will be used in part 3.

#### Part #3: Set up the local development environment (Dev Corp)
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
