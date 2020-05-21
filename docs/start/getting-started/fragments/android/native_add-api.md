Now that your have DataStore persisting data locally, in the next step you'll connect it to the cloud. With a couple of commands, you'll create an AWS AppSync API and configure DataStore to synchronize its data to it.

1. Configure Amplify to manage cloud resources on your behalf. This step will configure a new AWS user in your account for Amplify.

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

  Amplify.DataStore.save(
          Todo.builder()
                  .name("Build Android application")
                  .description("Build an Android application using Amplify")
                  .build(),
          success -> Log.i("Tutorial", "Saved item: " + success.item.getName()),
          error -> Log.e("Tutorial", "Could not save item to DataStore", error)
  );

  Amplify.Hub.subscribe(
          HubChannel.DATASTORE,
          event -> DataStoreChannelEventName.RECEIVED_FROM_CLOUD.toString().equals(event.getName()),
          event -> {
              ModelWithMetadata modelWithMetadata = (ModelWithMetadata) event.getData();
              Todo todo = (Todo) modelWithMetadata.model;

              Log.i("Tutorial", "==== Todo ====");
              Log.i("Tutorial", "Name: " + todo.getName());

              if (todo.getPriority() != null) {
                  Log.i("Tutorial", "Priority: " + todo.getPriority().toString());
              }

              if (todo.getDescription() != null) {
                  Log.i("Tutorial", "Description: " + todo.getDescription());
              }
          }
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

  Amplify.DataStore.save(
          Todo.builder()
                  .name("Build Android application")
                  .description("Build an Android application using Amplify")
                  .build(),
          { success -> Log.i("Tutorial", "Saved item: " + success.item.getName()) },
          { error -> Log.e("Tutorial", "Could not save item to DataStore", error) }
  )

  Amplify.Hub.subscribe(
          HubChannel.DATASTORE,
          { event -> event.getName() == DataStoreChannelEventName.RECEIVED_FROM_CLOUD.toString() },
          { event ->
              val modelWithMetadata = event.getData() as ModelWithMetadata<*>?
              val todo: Todo = modelWithMetadata!!.model as Todo
              val name = todo.name;
              val priority: Priority? = todo.priority
              val description: String? = todo.description

              Log.i("Tutorial", "==== Todo ====")
              Log.i("Tutorial", "Name: $name")

              if (priority != null) {
                  Log.i("Tutorial", "Priority: $priority")
              }

              if (description != null) {
                  Log.i("Tutorial", "Description: $description")
              }
          }
  )
  ```

  </amplify-block>
  </amplify-block-switcher>

1. Run the application. This will create a new Todo item and synchronize it to the backend called "Build Android application." Additionally, it subscribes to Hub – our lightweight publish/subscribe mechanism to allow an application to be notified of events – for any items created on the cloud and synchronized locally and logs those Todo items. 

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

1. Start your application. In the logs, filter for **Tutorial**.

    You will see this item synchronize to your local storage:

    ```console
    com.example.todo I/Tutorial: ==== Todo ====
    com.example.todo I/Tutorial: Name: Tidy up the office
    com.example.todo I/Tutorial: Priority: NORMAL
    com.example.todo I/Tutorial: Description: Organize books, vaccuum, take out the trash
    ```