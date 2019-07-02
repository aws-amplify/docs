---
title: Quickstart
---
{% if jekyll.environment == 'production' %}
  {% assign base_dir = site.amplify.docs_baseurl %}
{% endif %}
{% assign media_base = base_dir | append: page.dir | append: "images" %}


# Quickstart

## Installation

The Amplify Command Line Interface (CLI) is a unified toolchain to create, integrate, and manage the AWS cloud services for your app.
* [Install Node.js®](https://nodejs.org/en/download/") and [NPM](https://www.npmjs.com/get-npm) if they are not already on your machine.
* Verify that you are running at least Node.js version 8.x or greater and npm version 5.x or greater by running `node -v` and npm -v in a terminal/console window
* Install and configure the Amplify CLI.
    ```bash
    $ npm install -g @aws-amplify/cli</code>
    $ amplify configure
    ```
    **[Installation setup walkthrough video](https://s3.us-east-2.amazonaws.com/amplify-get-started-video/amplifyclisetup.mp4)**

## Concepts

The AWS Amplify CLI toolchain is designed to work with the [Amplify](https://github.com/aws-amplify/amplify-js) JavaScript library as well as the AWS Mobile SDKs for [iOS](https://github.com/aws/aws-sdk-ios/) and [Android](https://github.com/aws/aws-sdk-android). Resources in your AWS account that the Amplify CLI category commands create can be easily consumed by the corresponding Amplify library modules or native SDKs. <br/>
The Amplify CLI is written in Node.js. It has a pluggable architecture and can be easily extended with additional functionalities.
Click [here](plugins) for more details.


### Typical CLI workflow
The following command should be executed inside the user project's root directory: 
1. `amplify init`
2. `amplify <category> add/remove`
3. `amplify push`

#### The init process
`$ amplify init` <br/>
The `init` command must be executed at the root directory of a project to initialize the project for the Amplify CLI to work with. 
The `init` command goes through these steps to setup things: 
- Analyzes the project and confirms with the user to pick the right frontend plugin to handle the project.
- Carries out the initialization logic of the selected frontend plugin.
- If there are multiple provider plugins, prompts the user to selected the provider plugins that will provide accesses to backend cloud resources. 
- Carries out, in sequence, the initialization logic of the selected provider plugin(s). 
- Insert amplify folder structure into the project's root directory, with the initial project configuration information written in it. 
- Generate the project metadata files, with the outputs of the above-selected frontend plugin and provider plugin(s)


### Common CLI commands
- `amplify <category> <subcommand>`
- `amplify env <subcommand>`
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

**Most categories have the following command structure**
- `amplify <category> add`
- `amplify <category> remove`
- `amplify <category> push`

### amplify init
During the init process, the root stack is created with three resources: 
- an IAM role for unauthenticated users
- an IAM role for authenticated users
- an S3 bucket, the deployment bucket, to support this provider's workflow
<br/>
The provider then logs the information of the root stack and the resources into the project metadata file <br/>
amplify/backend/amplify-meta.json <br/>
The root stack's template can be found in this folder: <br/>
amplify/backend/awscloudformation

### amplify <category> add
Once the init is complete, run the command `amplify <category> add` to add resources of a category to the backend. <br/>
This will place the aws cloudformation template for the resources of this category in the category's subdirectory `amplify/backend/<category>`, and insert its reference into the above-mentioned root stack as the nested child stack. 

### amplify push
Once the resources of the categories are done been added or updated locally, run the command `amplify push` to update the backend resources in the cloud. <br/>
The CLI will first upload the latest versions of the categories' nested stack templates to the S3 deployment bucket, and then call the AWS CloudFormation API to create / update resources in the cloud. Based upon the resources added/updated, the `aws-exports.js` file (for JS projects) and the `awsconfiguration.json` file (for native projects) gets created/updated.


### Amplify CLI Artifacts

#### Amplify folder structure
The CLI places the following folder structure at the root directory of the project when `init` is completed successfully:
<br/>
amplify<br/>
&nbsp;&nbsp;.config<br/>
&nbsp;&nbsp;#current-cloud-backend<br/>
&nbsp;&nbsp;backend<br/>
#### amplify/.config folder
It contains files that store cloud configuration and user settings/preferences
#### amplify/#current-cloud-backend folder
It contains the backend resources specifications in the cloud from the last synchronization, by the amplify push or amplify env pull command.
Each plugin stores contents in its own subfolder inside this folder. 
#### amplify/backend folder
It contains the latest local development of the backend resources specifications to be pushed to the cloud. 
Each plugin stores contents in its own subfolder inside this folder. 

#### Amplify Files

##### amplify-meta.json file
Both the `amplify/backend` and `amplify/#current-cloud-backend` directories contain an amplify-meta.json file.<br/>
The amplify-meta.json in the `backend` directory serves as the whiteboard for the CLI core and the plugins to log information for themselves, and to communicate with each other. <br/><br/>
The CLI core provides read and write access to the file for the plugins.<br/>
The CLI core collects the selected providers' outputs after init and logs them under the "providers" object, e.g. the awscloudformation provider outputs the information of the root stack, the deployment S3 bucket, and the authorized/unauthorized IAM roles, and they are logged under the providers.awscloudformation object<br/><br/>
Each category plugin logs information under its own name. <br/>
Because one category might create multiple services within one project (e.g. the interactions category can create multiple bots), the category metadata generally follows a two-level structure like the following: <br/>
```
{
    <category>: {
        <service1>: {
            //service1 metadata
        },
        <service2>: {
            //service2 metadata
        }
    }
}
```
The metadata for each service is first logged into the meta file after the `amplify <category> add` command is executed, containing some general information that indicates one service of the category has been added locally. <br/>
Then, on the successful execution of the `amplify push` command, the `output` object will be added/updated in the service's metadata with information that describes the actual cloud resources that have been created or updated.


##### aws-exports.js file
This file is generated only for JavaScript projects.<br/>
It contains the consolidated outputs from all the categories and is placed under the `src` directory that the user (the developer) specified during the `init` process. It is updated after each successful execution of the `amplify push` command,  that has created or updated the cloud resources.<br/> 
This file is consumed by the [Amplify](https://github.com/aws-amplify/amplify-js) JavaScript library for configuration.

##### awsconfiguration.json file
This file is generated for Android and iOS projects.<br/>
It contains the consolidated outputs from all the categories. It is updated after each successful execution of the `amplify push` command, that has created or updated the cloud resources.<br/> <br/> 
This file is consumed by the [iOS](https://github.com/aws/aws-sdk-ios/) and [Android](https://github.com/aws/aws-sdk-android) native SDKs for configuration.

## Category usage

### Auth Examples

#### Configuring auth without social providers

```terminal
$ amplify add auth     ##"amplify update auth" if already configured
```
Select Default configuration:

```terminal
Do you want to use the default authentication and security configuration? 
❯ Default configuration 
  Default configuration with Social Provider (Federation) 
  Manual configuration 
  I want to learn more.
```

#### Configuring auth with social providers

```terminal
$ amplify add auth     ##"amplify update auth" if already configured
```
Select Default configuration with Social Provider (Federation):

```terminal
Do you want to use the default authentication and security configuration? 
  Default configuration 
❯ Default configuration with Social Provider (Federation) 
  Manual configuration 
  I want to learn more.
```


### API Examples



### Functions Example


### Storage Example


## Multiple Frontends

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




## Architecure
![Image]({{media_base}}/AmplifyCliConcept.jpg)


The Amplify CLI uses <a href="https://github.com/infinitered/gluegun##readme" target="_blank">gluegun</a>. It is highly modularized.  <br/>
The CLI core provides the pluggable platform, and most of the CLI category functions are implemented as plugins. <br/> 
The CLI core searches for plugins in the global `node_modules` directory, and its own `node_modules` directory.  <br/>
Plugins are recognized by the `amplify-` prefix in the package names. <br/>
Plugins communicate with the CLI core, and with each other, through the project metadata. The CLI core provides the read and write access to the project metadata for the plugins. The project metadata is stored in file `amplify/backend/amplify-meta.json` in the user project, see [below](##meta) for more details of the meta data file. 

#### Plugin types
There are four types of plugins
- category
- provider
- frontend
- general purpose

#### Category plugin
Recognized by the `amplify-category-` prefix in the package name, a category plugin wraps up the logic to create and manage one category of backend resources in the cloud. It defines the "shape" of the cloud resources based on user (the developer) input, constructs parameters to CRUD cloud resource, and exports relevant cloud resource information to the project metadata. <br/>
Categories are managed by AWS and are a functional use case that a client engineer is building as part of their UX, rather than service implementations.

#### Provider plugin
Recognized by the `amplify-provider-` prefix in the package name, a provider plugin abstracts the actual cloud resource provider. It wraps up communication details such as access credentials, api invoke and wait logic, and response data parsing etc. and exposes simple interface methods for the category plugins to CRUD cloud resource. 

#### Frontend plugin
Recognized by the `amplify-frontend-` prefix in the package name, a frontend plugin handles a specific type of frontend projects, such as Javascript, Android or iOS projects. Among other things, it provides these functionalities:
- formats the cloud resource information and writes it to a file at the right location so it can be recognized and consumed by the frontend project. 
- builds and serves the frontend application locally with backend hot-wired to the cloud resources. 
- builds and publishes the application (frontend and backend) to its intended users.

#### General purpose plugin
Recognized by the `amplify-` prefix, without a plugin type decoration, in the package name, a general purpose plugin does not manage any backend resources in the cloud, but provides certain CLI commands and/or certain functionalities for the CLI core, and other plugins.

#### Official plugins
- amplify-category-analytics
- amplify-category-api
- amplify-category-auth
- amplify-category-function
- amplify-category-hosting
- amplify-category-notifications
- amplify-category-storage
- amplify-category-interactions
- amplify-codegen
- amplify-frontend-javascript
- amplify-frontend-android
- amplify-frontend-ios
- amplify-provider-awscloudformation

#### Third party plugin setup
It's easy to add a third party plugin to the Amplify CLI. 
1. The plugin author names the plugin package according to the naming convention outlined above and publishes it to the npm registry.
2. The plugin user executes `npm install -g <plugin>` and installs the plugin to the global node_modules directory.

The plugin is then picked up by the CLI core and used the same as the official plugins. 
Click [here](plugins) for more details on how to author new plugins.

### AWS CloudFormation
Currently, the only official provider plugin, amplify-provider-awscloudformation, uses the AWS CloudFormation to form and update the backend resources in the AWS for the amplify categories. <br/>
For more information about  AWS CloudFormation, check its user guide: 
[AWS CloudFormation User Guide](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html)
<br/>
#### How it works
The amplify-provider-awscloudformation uses 
[nested stacks](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-nested-stacks.html) 
to get its job done


