Now that your have DataStore persisting data locally, in the next step you'll connect it to the cloud. With a couple of commands, you'll create an AWS AppSync API and configure DataStore to synchronize its data to it.

1. Edit your `onCreate` method to remove all of the code you added. Your `onCreate()` should not include any Amplify code.

1. Add the following at the bottom of the `onCreate` method: 

  <amplify-block-switcher>
  <amplify-block name="Java">

    ```java
    try {
        Amplify.addPlugin(new AWSDataStorePlugin());
        Amplify.addPlugin(new AWSApiPlugin());
        Amplify.configure(getApplicationContext());

        Log.i("Tutorial", "Initialized Amplify");
    } catch (AmplifyException e) {
        Log.e("Tutorial", "Could not initialize Amplify", e);
    }

    Todo item = Todo.builder()
            .name("Tidy up the office")
            .description("Organize books, vacuum, take out the trash")
            .build();

    Amplify.DataStore.save(
            item,
            success -> Log.i("Tutorial", "Saved item: " + success.item.getName()),
            error -> Log.e("Tutorial", "Could not save item to DataStore", error)
    );
    ```

  </amplify-block>

  <amplify-block name="Kotlin">

    ```kotlin
    try {
      Amplify.addPlugin(new AWSDataStorePlugin())
      Amplify.addPlugin(new AWSApiPlugin())
      Amplify.configure(applicationContext)

      Log.i("Tutorial", "Initialized Amplify")
    } catch (e: AmplifyException) {
        Log.e("Tutorial", "Could not initialize Amplify", e)
    }

    val item: Todo = Todo.builder()
            .name("Tidy up the office")
            .description("Organize books, vacuum, take out the trash")
            .build()

    Amplify.DataStore.save(
            item,
            { success -> Log.i("Tutorial", "Saved item: " + success.item.name) },
            { error -> Log.e("Tutorial", "Could not save item to DataStore", error) }
    )
      ```

  </amplify-block>
  </amplify-block-switcher>

1. Open up a terminal window. You can use an external terminal or the integrated terminal in Android Studio.

1. Run `amplify configure`. This step will configure a new AWS user in your account for Amplify to manage resources on your behalf.

    ```bash
    amplify configure
    ```

   This command will open up a web browser to the AWS Management Console and guide you through creating a new IAM user. For step by step directions to set this up, refer to the [CLI installation guide](~/cli/start/install.md).

1. In your terminal, ensure you are in the root of your project directory. Run `amplify init`. Enter a name for your environment such as *tutorial*. Select your preferred editor, and your AWS profile:

    ```console
    ? Enter a name for the environment
        tutorial
    ? Choose your default editor:
        IntelliJ IDEA
    ? Do you want to use an AWS profile?
        Yes
    ? Please choose the profile you want to use
        amplify

    Adding backend environment dev to AWS Amplify Console app: abcd1234efg567
    ⠋ Initializing project in the cloud...
    ```

    This initializes your Amplify project on the backend

1. In the terminal, run `amplify push`. You can select the defaults to the prompts:

    ```console
    ✔ Successfully pulled backend environment dev from the cloud.

    Current Environment: dev

    | Category | Resource name     | Operation | Provider plugin   |
    | -------- | ----------------- | --------- | ----------------- |
    | Api      | amplifyDatasource | Create    | awscloudformation |
    
    ? Are you sure you want to continue?
        Yes
    ? Do you want to generate code for your newly created GraphQL API
        Yes
    ? Enter the file name pattern of graphql queries, mutations and subscriptions
        app/src/main/graphql/**/*.graphql
    ? Do you want to generate/update all possible GraphQL operations - queries, mutations and subscriptions
        Yes
    ? Enter maximum statement depth [increase from default if your schema is deeply nested]
        2
        
    ⠋ Updating resources in the cloud. This may take a few minutes...
    ```

1. Run your application. This will create a new Todo and synchronize it to your API.

1. In the terminal, run `amplify api console`. When prompted, select **GraphQL**. This will open the AWS AppSync console.

    ```bash
    amplify api console
    ```

    ```console
    ? Please select from one of the below mentioned services: (Use arrow keys)
       GraphQL 
    ```

1. Copy and paste the following query:

    ```graphql
    query GetTodos {
      listTodos {
        items {
          id
          name
          description
        }
      }
    }
    ```

1. Press the **play button** to run the query. This will return all of the synchronized Todos:

    ![](~/images/lib/getting-started/android/set-up-appsync-query.png)