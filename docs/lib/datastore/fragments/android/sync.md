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

In order to enable cloud sync, the `amplifyconfiguration.json` must:

1. Contain a configuration for the API category with EXACTLY ONE GraphQL endpoint, and
2. Contain a configuration for the Data Store category which sets `syncMode` to `api`

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
  },
  "dataStore": {
    "plugins": {
      "awsDataStorePlugin": {
        "syncMode": "api"
      }
    }
  }
}
```

If only using the DataStore for local data, without any cloud synchronization, your configuration file may be empty:

```json
{}
```
