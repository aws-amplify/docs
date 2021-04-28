## Deploy your Amplify sandbox backend

<amplify-callout>

If you chose to generate your models earlier via the CLI, you can skip this step and proceed to [Add authentication](~/start/getting-started/add-api.md#add-authentication).

</amplify-callout>

If you previously generated your models through the admin UI, go ahead and open the link you kept handy in that step again. It should look something like the following. (This should be the same sandbox id you pulled earlier!)

```
https://sandbox.amplifyapp.com/deploy/<UUID>
```

### Log in or create a new AWS account

If you don’t have an AWS account, you will need to create one first:
1. Select **Create an AWS account**
2. Once you have an account, select **Login to deploy to AWS**
3. When logged in, you will be taken to the Amplify Console

### Create app backend
On the creation form:
<!-- // spell-checker: disable-next-line -->
1. Give your app a name. We went with **amplifiedtodo**
2. Select your preferred deployment region
3. Click **Confirm deployment**

    ![Create app backend](~/images/lib/getting-started/flutter/connect-to-cloud-create-app-backend.png)

4. The on screen text should walk you through the deployment progress and, when the deployment status reads reaches **Deployment completed**, click **Open admin UI**.

    ![Open admin UI](~/images/lib/getting-started/flutter/connect-to-cloud-open-admin-ui.png)

### Update local project with deployed environment

From your newly minted admin UI:
1. Click **Local setup instructions** at the top of the admin UI
2. Copy the command for pulling the updated environment and run it in your terminal.
3. Your web browser should prompt you with the question **Are you sure you want to login to the Amplify CLI?**, and you can select **Yes** to move on.

```
amplify pull --appId <appId> —envName staging

? Choose your default editor:
    `<your editor of choice>`
? Choose the type of app that you're building
    `flutter`
? Where do you want to store your configuration file?
    `./lib/`
? Do you plan on modifying this backend?
    `Yes`
```

## Add authentication

Since our **Todo** model specifies an @auth directive, we do need to first add authentication.

<amplify-block-switcher>

<amplify-block name="Admin UI">

<inline-fragment src="~/start/getting-started/fragments/flutter/blocks/add-api-add-authentication-admin-ui.md"></inline-fragment>

</amplify-block>

<amplify-block name="CLI">

<inline-fragment src="~/start/getting-started/fragments/flutter/blocks/add-api-add-authentication-cli.md"></inline-fragment>

</amplify-block>

</amplify-block-switcher>

## Add Api and Auth plugins

Now we just need to configure our app with the plugins. Start by modifying `pubspec.yaml` in your project root directory and add the Amplify plugins to the project dependencies

```diff
  dependencies:
    flutter:
      sdk: flutter

    amplify_flutter: <1.0.0
    amplify_datastore: <1.0.0
+   amplify_api: <1.0.0
+   amplify_auth_cognito: <1.0.0
```

Install the dependencies by running the following command. Depending on your development environment, you may perform this step via your IDE (or it may even be performed for you automatically).

```bash
flutter pub get
```

Update the `main.dart` file and import the new packages.

```diff
  import 'package:amplify_flutter/amplify.dart';
  import 'package:amplify_datastore/amplify_datastore.dart';
+ import 'package:amplify_api/amplify_api.dart';
+ import 'package:amplify_auth_cognito/amplify_auth_cognito.dart';
```

Declare the additional plugins at the top of the `_TodosPageState` class.

```diff
  // amplify plugins
  final AmplifyDataStore _dataStorePlugin =
      AmplifyDataStore(modelProvider: ModelProvider.instance);
+ final AmplifyAPI _apiPlugin = AmplifyAPI();
+ final AmplifyAuthCognito _authPlugin = AmplifyAuthCognito();
```

Add the additional plugins to Amplify in the `_fetchTodos()` function of the `_TodosPageState` class.

```diff
  // add Amplify plugins
- await Amplify.addPlugins([_dataStorePlugin]);
+ await Amplify.addPlugins([_dataStorePlugin, _apiPlugin, _authPlugin]);
```

Since Amplify can only be configured once, you will need to do a full restart (kill the app and) now instead of just a Hot Restart. But, believe it or not, you’re done! Amplify DataStore makes syncing to the cloud that easy. Spin up a second simulator/emulator and you should that adding/updating/removing items on one device triggers an update in the other. We can also verify this on the AppSync Console or admin UI.

## Verifying cloud sync

<amplify-block-switcher>

<amplify-block name="Admin UI">

<inline-fragment src="~/start/getting-started/fragments/flutter/blocks/add-api-verify-cloud-sync-admin-ui.md"></inline-fragment>

</amplify-block>

<amplify-block name="AWS Console">

<inline-fragment src="~/start/getting-started/fragments/flutter/blocks/add-api-verify-cloud-sync-aws-console.md"></inline-fragment>

</amplify-block>

</amplify-block-switcher>

You should see your app update with a newly created todo in real-time!
