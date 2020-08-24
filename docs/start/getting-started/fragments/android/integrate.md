Next you'll use the generated model to read and write data. In this section you'll initialize DataStore, and create and query for Todo items.

## Configure Amplify and DataStore

First, we'll add the DataStore plugin and configure Amplify by creating an Application class and overriding the `onCreate()` method.
1. Navigate to the **example.todo** folder located at **ToDo** > **app** > **src** > **main** > **java/kotlin** > **com** > **example.todo**

1. Go to **File** > **New** and select either **Java Class** or **Kotlin File/Class**.

1. Select **Class**.

1. Type **MyAmplifyApplication** in the **Name** field.

1. Paste the following code to initialize Amplify:

  <amplify-block-switcher>
  <amplify-block name="Java">
  
    ```java
    public class MyAmplifyApplication extends Application {
      @Override
        public void onCreate() {
            super.onCreate();
            try {
                Amplify.addPlugin(new AWSApiPlugin());
                Amplify.addPlugin(new AWSDataStorePlugin());
                Amplify.configure(getApplicationContext());

                Log.i("Tutorial", "Initialized Amplify");
            } catch (AmplifyException e) {
                Log.e("Tutorial", "Could not initialize Amplify", e);
            }
        }
    }
    ```

  </amplify-block>

  <amplify-block name="Kotlin">

  ```kotlin
  class MyAmplifyApplication : Application() {
      override fun onCreate() {
          super.onCreate()
          try {
              Amplify.addPlugin(AWSApiPlugin())
              Amplify.addPlugin(AWSDataStorePlugin())
              Amplify.configure(applicationContext)
              Log.i("Tutorial", "Initialized Amplify")
          } catch (e: AmplifyException) {
              Log.e("Tutorial", "Could not initialize Amplify", e)
          }
      }
  }
  ```

  </amplify-block>
  </amplify-block-switcher>

1. Open **AndroidManifest.xml** to configure your application.

1. Add `xmlns:tools="http://schemas.android.com/tools"` to the `manifest` node.

1. Add the `android:name` and `tools:replace` attributes to the `application` node:

  ```xml
  <application
      android:name=".MyAmplifyApplication"
      tools:replace="android:name"
      ...
  ```

  Your file should look like this:

  ```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    package="com.example.todo">

    <application
        android:name=".MyAmplifyApplication"
        tools:replace="android:name"
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">
        <activity android:name=".MainActivity">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>
```

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
          .description("Build an Android application using Amplify")
          .build();
  ```

  </amplify-block>

  <amplify-block name="Kotlin">

  ```kotlin
  val item: Todo = Todo.builder()
        .name("Build Android application")
        .description("Build an Android application using Amplify")
        .build()
  ```

  </amplify-block>
  </amplify-block-switcher>

  This code creates a Todo item with two properties: a name and a description. This is a plain object that isn't stored in DataStore yet.

1. Below that, add the code to save the item to DataStore:

  <amplify-block-switcher>
  <amplify-block name="Java">

  ```java
    Amplify.DataStore.save(
            item,
            success -> Log.i("Tutorial", "Saved item: " + success.item().getName()),
            error -> Log.e("Tutorial", "Could not save item to DataStore", error)
    );
  ```

  </amplify-block>

  <amplify-block name="Kotlin">

  ```kotlin
  Amplify.DataStore.save(
          item,
          { success -> Log.i("Tutorial", "Saved item: " + success.item().name) },
          { error -> Log.e("Tutorial", "Could not save item to DataStore", error) }
  )
  ```

  </amplify-block>
  </amplify-block-switcher>

1. Run the application. In logcat, you'll see an indication that the item was saved successfully:

  ```console
  com.example.todo I/Tutorial: Initialized Amplify
  com.example.todo I/Tutorial: Saved item: Build application
  ```

1. Replace the item with a new Todo to save an additional item. Let's change the name and description, and add a priority:

  <amplify-block-switcher>
  <amplify-block name="Java">

  ```java
  Todo item = Todo.builder()
          .name("Finish quarterly taxes")
          .priority(Priority.HIGH)
          .description("Taxes are due for the quarter next week")
          .build();
  ```

  </amplify-block>

  <amplify-block name="Kotlin">

  ```kotlin
  val item = Todo.builder()
        .name("Finish quarterly taxes")
        .priority(Priority.HIGH)
        .description("Taxes are due for the quarter next week")
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
  Amplify.DataStore.query(
          Todo.class,
          todos -> {
              while (todos.hasNext()) {
                  Todo todo = todos.next();

                  Log.i("Tutorial", "==== Todo ====");
                  Log.i("Tutorial", "Name: " + todo.getName());

                  if (todo.getPriority() != null) {
                      Log.i("Tutorial", "Priority: " + todo.getPriority().toString());
                  }

                  if (todo.getDescription() != null) {
                      Log.i("Tutorial", "Description: " + todo.getDescription());
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
        Todo::class.java,
        { todos ->
            while (todos.hasNext()) {
                val todo = todos.next()
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
        },
        { failure -> Log.e("Tutorial", "Could not query DataStore", failure) }
  )
  ```

  </amplify-block>
  </amplify-block-switcher>

1. Run the application. In logcat, you'll see both items returned:

  ```console
  com.example.todo I/Tutorial: Initialized Amplify
  com.example.todo I/Tutorial: ==== Todo ====
  com.example.todo I/Tutorial: Name: Build application
  com.example.todo I/Tutorial: Description: Build an Android Application using Amplify
  com.example.todo I/Tutorial: ==== Todo ====
  com.example.todo I/Tutorial: Name: Finish quarterly taxes
  com.example.todo I/Tutorial: Description: Taxes are due for the quarter next week
  com.example.todo I/Tutorial: Priority: HIGH
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
  Amplify.DataStore.query(
          Todo.class,
          Where.matches(
              Todo.PRIORITY.eq(Priority.HIGH)
          ),
          todos -> {
              while (todos.hasNext()) {
                  Todo todo = todos.next();

                  Log.i("Tutorial", "==== Todo ====");
                  Log.i("Tutorial", "Name: " + todo.getName());

                  if (todo.getPriority() != null) {
                      Log.i("Tutorial", "Priority: " + todo.getPriority().toString());
                  }

                  if (todo.getDescription() != null) {
                      Log.i("Tutorial", "Description: " + todo.getDescription());
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
        Todo::class.java,
        Where.matches(
            Todo.PRIORITY.eq(Priority.HIGH)
        ),
        { todos ->
            while (todos.hasNext()) {
                val todo = todos.next()
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
  com.example.todo I/Tutorial: Description: Taxes are due for the quarter next week
  com.example.todo I/Tutorial: Priority: HIGH
  ```
