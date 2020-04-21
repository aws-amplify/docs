---
title: Folder structure
description: Learn more about Amplify's generated folder structure.
--- 

The CLI places the following folder structure at the root directory of the project when `init` is completed successfully:

```
amplify
  .config
  #current-cloud-backend
  backend
```

#### amplify/.config folder
Contains files that store cloud configuration and user settings/preferences
#### amplify/#current-cloud-backend folder
Contains backend resources specifications in the cloud from the last synchronization, by the amplify push or amplify env pull command.
Each plugin stores contents in its own subfolder inside this folder.
#### amplify/backend folder
It contains the latest local development of the backend resources specifications to be pushed to the cloud.
Each plugin stores contents in its own subfolder inside this folder.

## Amplify Files

### amplify-meta.json file
Both the `amplify/backend` and `amplify/#current-cloud-backend` directories contain an amplify-meta.json file. The amplify-meta.json in the `backend` directory serves as the whiteboard for the CLI core and the plugins to log information for themselves, and to communicate with each other.

The CLI core provides read and write access to the file for the plugins. Core collects the selected providers' outputs after init and logs them under the "providers" object, e.g. the awscloudformation provider outputs the information of the root stack, the deployment S3 bucket, and the authorized/unauthorized IAM roles, and they are logged under the providers.awscloudformation object. Each category plugin logs information under its own name.

Because one category might create multiple services within one project (e.g. the interactions category can create multiple bots), the category metadata generally follows a two-level structure like the following:

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
The metadata for each service is first logged into the meta file after the `amplify <category> add` command is executed, containing some general information that indicates one service of the category has been added locally.
Then, on the successful execution of the `amplify push` command, the `output` object will be added/updated in the service's metadata with information that describes the actual cloud resources that have been created or updated.


### aws-exports.js file
This file is generated only for JavaScript projects.
It contains the consolidated outputs from all the categories and is placed under the `src` directory that the user (the developer) specified during the `init` process. It is updated after each successful execution of the `amplify push` command,  that has created or updated the cloud resources.

This file is consumed by the [Amplify](https://github.com/aws-amplify/amplify-js) JavaScript library for configuration. It contains information which is non-sensitive and only required for external, unauthenticated actions from clients (such as user registration or sign-in flows in the case of Auth) or for constructing appropriate endpoint URLs after authorization has taken place. Please see the following more detailed explanations:

- [Cognito security best practices for web app](https://forums.aws.amazon.com/message.jspa?messageID=757990#757990)
- [Security / Best Practice for poolData (UserPoolId, ClientId) in a browser JS app](https://github.com/amazon-archives/amazon-cognito-identity-js/issues/312)
- [Are the Cognito User pool id and Client Id sensitive?](https://stackoverflow.com/a/47865747/194974)

### amplifyconfiguration.json file
This file is generated for Android and iOS projects.
It contains the consolidated outputs from all the categories. It is updated after each successful execution of the `amplify push` command, that has created or updated the cloud resources.

This file is consumed by the [iOS](https://github.com/aws/aws-sdk-ios/) and [Android](https://github.com/aws/aws-sdk-android) native SDKs for configuration. It contains information which is non-sensitive and only required for external, unauthenticated actions from clients (such as user registration or sign-in flows in the case of Auth) or for constructing appropriate endpoint URLs after authorization has taken place. Please see the following more detailed explanations:

- [Cognito security best practices for web app](https://forums.aws.amazon.com/message.jspa?messageID=757990#757990)
- [Security / Best Practice for poolData (UserPoolId, ClientId) in a browser JS app](https://github.com/amazon-archives/amazon-cognito-identity-js/issues/312)
- [Are the Cognito User pool id and Client Id sensitive?](https://stackoverflow.com/a/47865747/194974)
