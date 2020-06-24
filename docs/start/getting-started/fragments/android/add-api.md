Now that your have DataStore persisting data locally, in the next step you'll connect it to the cloud. With a couple of commands, you'll create an AWS AppSync API and configure DataStore to synchronize its data to it.

1. Configure Amplify to manage cloud resources on your behalf. This step will configure a new AWS user in your account for Amplify. Open up a terminal window. You can use an external terminal or the integrated terminal in Android Studio. In the terminal, run:

    ```bash
    amplify configure
    ```

   This command will open up a web browser to the AWS Management Console and guide you through creating a new IAM user. For step-by-step directions to set this up, refer to the [CLI installation guide](~/cli/start/install.md).

1. Next, push your new API to AWS. In Android Studio, click the Gradle Task dropdown in the toolbar and select **amplifyPush**.

  ![](~/images/lib/getting-started/android/set-up-android-studio-run-task-dropdown-amplifyPush.png)

1. Run the task. You can do this by pressing the **play button** or pressing **Control-R**.

1. Modify your initialization code to initialize API in order to connect to the backend. Open `MainActivity` and remove all of the previous code you entered that saved and queried for Todo items. Now, add the following code to the bottom of the `onCreate()` method:

  <amplify-block-switcher>
  <amplify-block name="Java">
  
  ```java
  Amplify.DataStore.observe(Todo.class,
          started -> Log.i("Tutorial", "Observation began."),
          change -> Log.i("Tutorial", change.item().toString()),
          failure -> Log.e("Tutorial", "Observation failed.", failure),
          () -> Log.i("Tutorial", "Observation complete.")
  );
  ```

  </amplify-block>

  <amplify-block name="Kotlin">

  ```kotlin
  Amplify.DataStore.observe(Todo::class.java,
          { Log.i("Tutorial", "Observation began.") },
          { Log.i("Tutorial", it.item().toString()) },
          { Log.e("Tutorial", "Observation failed.", it) },
          { Log.i("Tutorial", "Observation complete.") }
  )
  ```

  </amplify-block>
  </amplify-block-switcher>

1. Run the application. This will synchronize the existing local Todo items to the cloud. `DataStore.observe` will log a message when new items are synchronized locally.

1. Open up a terminal window. You can use an external terminal or the integrated terminal in Android Studio. In the terminal, run:

   ```bash
   amplify console api
   ```

   ```console
   ? Please select from one of the below mentioned services: (Use arrow keys)
      `GraphQL`
   ```

1. Copy and paste the following query:

    ```graphql
    query GetTodos {
        listTodos {
            items {
                id
                name
                priority
                description
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
                name: "Tidy up the office"
                description: "Organize books, vacuum, take out the trash"
                priority: NORMAL
            }
        ) {
            id
            name
            description
            priority
            _version
            _lastChangedAt
        }
    }
```

    ![](~/images/lib/getting-started/android/set-up-appsync-create.png)

1. In the logs of your running application, filter for **Tutorial**. You will see this item synchronize to your local storage:

    ```console
    com.example.todo I/Tutorial: Todo {id=b9fa0d33-873e-46f3-baa3-3148f6f47d44, name=Tidy up the office, priority=NORMAL, description=Organize books, vacuum, take out the trash}
    ```