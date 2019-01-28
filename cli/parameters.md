---
---

# Amplify CLI command line parameters
Several commands in the Amplify CLI take command line parameters. <br/>
The Amplify CLI command line parameters are not simple strings, but complex JSON objects containing information that the CLI would otherwise gather through prompts. The CLI will not prompt for input if the information it seeks is provided by a command line parameter. <br/>
The command line parameters are used mostly for scripting, so that the command execution flow is not interrupted by prompts. You can also use them in regular executions, although the string representation of JSON objects can get a little hard to manage in a terminal console.

## The `--yes` flag
The `--yes` flag, or its alias `-y`, suppresses command line prompts if defaults are available, and uses the defaults in command execution.<br/>
The following commands take the `--yes` flag: 
- `amplify init`
- `amplify configure project`
- `amplify push`
- `amplify publish`

## The `amplify init` parameters
The `ampify init` command takes these parameters: 
- `--amplify`
- `--frontend`
- `--providers`
- `--yes`

### `--amplify`
Contains basic information of the project, it has these keys: 
- `projectName`: the name of the project under development.
- `envName`: the name of the environment in the Amplify Console pipe line.
- `defaultEditor`: the editor that the CLI opens when it needs to get certain files edited by the user. 

### `--frontend`
Contains information for the CLI's frontend plugin, it has these keys:
- `frontend`: the name of the chosen frontend plugin (without the `amplify-frontend-` prefix).
- `framework`: the frontend framework used in the project, such as `react`. Only the `javascript` frontend handler takes it.
- `config`: the configuration settings for the frontend plugin. 

There are currently three official frontend plugins, and the following are the specifications of their respective `config` object: 
#### `config` for `javascript`
- `SourceDir`: <br/>
The project's source directory. The CLI will place and update the `aws-exports.js` file in it, the `aws-exports.js` file is used to configure the `Amplify JS` library. 
- `DistributionDir`: <br/>
The project's distribution directory, where the build artifacts are stored. The CLI will upload the contents inside this directory to the S3 hosting buckets in the execution of the `amplify publish` command. 
- `BuildCommand`: <br/> 
The build command for the project. The CLI invokes the build command before uploading the contents in the distribution directory in the execution of the `amplify publish` command. 
- `StartCommand`: <br/>
The start command for the project, used for local testing. The CLI invokes the start command after it has pushed the latest development of the backend to the cloud in the execution of the `amplify run` command.

#### `config` for `android`
- `ResDir`: The Android project's resource directory, such as `app/src/main/res`.

#### `config` for `ios`
The `ios` frontend handler does NOT take the `config` object.

### `--providers`
Contains configuration settings for provider plugins. <br/>
The key is the name of the provider plugin (without the `amplify-provider-` prefix), and the value is its configuration.<br/>
Provider plugins contained in this object will be initialized, and able to provide functionalities for creation and maintenance of the cloud resources. <br/>
Currently there is only one official provider plugin: `amplify-provider-awscloudformation`, its configuration is for the CLI to resolve aws credentials and region, the following are the specifications: 

- `configLevel`: <br/> 
The configuration level is either `project` or `general`.<br/>
Unless explicitly set to `general`, the `project` level is chosen. <br/>
`general` level means the CLI will not manage configuration at the project level, it instead relies on the aws sdk to resolve aws credentials and region. For how it works, check the aws sdk's documents on [credentials](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html) and [region](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-region.html).<br/>
`project` level means the configuration is managed at the project level by the CLI, each project get its own independent configuration. The following attributes are used only when the configuration is at project level<br/>
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

## The `amplify configure project` parameters
The `ampify configure project` command allows the user to change the configuration settings that were first set by `amplify init`, and it takes the same parameters as the `amplify inti` command: 
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

## The `amplify push/publish` parameters
The `ampify push` command takes the following parameters, because `amplify publish` internally executes `amplify push` first, it also takes the same parameters for the `push` part. 
- `--codegen`
- `--yes`

### `--codegen`
Contains configuration for AppSync [codegen](https://aws-amplify.github.io/docs/cli/codegen?sdk=js), the following are the specifications:
- `generateCode`: <br/>
A boolean indicating if to generate code for your GraphQL API.<br/>
- `codeLanguage`: <br/>
The targeted language of the generated code, such as `javascript`.<br/>
- `fileNamePattern`:  <br/>
The file name pattern of graphql queries, mutations and subscriptions.<br/>
- `generatedFileName`:  <br/>
The file name for the generated code.<br/>
- `generateDocs`:  <br/>
A boolean indicating if to generate GraphQL statements (queries, mutations and subscription) based on GraphQL schema types. The generated version will overwrite the current graphql queries, mutations and subscriptions.<br/>

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
