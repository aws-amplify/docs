## Sync with the cloud

Once you're happy with your application, you can start syncing with the cloud by provisioning a backend from your project. This can be done using the `amplify-app` npx script or with the Amplify CLI. Provisioning will also create a project in the [AWS Amplify Console](https://aws.amazon.com/amplify/console/) to store metadata (such as the GraphQL schema) which you can pull down to generate models on other platforms.

DataStore can connect to an existing AppSync backend that has been deployed from another JavaScript project or even it was originally deployed by iOS or Android. In these workflows it is best to work with the CLI directly by running an `amplify pull` command from your terminal and then generating models, either by building your project with the `amplify-tools` Xcode plugin or with `amplify codegen models` using the Amplify CLI.

For more information on this workflow please see the [Multiple Frontends documentation](https://aws-amplify.github.io/docs/cli-toolchain/quickstart#multiple-frontends).

## Use Xcode

Open the `amplifyxc.config` in your project and set `push` to `true`. Then build your app with **Product > Build** (*CMD+B*), and a push will take place.

If you do not already have a local AWS profile with credentials (automatically setup with the Amplify CLI) you will be prompted to do this on the first push.

## Use Amplify CLI
```
amplify push
```

## Connect your app

Once the push finishes an `amplifyconfiguration.json` file will be created in your project which will be used to configure the DataStore with the cloud. Restart your app and it will connect with your backend using GraphQL queries, mutations, and subscriptions.
