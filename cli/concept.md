# Overview
The AWS Amplify CLI toolchain enables front-end developers to easily set up the backend resources in the cloud. <br/>
It is designed to work with the [Amplify](https://github.com/aws-amplify/amplify-js) JavaScript library as well as the AWS Mobile SDKs for iOS and Android. Resources in your AWS account that the Amplify CLI category commands create can be easily consumed by the corresponding Amplify library modules or native SDKs. <br/>
The Amplify CLI is written in Node.js. It has a pluggable architecture and can be easily extended with additional functionalities.
Click [here](https://github.com/aws-amplify/docs/blob/master/cli/new-plugin.md) for more details.
 
***

# Architecture
![](https://github.com/aws-amplify/docs/blob/master/CLI/images/AmplifyCliConcept.jpg)
## Cli core and plugins
The Amplify CLI uses [gluegun](https://github.com/infinitered/gluegun#readme). It is highly modularized.  <br/>
The CLI core provides the pluggable platform, and most of the CLI category functions are implemented as plugins. <br/> 
The CLI core searches for plugins in the global `node_modules` directory, and its own `node_modules` directory.  <br/>
Plugins are recognized by the `amplify-` prefix in the package names. <br/>
Plugins communicate with the CLI core, and with each other, through the project metadata. The CLI core provides the read and write access to the project metadata for the plugins. The project metadata is stored in file `amplify/backend/amplify-meta.json` in the user project, see [below](#meta) for more details of the meta data file. 

## Plugin types
There are four types of plugins
- category
- provider
- frontend
- general purpose
### category plugin
Recognized by the `amplify-category-` prefix in the package name, a category plugin wraps up the logic to create and manage one category of backend resources in the cloud. It defines the "shape" of the cloud resources based on user (the developer) input, constructs parameters to CRUD cloud resource, and exports relevant cloud resource information to the project metadata. <br/>
Categories are managed by AWS and are functional use case that a client engineer is building as part of their UX, rather than service implementations.
### provider plugin
Recognized by the `amplify-provider-` prefix in the package name, a provider plugin abstracts the actual cloud resource provider. It wraps up communication details such as access credentials, api invoke and wait logic, and response data parsing etc. and exposes simple interface methods for the category plugins to CRUD cloud resource. 
### frontend plugin
Recognized by the `amplify-frontend-` prefix in the package name, a frontend plugin handles a specific type of frontend projects, such as Javascript, Android or iOS projects. Among other things, it provides these functionalities:
- formats the cloud resource information and writes it to a file at the right location so it can be recognized and consumed by the frontend project. 
- builds and serves the frontend application locally with backend hot-wired to the cloud resources. 
- builds and publishes the application (frontend and backend) to its intended users.
### general purpose plugin
Recognized by the `amplify-` prefix, without a plugin type decoration, in the package name, a general purpose plugin does not manage any backend resources in the cloud, but provides certain CLI commands and/or certain functionalities for the CLI core, and other plugins.

## Official plugins
- amplify-category-analytics
- amplify-category-api
- amplify-category-auth
- amplify-category-function
- amplify-category-hosting
- amplify-category-notifications
- amplify-category-storage
- amplify-codegen
- amplify-frontend-javascript
- amplify-frontend-android
- amplify-frontend-ios
- amplify-provider-awscloudformation

## Third party plugin setup
It's easy to add a third party plugin to the Amplify CLI. 
1. The plugin author names the plugin package according to the naming convention outlined above, and publishes it to the npm registry.
2. The plugin user executes `npm install -g <plugin>` and installs the plugin to the global node_modules directory.

The plugin is then picked up by the CLI core and used the same as the official plugins. 
Click [here](https://github.com/aws-amplify/docs/blob/master/cli/new-plugin.md) for more details on how to auth new plugins. 

***
# Commands
### Official CLI commands
- `amplify categoires`
- `amplify configure`
- `amplify console`
- `amplify delete`
- `amplify help`
- `amplify init`
- `amplify publish`
- `amplify push`
- `amplify pull` (to be implemented)
- `amplify run`
- `amplify status`

### Most plugins also have these commands
- `amplify <plugin> configure`
- `amplify <category> add`
- `amplify <category> remove`
- `amplify <category> push`
- `amplify <category> pull` (to be implemented)

***
# Typical CLI workflow
The following command should be executed inside the user project's root directory: 
1. `amplify init`
2. `amplify <category> add/remove`
3. `amplify push`

## The init process
`$ amplify init` <br/>
The `init` command must be executed at the root directory of a project to initialize the project for the amplify-CLI to work with. 
The `init` command goes through these steps to setup things: 
- Analyzes the project and confirms with the user to pick the right frontend plugin to handle the project.
- Carries out the initialization logic of the selected frontend plugin.
- If there are multiple provider plugins, prompts the user to selected the provider plugins that will provide accesses to backend cloud resources. 
- Carries out, in sequence, the initialization logic of the selected provider plugin(s). 
- Insert amplify folder structure into the project's root directory, with the initial project configuration information written in it. 
- Generate the project metadata file, amplify-meta.json, with the outputs of the above-selected frontend plugin and provider plugin(s). The amplify-meta.json file is inside the amplify folder structure.
- Generate the .amplifyrc file, it is written to the root directory or the project, outside of the amplify folder structure. 

## Configuration
### amplify configure
This command will lead the user to setup a new aws iam user, then save the credentials locally in a named profile, which can then be used by a project for aws access. The user specifies if and what profile is used for a project in the init process, and can later change it using the `amplify configure project` command.
### amplify configure project
This command allows the user to change the project configuration set during the init process. 

# The Amplify CLI artifacts
## amplfy folder structure
The CLI places the following folder structure at the root directory of the project when `init` is completed successfully:
<br/>
amplify<br/>
&nbsp;&nbsp;.config<br/>
&nbsp;&nbsp;#current-cloud-backend<br/>
&nbsp;&nbsp;backend<br/>
### amplify/.config folder
It contains files that store the configuration settings.
### amplify/#current-cloud-backend folder
It contains the backend resources specifications in the cloud from the last synchroization, by the push or pull command.
Each plugin stores contents in its own subfolder inside this folder. 
### amplify/backend folder
It contains the latest local development of the backend resources specifications to be pushed to the cloud. 
Each plugin stores contents in its own subfolder inside this folder. 

## <a name="tith"></a>amplify-meta.json file
The CLI core and the plugins log metadata into this file, both the `backend` and `#current-cloud-backend` directories contain an amplify-meta.json file. It serves as the white board for the CLI core and the plugins to communicate with each other.  
## .amplifyrc file
The CLI places the `.amplifyrc` file at the root directory of the user project in the init process:
It is the amplify-CLI run control, this file is checked into code repo, it facilitates collaborations between team members and outside contributors of the user project.

# The AWS CloudFormation provider
Currently the only official provider plugin, amplify-provider-awscloudformation, uses the AWS CloudFormation to form and update the backend resources in the AWS for the amplify categories. <br/>
For more information of the AWS CloudFormation, check its user guide: 
[AWS CloudFormation User Guide](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html)
<br/>
## How it works
The amplify-provider-awscloudformation uses 
[nested stacks](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-nested-stacks.html) 
to get its job done

### `amplify init`
During the init process, the root stack is created with three resources: 
- an IAM role for un-authenticated users
- an IAM role for authenticated users
- a S3 bucket, the deployment bucket, to support this provider's workflow
<br/>
The provider then logs the information of the root stack and the resources into the project metadata file <br/>
amplify/backend/amplify-meta.json <br/>
The root stack's template can be found in this folder: <br/>
amplify/backend/awscloudformation

### `amplify <category> add`
Once the init is complete, run the command `amplify <category> add` to add resources of a category to the backend. <br/>
This will place the aws cloudformation template for the resources of this category in the category's subdirectory `amplify/backend/<category>`, and insert its reference into the above mentioned root stack as the nested child stack. 

### `amplify push` 
Once the resources of the categories are done been added or updated locally, run the command `amplify push` to update the backend resources in the cloud. <br/>
The CLI will first upload the latest versions of the categories' nested stack templates to the S3 deployment bucket, and then call the AWS CloudFormation API to create / update resources in the cloud.




