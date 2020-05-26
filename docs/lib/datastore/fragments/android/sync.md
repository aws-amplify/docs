## Use Gradle

If you have installed the Gradle tools for Amplify, select the Gradle dropdown in the toolbar and click **amplifyPush** then run the task.

<amplify-callout>

If you do not already have a local AWS profile with credentials (automatically setup with the Amplify CLI) you will be prompted to do this on the first push.

</amplify-callout>

## Use Amplify CLI

```
amplify push
```

## Cloud sync config requirements

The Amplify CLI should have generated a working `amplifyconfiguration.json` for you. Cloud sync will only be enabled if this file contains *exactly one* GraphQL endpoint, as shown below:

```json
{
  "userAgent": "aws-amplify-cli/2.0",
  "version": "1.0",
  "api": {
    "plugins": {
      "awsAPIPlugin": {
        "myApi": {
          "endpointType": "GraphQL",
          "endpoint": "{my-graphql-endpoint}",
          "region": "{region}",
          "authorizationType": "{my-authorization-type}"
        }
      }
    }
  }
}
```
