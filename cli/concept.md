# Overview
The Amplify cli enables front-end developers to easily set up the backend resources in the cloud. <br/>
It is designed to work side by side with the Amplify library. Official resource categories provided by the cli can be easily consumed by the corresponding Amplify library modules. <br/>
The Amplify cli is written in Node.js. It has a pluggable architecture and can be easily extended with additional functionalities.
 
***

# Architecture
![](https://github.com/UnleashedMind/docs/blob/master/cli/images/AmplifyCliConcept.jpg)
## Cli core and plugins
The Amplify cli uses `gluegun`. It is highly modularized.  <br/>
The cli core provides the pluggable platform, most of the cli functionalities are delivered by plugins. <br/> 
The cli core searches for plugins in the global `node_modules` directory, and its own `node_modules` directory.  <br/>
Plugins are recognized by the `amplify-` prefix in the package names. <br/>
Plugins communicate with the cli core, and with each other, through the project metadata. The cli core provides the read and write access to the project metadata for the plugins. The project metadata is stored in file `amplify/backend/amplify-meta.json` in the user project.

## Plugin types
There are three types of plugins
- category
- provider
- frontend
### category plugin
Recognized by the `amplify-category-` prefix in the package name, the category plugin wraps up the logic to create and manage one category of backend resources in the cloud. It defines the "shape" of the cloud resources based on user input, constructs parameters to CRUD cloud resource, and exports relevant cloud resource information to the project metadata. 
### provider plugin
Recognized by the `amplify-provider-` prefix in the package name, the provider plugin abstracts the actual cloud resource provider. It wraps up communication details such as access credentials, api invoke and wait logic, and response data parsing etc. and exposes simple interface methods for the category plugins to CRUD cloud resource. 
### frontend plugin
Recognized by the `amplify-frontend-` prefix in the package name, the frontend plugin is used to handle a specific type of frontend projects, such as Javascript, Android or Xcode projects. Among other things, it provides these functionalities:
- formats the cloud resource information and writes it to a file at the right location so it can be recognized and consumed by the frontend project. 
- builds and serves the frontend application locally with backend hot-wired to the cloud resources. 
- builds and publishes the application (frontend and backend) to its intended users.

+See  [Plugin Architecture](https://github.com/aws/aws-amplify-staging/wiki/AWS-Mobile-CLI-V2-(Plugin-architecture))
+

## Official plugins
- amplify-category-analytics
- amplify-category-api
- amplify-category-auth
- amplify-category-hosting
- amplify-category-storage
- amplify-frontend-javascript
- amplify-frontend-android
- amplify-frontend-xcode
- amplify-provider-awscloudformation

## Third party plugin setup
It's easy to add a third party plugin to the Amplify cli. 
1. The plugin author names the plugin package according to the naming convention outlined above, and publishes it to the npm registry.
2. The plugin user executes `npm install -g <plugin>` and installs the plugin to the global node_modules directory.

The plugin is then picked up by the cli core and used the same as the official plugins. 

***

# Official cli commands
- `amplify init`
- `amplify push`
- `amplify pull`
- `amplify configure`
- `amplify serve`
- `amplify publish`
- `amplify <plugin> configure`
- `amplify <category> add`
- `amplify <category> remove`
- `amplify <category> push`
- `amplify <category> pull`

# Typical cli workflow
The following command should be executed inside the user project's root directory: 
1. `amplify init`
2. `amplify <category> add/remove`
3. `amplify push`

***
# The init process
`$ amplify init` <br/>
The `init` command must be executed at the root directory of a project to initialize the project for the amplify-cli to work with. 
The `init` command goes through these steps to setup things: 
- Analyzes the project and confirms with the user to pick the right frontend plugin to handle the project.
- Carries out the initialization logic of the selected frontend plugin.
- Prompts the user to selected the provider plugins that will provide accesses to backend cloud resources.
- Carries out, in sequence, the initialization logic of the selected provider plugins. 
- Insert amplify folder structure into the project's root directory, with the initial project config information written in it. 
- Generate the project metadata file, amplify-meta.json, with the outputs of the above-selected frontend plugin and provider plugins. The amplify-meta.json file is inside the amplify folder structure.
- Generate the .amplifyrc file, it is written to the root directory or the project, outside of the amplify folder structure. 

# The Amplify cli artifacts
## amplfy folder structure
amplify<br/>
&nbsp;&nbsp;.config<br/>
&nbsp;&nbsp;#current-cloud-backend<br/>
&nbsp;&nbsp;backend<br/>
## amplify-meta.json file
Serves as the white board that the amplify-cli core and plugins write information on, for themselves and for communications with each other.  
## .amplifyrc file
Serves as the amplify-cli run control, this file is checked into code repo, it facilitates collaborations between team members and outside contributors of the user project.

***
# Configuration
## amplify configure
After the initialization, the `configure` command can be executed to switch frontend handler, and add/remove provider plugins.
## amplify awscloudformation configure
The `awscloudformation` is the official provider plugin for the amplify-cli. Its `configure` subcommand can be executed to set aws access credentials. <br/>
aws access credentials are configured at two levels
- general level<br/>
used for all projects without specific configuration set at the project level
- project level<br/>
used only for a specific project.

For general configurations, the cli directly uses what the aws sdk provides. The aws sdk uses EC2 role, environmental variables and the shared config files in the ~/.aws/ folder, to get credentials. So no additional secrets are stored by the amplify-cli. See the following documentation for more details:<br/>
https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
<br/><br/>
For project specific configurations, the cli stores the keys in a file (per project) in the ~/.amplify/ folder. Since it's not in the project's codebase, the file won't be accidentally checked into code repos.<br/><br/>
If the user does not provide project specific configurations, the cli will use the general configurations for aws access.<br/>
If the user configured project specific configurations, they override the general configurations when cli commands are executed inside the project.


