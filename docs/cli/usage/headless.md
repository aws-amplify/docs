---
title: Headless mode for CI/CD
description: Several commands in the Amplify CLI support arguments which could potentially be used in your CI/CD flows.
---
Several commands in the Amplify CLI support arguments which could potentially be used in your CI/CD flows. The Amplify CLI arguments are not just simple strings, but also JSON objects containing information that the CLI would otherwise gather through prompts. The CLI will not prompt for input (work non-interactively) if the information it seeks is provided by an argument.

Arguments are used mostly for scripting so that the command execution flow is not interrupted by prompts. Examples for this could be found [here](https://github.com/aws-amplify/amplify-cli/tree/master/packages/amplify-cli/sample-headless-scripts)

**`--yes` flag**

The `--yes` flag, or its alias `-y`, suppresses command line prompts if defaults are available, and uses the defaults in command execution.
The following commands take the `--yes` flag:
- `amplify init`
- `amplify configure project`
- `amplify push`
- `amplify publish`
- `amplify pull`

## `amplify init` parameters
The `amplify init` command takes these parameters:
- `--amplify`
- `--frontend`
- `--providers`
- `--categories`
- `--yes`
- `--app`

### `--amplify`
Contains basic information of the project, it has these keys:
- `projectName`: the name of the project under development
- `appId`: the Amplify Service project Id (optional, see below)
- `envName`: the name of your first environment
- `defaultEditor`: your default code editor

The `appId` parameter is optional and it is used in two use cases.
- Amplify Service uses it internally when you initialize a project on Amplify web console.
- For project migrations. For projects initialized by Amplify CLI version prior to 4.0.0, no Amplify Service project is created online to track the backend environment's resources. The latest version of the Amplify CLI will create a new Amplify Service project for them in the post-push check. If you wanted to add the backend environment to an existing Amplify Service project instead of creating a new one, you can run `amplify init` again, and provide the `appId` inside the `--amplify` parameter, or explicitly as `amplify init --appId <Amplify-Service-Project-AppId>`.

### `--frontend`
Contains information for the CLI's frontend plugin, it has these keys:
- `frontend`: the name of the chosen frontend plugin (without the `amplify-frontend-` prefix).
- `framework`: the frontend framework used in the project, such as `react`. Only the `javascript` frontend handler takes it.
- `config`: the configuration settings for the frontend plugin.

There are currently three official frontend plugins, and the following are the specifications of their respective `config` object:
**`config` for `javascript`**

- `SourceDir`:
The project's source directory. The CLI will place and update the `aws-exports.js` file in it, the `aws-exports.js` file is used to configure the `Amplify JS` library.
- `DistributionDir`:
The project's distribution directory, where the build artifacts are stored. The CLI will upload the contents inside this directory to the S3 hosting buckets in the execution of the `amplify publish` command.
- `BuildCommand`:
The build command for the project. The CLI invokes the build command before uploading the contents in the distribution directory in the execution of the `amplify publish` command.
- `StartCommand`:
The start command for the project, used for local testing. The CLI invokes the start command after it has pushed the latest development of the backend to the cloud in the execution of the `amplify run` command.

**`config` for `android`**

- `ResDir`: The Android project's resource directory, such as `app/src/main/res`.

**`config` for `ios`**

The `ios` frontend handler does NOT take the `config` object.

### `--providers`
Contains configuration settings for provider plugins. The key is the name of the provider plugin (without the `amplify-provider-` prefix), and the value is its configuration. Provider plugins contained in this object will be initialized, and able to provide functionalities for creation and maintenance of the cloud resources.

Currently there is only one official provider plugin: `amplify-provider-awscloudformation`, its configuration is for the CLI to resolve aws credentials and region, the following are the specifications:

- `configLevel`:
The configuration level is either `project` or `general`. Unless explicitly set to `general`, the `project` level is chosen.
`general` level means the CLI will not manage configuration at the project level, it instead relies on the AWS SDK to resolve aws credentials and region. To learn how it works, check the AWS SDK's documents on [credentials](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html) and [region](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-region.html).
`project` level means the configuration is managed at the project level by the CLI, each project gets its own independent configuration. The following attributes are used only when the configuration is at project level
- `useProfile`:
A boolean indicating whether to use a profile defined in the shared config file (`~/.aws/config`) and credentials file (`~/.aws/credentials`). <br/>
- `profileName`:
The name of the profile if `useProfile` is set to true.
- `accessKeyId`:
The aws access key id if `useProfile` is set to false.
- `secretAccessKey`:
The aws secret access key if `useProfile` is set to false.
- `region`:
The aws region if `useProfile` is set to false.

### `--categories`
Contains configuration settings for resources in the given categories. The key is the name of the category and the value is its configuration. There are resource parameters that are not persisted into configuration files and requires prompting for them during a headless CLI operation and to support headless workflows they are required to be passed in for each resource..

#### Imported resources

Currently `auth` and `storage` category resources can be imported to an Amplify CLI project.

#### `auth` category

- `userPoolId`: The Id of the Cognito User Pool that was imported into the project.
- `webClientId`: The Id of the app client configured for the given Cognito User Pool to be used by web applications.
- `nativeClientId`: The Id of the app client configured for the given Cognito User Pool to be used by Native applications.
- `identityPoolId`: In case if an Cognito Identity Pool was also configured for the `auth` resource this parameter is the Id of that resource. If there is no associated Cognito Identity Pool was configured, this parameter should not be passed in.

Sample `auth` category configuration:
```bash
AUTHCONFIG="{\
\"userPoolId\": \"myproject-userpool-id\",\
\"webClientId\": \"appid-web\",\
\"nativeClientId\": \"appid-native\",\
\"identityPoolId\": \"myproject-idp-poolid\"\
}"

CATEGORIES="{\
\"auth\":$AUTHCONFIG\
}"
```

#### `storage``` category

Storage category supports the importing of S3 Buckets and DynamoDB tables. They require different parameter sets within the storage category.

#### S3 Buckets
- `region`: The region of the S3 bucket resource. S3 Buckets are global, but the CLI requires to storage of the region as a parameter, so it needs to be passed in. Currently it must be the same region where the Amplify project was created.
- `bucketName`: The name of the imported S3 bucket.

```bash
STORAGECONFIG="{\
  \"region\": \"us-east-1\",\
  \"bucketName\": \"my-project-bucket\"\
}"

CATEGORIES="{\
  \"storage\":$STORAGECONFIG\
}"
```

#### DynamoDB Tables

An Amplify project can have multiple DynamoDB storage resources imported and the parameters must be supplied to each of them.
- `region`: The region of the DynamoDB table resources. Currently it must be the same region where the Amplify project was created.
- `tables`: An object where the key is the Amplify resource name and the value is the name of the DynamoDB table.

```bash
STORAGECONFIG="{\
  \"region\": \"us-east-1\",
  \"tables\": {\"
    \"posts\": \"myproject-posts-dev\",\
    \"comments\": \"myproject-comments-dev\",\
  }"\
}"

CATEGORIES="{\
  \"storage\":$STORAGECONFIG
}"
```

### `--app`

`amplify init --app git@github.com:<github-username>/<repository-name>.git`

Installs, initializes, and provisions resources for a sample amplify application from the provided GitHub repository URL. This option must be executed in an empty directory. The sample repository must have an amplify folder, including the following:

- `project-config.json` in .config folder
- `backend-config.json` in backend folder
- The necessary cloudformation files in the backend folder
    - e.g. stacks, `schema.graphql` for api
    - e.g. cloudformation template for auth


- local files local-env.json and local-aws-info.json are *NOT* required

If the repository contains a `yarn.lock` and/or `package.json` file, the sample will be installed with the corresponding package manager and started after resources have been provisioned.

### Sample script
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

## `amplify configure project` parameters
The `amplify configure project` command allows the user to change the configuration settings that were first set by `amplify init`, and it takes the same parameters as the `amplify init` command:
- `--amplify`
- `--frontend`
- `--providers`
- `--yes`

### Sample script
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

## `amplify push/publish` parameters
The `amplify publish` command internally executes `amplify push` so it takes the same parameters as push command. The `amplify push` command takes the following parameters
- `--codegen`
- `--yes`

### `--codegen`
Contains configuration for AppSync [codegen](~/cli/graphql-transformer/codegen.md), the following are the specifications:
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

### Sample script
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

## `amplify pull` parameters
The `amplify pull` command pulls down the latest backend environment to your local development.
It is used in two scenarios:
1. On projects already initialized by the Amplify CLI, it pulls down the latest from the Cloud and updates the contents in the `amplify/#current-cloud-backend` directory. The command does not take any parameters when used in this scenario.
2. On projects NOT yet initialized by the Amplify CLI, it pulls down a particular backend environment, and "attaches" it to the project. It will fully set up the `amplify` directory for the project.  The backend environment being pulled is specified by `appId` and `envName` in the `amplify` parameter (see below). The command takes the following parameters when used in this scenario.
- `--amplify`
- `--frontend`
- `--providers`
- `--yes`

### `--amplify`
Contains basic information of the project, it has these keys:
- `projectName`: the name of the project under development
- `appId`: the Amplify Service project Id
- `envName`: the name of the backend environment in the above mention Amplify Service that you want to pull down
- `defaultEditor`: your default code editor

### `--frontend`
Contains information for the CLI's frontend plugin, it has these keys:
- `frontend`: the name of the chosen frontend plugin (without the `amplify-frontend-` prefix).
- `framework`: the frontend framework used in the project, such as `react`. Only the `javascript` frontend handler takes it.
- `config`: the configuration settings for the frontend plugin.

There are currently three official frontend plugins, and the following are the specifications of their respective `config` object:
**`config` for `javascript`**

- `SourceDir`:
The project's source directory. The CLI will place and update the `aws-exports.js` file in it, the `aws-exports.js` file is used to configure the `Amplify JS` library.
- `DistributionDir`:
The project's distribution directory, where the build artifacts are stored. The CLI will upload the contents inside this directory to the S3 hosting buckets in the execution of the `amplify publish` command.
- `BuildCommand`:
The build command for the project. The CLI invokes the build command before uploading the contents in the distribution directory in the execution of the `amplify publish` command.
- `StartCommand`:
The start command for the project, used for local testing. The CLI invokes the start command after it has pushed the latest development of the backend to the cloud in the execution of the `amplify run` command.

**`config` for `android`**

- `ResDir`: The Android project's resource directory, such as `app/src/main/res`.

**`config` for `ios`**

The `ios` frontend handler does NOT take the `config` object.

### `--providers`
The pull command is tied to the official provider plugin: `amplify-provider-awscloudformation` to pull down and attach a backend environment to your frontend project.
- `configLevel`:
The configuration level is either `project` or `general`. Unless explicitly set to `general`, the `project` level is chosen.
`general` level means the CLI will not manage configuration at the project level, it instead relies on the AWS SDK to resolve aws credentials and region. To learn how it works, check the AWS SDK's documents on [credentials](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html) and [region](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-region.html).
`project` level means the configuration is managed at the project level by the CLI, each project gets its own independent configuration. The following attributes are used only when the configuration is at project level
- `useProfile`:
A boolean indicating whether to use a profile defined in the shared config file (`~/.aws/config`) and credentials file (`~/.aws/credentials`). <br/>
- `profileName`:
The name of the profile if `useProfile` is set to true.
- `accessKeyId`:
The aws access key id if `useProfile` is set to false.
- `secretAccessKey`:
The aws secret access key if `useProfile` is set to false.
- `region`:
The aws region if `useProfile` is set to false.

### Sample script
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
\"appId\":\"amplifyServiceProjectAppId\",\
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

amplify pull \
--amplify $AMPLIFY \
--frontend $FRONTEND \
--providers $PROVIDERS \
--yes
```

## `amplify delete` parameters
The `amplify delete` command deletes all of the resources tied to the current project in the cloud, and removes all of the local files created by the Amplify CLI from the filesystem. The `amplify delete` command takes these parameters:
- `--force`

### `--force`

Equivalent to the `--yes` parameter that other commands support for use in headless environments.

### Sample script
```bash
#!/bin/bash
set -e

amplify delete --force
```
