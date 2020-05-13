### Step 3: Verify that Amplify Libraries are integrated into the application

**Open `MainActivity`** and add the following code to the bottom of the `onCreate()` method:
**TODO: VERIFY -- WORK IN PROGRESS, NEEDS TO BE VERIFIED**

<amplify-block-switcher>
<amplify-block name="Java">

```java
try {
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
    Amplify.configure(applicationContext)

    Log.i("Tutorial", "Initialized Amplify")
} catch (e: AmplifyException) {
    Log.e("Tutorial", "Could not initialize Amplify", e)
}
```

</amplify-block>
</amplify-block-switcher>

Build and run the application.  In logcat, you'll see a log line indicating success:

```console
com.example.todo I/Tutorial: Initialized Amplify
```

**TODO: UPDATE THIS**

In order to run the application (without it erroring), you will need to provision resources in the backend.  If you attempt run your application at this point, you will see the following error:
```
An error occurred setting up Amplify: ConfigurationError: Could not load default `amplifyconfiguration.json` file
```


