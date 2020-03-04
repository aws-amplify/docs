Once you're happy with your application, you can start syncing with the cloud by provisioning a backend from your project. This can be done using Gradle or with the Amplify CLI. Provisioning will also create a project in the [AWS Amplify Console](https://aws.amazon.com/amplify/console/) to store metadata (such as the GraphQL schema) which you can pull down to generate models on other platforms.

DataStore can connect to an existing AppSync backend that has been deployed from another project. In these workflows, it is best to work with the CLI directly. Run the `amplify pull` command from your terminal, then generate models as discussed earlier in this guide.

> For more information on this workflow please see the [Multiple Frontends documentation](https://aws-amplify.github.io/docs/cli-toolchain/quickstart#multiple-frontends){:target="_blank"}.

## Use Gradle

If you have installed the Gradle tools for Amplify, select the Gradle dropdown in the toolbar and click **amplifyPush** then run the task.

If you do not already have a local AWS profile with credentials (automatically setup with the Amplify CLI) you will be prompted to do this on the first push.
{: .callout .callout--info}

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
```
{}
```