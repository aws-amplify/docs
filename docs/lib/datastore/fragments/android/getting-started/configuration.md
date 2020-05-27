### Initialization

Add the following code to your `onCreate()` method in your application class:

<amplify-block-switcher>
<amplify-block name="Java">

```java
try {
    Amplify.addPlugin(new AWSDataStorePlugin());
    Amplify.addPlugin(new AWSApiPlugin()); // If using remote model synchronization
    Amplify.configure(getApplicationContext());
    Log.i("MyAmplifyApp", "Initialized Amplify");
} catch (AmplifyException error) {
    Log.e("MyAmplifyApp", "Could not initialize Amplify", error);
}
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
try {
    Amplify.addPlugin(AWSDataStorePlugin())
    Amplify.addPlugin(AWSApiPlugin()) // If using remote model synchronization
    Amplify.configure(applicationContext)
    Log.i("MyAmplifyApp", "Initialized Amplify")
} catch (error: AmplifyException) {
    Log.e("MyAmplifyApp", "Could not initialize Amplify", error)
}
```

</amplify-block>
</amplify-block-switcher>

If you do not have any configuration file at `app/src/main/res/raw/amplifyconfiguration.json`, create a placeholder for now. For more information about this file, see the configuration section of this guide.

```json
{
  "userAgent": "aws-amplify-cli/2.0",
  "version": "1.0"
}
```
