Once you're happy with your application, you can start syncing with the cloud by provisioning a backend from your project. This can be done using the `amplify-app` npx script by running `npm run amplify-push`, or with the Amplify CLI by running `amplify push` directly. Provisioning will also create a project in the [AWS Amplify Console](https://aws.amazon.com/amplify/console/) to store metadata (such as the GraphQL schema) which you can pull down to generate models on other platforms.

DataStore can connect to an existing AppSync backend that has been deployed from another JavaScript project or even it was originally deployed by iOS or Android. In these workflows it is best to work with the CLI directly by running an `amplify pull` command from your terminal and then generating models, either using `npm run amplify-modelgen` from the NPX script or with `amplify codegen models` using the Amplify CLI.

For more information on this workflow please see the [Multiple Frontends documentation](https://aws-amplify.github.io/docs/cli-toolchain/quickstart#multiple-frontends){:target="_blank"}.

If you do not already have a local AWS profile with credentials you can automatically setup with the Amplify CLI by running `amplify configure` 
{: .callout .callout--info}

## Use NPM
```
npm run amplify-push
```


## Use Amplify CLI
```
amplify push
```

## Connect your app

Once the push finishes an `aws-exports.js` file will be created in your project which you can import and configure your project:

```javascript
import awsconfig from "./aws-exports";
Amplify.configure(awsconfig);
```

Once configured, restart your app and it will connect with your backend using GraphQL queries, mutations, and subscriptions.