---
title: Syncing data to cloud
description: description
---

Once you're happy with your application, you can start syncing with the cloud by provisioning a backend from your project. DataStore can connect to an AppSync backend and automatically sync all locally saved data using GraphQL as a data protocol.

<amplify-callout>

If you do not already have a local AWS profile with credentials you can automatically setup with the Amplify CLI by running `amplify configure`. Make sure you follow the [Install Amplify CLI guide](~/cli/start/install.md) for detailed instructions. 

</amplify-callout>

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

```js
import awsconfig from "./aws-exports";
Amplify.configure(awsconfig);
```

Once configured, restart your app and it will connect with your backend using GraphQL queries, mutations, and subscriptions.

<inline-fragment platform="js" src="~/lib/datastore/fragments/js/sync.md"></inline-fragment>
<inline-fragment platform="ios" src="~/lib/datastore/fragments/ios/sync.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/datastore/fragments/android/sync.md"></inline-fragment>