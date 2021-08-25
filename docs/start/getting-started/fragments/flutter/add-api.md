## Deploy your Amplify sandbox backend

Return to the sandbox link you kept handy from earlier. It should look something like the following.

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

4. The on screen text should walk you through the deployment progress and, when the deployment status reads **Deployment completed**, click **Open admin UI**.

    ![Open admin UI](~/images/lib/getting-started/flutter/connect-to-cloud-open-admin-ui.png)

## Add authentication

Since our **Todo** model specifies an `@auth` directive, we do need to first add authentication.

### Deploy authentication

From the Amplify Admin UI:
1. Select **Authentication** from the sidebar

    ![Authentication](~/images/lib/getting-started/flutter/add-api-add-authentication-sidebar.png)

2. Click **Save and deploy** with the default configuration

    ![Save and deploy](~/images/lib/getting-started/flutter/add-api-add-authentication-deploy.png)

2. Click **Confirm deployment** when prompted

### Update local project with deployed environment

1. After deployment of authentication, click on **Deployment successful - click for next steps** at the top of the Admin UI

    ![Deployment successful](~/images/lib/getting-started/flutter/add-api-add-authentication-deployment-successful.png)

2. Copy the command for pulling the updated environment and run it in your local project
3. Answer on screen prompts to update your local project with the deployed environment

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

## Add Api and Auth plugins

Now we just need to configure our app with some additional plugins. This will ensure that DataStore has access to the API access it requires for communicating with the cloud. Let's start by modifying `pubspec.yaml` in your project root directory and add the Amplify plugins to the project dependencies.

```diff
environment:
  sdk: ">=2.12.0 <3.0.0"

  dependencies:
    flutter:
      sdk: flutter

    amplify_flutter: ^0.2.0
    amplify_datastore: ^0.2.0
+   amplify_api: ^0.2.0
+   amplify_auth_cognito: ^0.2.0
```

Install the dependencies by running the following command. Depending on your development environment, you may perform this step via your IDE (or it may even be performed for you automatically).

```bash
flutter pub get
```

Update the `main.dart` file and import the new packages so that it's available to our app.

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

Since Amplify can only be configured once, you will need to do a full restart (stop and restart the app) now instead of just a Hot Restart. But, believe it or not, you’re done! Amplify DataStore makes syncing to the cloud that easy. Spin up a second simulator/emulator and you should see that adding/updating/removing items on one device triggers an update in the other. We can also verify this in the Admin UI.

## Verifying cloud sync

### Inspect data

From the Amplify Admin UI, select **Content** from the sidebar. If you have added todos from your app, you should see them show up as part of the results!

![Content](~/images/lib/getting-started/flutter/add-api-verify-sync-sidebar.png)

![Inspect items](~/images/lib/getting-started/flutter/add-api-verify-sync-inspect-items.png)

### Create data

Synchronization is bi-directional. Try creating a Todo entry from the Content screen in the Admin UI:
1. Click **Create todo**

    ![Content](~/images/lib/getting-started/flutter/add-api-verify-sync-create-todo.png)

2. Fill in the form
  - **name**: Sync app to cloud
  - **description**: This was created remotely!
  - **isComplete**: false (unchecked)
3. Click **Save Todo** on the form to save the new entry

    ![Content](~/images/lib/getting-started/flutter/add-api-verify-sync-save-todo.png)

You should see your app update with a newly created todo in real-time!
