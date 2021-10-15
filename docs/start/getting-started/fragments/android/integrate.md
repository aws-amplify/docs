Next you'll use the generated model to read and write data. In this section you'll initialize DataStore, and create and query for Todo items.

## Configure Amplify and DataStore

First, we'll add the DataStore plugin and configure Amplify by creating an Application class and overriding the `onCreate()` method.

1. Navigate to **Todo** > **app** > **src** > **main** > **java/kotlin** > **com** > **example.todo**

1. Open **MainActivity**

1. Add the following code in `onCreate` to initialize Amplify:

  <amplify-block-switcher>
  <amplify-block name="Java">
  
    ```java
    try {
        Amplify.addPlugin(new AWSDataStorePlugin());
        Amplify.configure(getApplicationContext());

        Log.i("Tutorial", "Initialized Amplify");
    } catch (AmplifyException e) {
        Log.e("Tutorial", "Could not initialize Amplify", e);
    }
    ```

  </amplify-block>

  <amplify-block name="Kotlin">

  ```kotlin
  try {
      Amplify.addPlugin(AWSDataStorePlugin())
      Amplify.configure(applicationContext)

      Log.i("Tutorial", "Initialized Amplify")
  } catch (failure: AmplifyException) {
      Log.e("Tutorial", "Could not initialize Amplify", failure)
  }
  ```

  </amplify-block>
  </amplify-block-switcher>

1. In the Gradle Task dropdown menu in the toolbar, select **app**, and run the application. In logcat, you'll see a log line indicating success:

    ```console
    com.example.todo I/Tutorial: Initialized Amplify
    ```

    To make this easier to find, select the **Verbose** logging level, and enter the string **Tutorial** into the search field (denoted by the magnifying glass icon):

    ![](~/images/lib/getting-started/android/set-up-android-studio-logcat-setup.gif)

## Create a Todo

Next, you'll create a Todo and save it to DataStore.

1. Open `MainActivity` and add the following code to the bottom of the `onCreate()` method:

  <amplify-block-switcher>
  <amplify-block name="Java">

  ```java
  Todo item = Todo.builder()
      .name("Build Android application")
      .priority(Priority.NORMAL)
      .build();
  ```

  </amplify-block>

  <amplify-block name="Kotlin">

  ```kotlin
  val item = Todo.builder()
      .name("Build Android application")
      .priority(Priority.NORMAL)
      .build()
  ```

  </amplify-block>
  </amplify-block-switcher>

  This code creates a Todo item with two properties: a name, and a priority. This is a plain object that isn't stored in DataStore yet.

1. Below that, add the code to save the item to DataStore:

  <amplify-block-switcher>
  <amplify-block name="Java">

  ```java
    Amplify.DataStore.save(item,
        success -> Log.i("Tutorial", "Saved item: " + success.item().getName()),
        error -> Log.e("Tutorial", "Could not save item to DataStore", error)
    );
  ```

  </amplify-block>

  <amplify-block name="Kotlin">

  ```kotlin
  Amplify.DataStore.save(item,
      { Log.i("Tutorial", "Saved item: ${item.name}") },
      { Log.e("Tutorial", "Could not save item to DataStore", it) }
  )
  ```

  </amplify-block>
  </amplify-block-switcher>

1. Run the application. In logcat, you'll see an indication that the item was saved successfully:

  ```console
  com.example.todo I/Tutorial: Initialized Amplify
  com.example.todo I/Tutorial: Saved item: Build Android application
  ```

1. Replace the item with a new Todo to save an additional item. Let's change the name and priority, and add a completedAt:

  <amplify-block-switcher>
  <amplify-block name="Java">

  ```java
  Date date = new Date();
  int offsetMillis = TimeZone.getDefault().getOffset(date.getTime());
  int offsetSeconds = (int) TimeUnit.MILLISECONDS.toSeconds(offsetMillis);
  Temporal.DateTime temporalDateTime = new Temporal.DateTime(date, offsetSeconds);
  Todo item = Todo.builder()
      .name("Finish quarterly taxes")
      .priority(Priority.HIGH)
      .completedAt(temporalDateTime)
      .build();
  ```

  </amplify-block>

  <amplify-block name="Kotlin">

  ```kotlin
  val date = Date()
  val offsetMillis = TimeZone.getDefault().getOffset(date.time).toLong()
  val offsetSeconds = TimeUnit.MILLISECONDS.toSeconds(offsetMillis).toInt()
  val temporalDateTime = Temporal.DateTime(date, offsetSeconds)
  val item = Todo.builder()
      .name("Finish quarterly taxes")
      .priority(Priority.HIGH)
      .completedAt(temporalDateTime)
      .build()
  ```

  </amplify-block>
  </amplify-block-switcher>

1. Run the application. In logcat, you'll see an indication that the item was saved successfully:

  ```console
  com.example.todo I/Tutorial: Initialized Amplify
  com.example.todo I/Tutorial: Saved item: Finish quarterly taxes
  ```

## Query Todos

Now that you have some data in DataStore, you can run queries to retrieve those records.

1. Edit your `onCreate` method to remove the item creation and save. Your `onCreate()` should only include the code required to initialize Amplify and not calls to `Todo.builder()` or `Amplify.DataStore.save()`.

1. Below the initialization code, add the following:

  <amplify-block-switcher>
  <amplify-block name="Java">

  ```java
  Amplify.DataStore.query(Todo.class,
      todos -> {
          while (todos.hasNext()) {
              Todo todo = todos.next();

              Log.i("Tutorial", "==== Todo ====");
              Log.i("Tutorial", "Name: " + todo.getName());

              if (todo.getPriority() != null) {
                  Log.i("Tutorial", "Priority: " + todo.getPriority().toString());
              }

              if (todo.getCompletedAt() != null) {
                  Log.i("Tutorial", "CompletedAt: " + todo.getCompletedAt().toString());
              }
          }
      },
      failure -> Log.e("Tutorial", "Could not query DataStore", failure)
  );
  ```

  </amplify-block>

  <amplify-block name="Kotlin">

  ```kotlin
  Amplify.DataStore.query(Todo::class.java,
      { todos ->
          while (todos.hasNext()) {
              val todo: Todo = todos.next()
              Log.i("Tutorial", "==== Todo ====")
              Log.i("Tutorial", "Name: ${todo.name}")
              Log.i("Tutorial", "Priority: ${todo.priority}")
              Log.i("Tutorial", "CompletedAt: ${todo.completedAt}")
          }
      },
      { Log.e("Tutorial", "Could not query DataStore", it)  }
  )
  ```

  </amplify-block>
  </amplify-block-switcher>

1. Run the application. In logcat, you'll see both items returned:

  ```console
  com.example.todo I/Tutorial: Initialized Amplify
  com.example.todo I/Tutorial: ==== Todo ====
  com.example.todo I/Tutorial: Name: Build Android application
  com.example.todo I/Tutorial: Priority: NORMAL
  com.example.todo I/Tutorial: ==== Todo ====
  com.example.todo I/Tutorial: Name: Finish quarterly taxes
  com.example.todo I/Tutorial: Priority: HIGH
  com.example.todo I/Tutorial: CompletedAt: <DateTime>
  ```

1. Queries can also contain predicate filters. These will query for specific objects matching a certain condition.

  The following predicates are supported:

  **Strings**
  
  `eq` `ne` `le` `lt` `ge` `gt` `contains` `notContains` `beginsWith` `between`

  **Numbers**

  `eq` `ne` `le` `lt` `ge` `gt` `between`

  **Lists**

  `contains` `notContains`

  To use a predicate, pass an additional argument into your query. For example, the following code queries for all high priority items:

  <amplify-block-switcher>
  <amplify-block name="Java">

  ```java
  Amplify.DataStore.query(Todo.class,
      Where.matches(Todo.PRIORITY.eq(Priority.HIGH)),
      todos -> {
          while (todos.hasNext()) {
              Todo todo = todos.next();

              Log.i("Tutorial", "==== Todo ====");
              Log.i("Tutorial", "Name: " + todo.getName());

              if (todo.getPriority() != null) {
                  Log.i("Tutorial", "Priority: " + todo.getPriority().toString());
              }

              if (todo.getCompletedAt() != null) {
                  Log.i("Tutorial", "Description: " + todo.getCompletedAt().toString());
              }
          }
      },
      failure -> Log.e("Tutorial", "Could not query DataStore", failure)
  );
  ```

  </amplify-block>

  <amplify-block name="Kotlin">

  ```kotlin
  Amplify.DataStore.query(
      Todo::class.java, Where.matches(Todo.PRIORITY.eq(Priority.HIGH)),
      { todos ->
          while (todos.hasNext()) {
              val todo: Todo = todos.next()
              Log.i("Tutorial", "==== Todo ====")
              Log.i("Tutorial", "Name: ${todo.name}")
              Log.i("Tutorial", "Priority: ${todo.priority}")
              Log.i("Tutorial", "CompletedAt: ${todo.completedAt}")
          }
      },
      { failure -> Log.e("Tutorial", "Could not query DataStore", failure) }
  )
  ```

  </amplify-block>
  </amplify-block-switcher>

  In the above code, notice the addition of the predicate parameter as the second argument.

1. Run the application. In logcat, you'll see only the high priority item returned:

  ```console
  com.example.todo I/Tutorial: Initialized Amplify
  com.example.todo I/Tutorial: ==== Todo ====
  com.example.todo I/Tutorial: Name: Finish quarterly taxes
  com.example.todo I/Tutorial: Priority: HIGH
  com.example.todo I/Tutorial: CompletedAt: <DateTime>
  ```
