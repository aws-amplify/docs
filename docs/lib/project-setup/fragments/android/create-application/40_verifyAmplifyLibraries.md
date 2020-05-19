**Open `MainActivity`** and add the following code to the bottom of the `onCreate()` method:

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