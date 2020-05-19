Now that your have DataStore persisting data locally, in the next step you'll connect it to the cloud. With a couple of commands, you'll create an AWS AppSync API and configure DataStore to synchronize its data to it.

1. Configure Amplify to manage cloud resources on your behalf. Run `amplify configure`. This step will configure a new AWS user in your account for Amplify.

    ```bash
    amplify configure
    ```

   This command will open up a web browser to the AWS Management Console and guide you through creating a new IAM user. For step-by-step directions to set this up, refer to the [CLI installation guide](~/cli/start/install.md).

1. Next, push your new API to AWS. In Android Studio, click the Gradle Task dropdown in the toolbar and select **amplifyPush**.

  ![](~/images/lib/getting-started/android/set-up-android-studio-run-task-dropdown-amplifyPush.png)

1. Run the task. You can do this by pressing the **play button** or pressing **Control-R**.

1. Modify your initialization code to initialize API in order to connect to the backend. Open `MainActivity` and remove all of the previous code you entered. Now, add the following code to the bottom of the `onCreate()` method:

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
      .name("Build Android application")
      .description("Build an Android Application using Amplify")
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
      Amplify.addPlugin(AWSDataStorePlugin())
      Amplify.addPlugin(AWSApiPlugin())
      Amplify.configure(applicationContext)

      Log.i("Tutorial", "Initialized Amplify")
  } catch (e: AmplifyException) {
      Log.e("Tutorial", "Could not initialize Amplify", e)
  }

  val item: Todo = Todo.builder()
      .name("Build Android application")
      .description("Build an Android Application using Amplify")
      .build()

  Amplify.DataStore.save(
          item,
          { success -> Log.i("Tutorial", "Saved item: " + success.item.name) },
          { error -> Log.e("Tutorial", "Could not save item to DataStore", error) }
  )
  ```

  </amplify-block>
  </amplify-block-switcher>

1. Run the application. This will create a new Todo item and synchronize it to the backend.

1. Open up a terminal window. You can use an external terminal or the integrated terminal in Android Studio. In the terminal, run `amplify api console`. When prompted, select **GraphQL**. This will open the AWS AppSync console.

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
                _deleted
            }
        }
    }
    ```

1. Press the **play button** to run the query. This will return all of the synchronized Todos:

    ![](~/images/lib/getting-started/android/set-up-appsync-query.png)

1. Synchronization will occur bi-directionally. Create an item in AWS AppSync by copying and pasting the following mutation:

    ```graphql
    mutation CreateTodo {
        createTodo(
            input: {
            name: "Tidy up the office",
            description: "Organize books, vaccuum, take out the trash",
            priority: NORMAL
            }
        ) {
            id,
            name,
            description,
            priority,
            _version,
            _lastChangedAt,
        }
    }
    ```

    ![](~/images/lib/getting-started/android/set-up-appsync-create.png)

1. Start your application. In the logs, filter for **aws-datastore** in **Verbose** mode.

    You will see this item synchronize to your local storage:

    ```console
    com.example.todo I/amplify:aws-datastore: Remote model update was sync'd down into local storage: ModelWithMetadata{model=Todo {id=2fc77577-41e0-4d2a-88bb-c727e187e701 name=Tidy up the office priority=NORMAL description=Organize books, vaccuum, take out the trash}, syncMetadata=ModelMetadata{id='2fc77577-41e0-4d2a-88bb-c727e187e701', _deleted=null, _version=1, _lastChangedAt=1589396142622}}
    ```