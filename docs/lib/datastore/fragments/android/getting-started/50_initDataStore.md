To initialize the Amplify Storage and Authentication categories, we are required to use the `Amplify.addPlugin()` method for each category we want.  When we are done calling `addPlugin()` on each category, we finish configuring Amplify by calling `Amplify.configure()`.


Add the following code to the bottom of your MainActivity `onCreate` method (ideally this would go in your Application class but this works for getting started quickly):

<amplify-block-switcher>
<amplify-block name="Java">

```java
Amplify.addPlugin(new AWSDataStorePlugin());
```

Your class will look like this:

```java
public class MyAmplifyApp extends Application {
    @Override
    public void onCreate() {
        super.onCreate();

        try {
            Amplify.addPlugin(new AWSDataStorePlugin());
            Amplify.configure(getApplicationContext());

            Log.i("MyAmplifyApp", "Initialized Amplify");
        } catch (AmplifyException error) {
            Log.e("MyAmplifyApp", "Could not initialize Amplify", error);
        }
    }
}
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
Amplify.addPlugin(AWSDataStorePlugin())
```

Your class will look like this:

```kotlin
class MyAmplifyApp : Application() {
    override fun onCreate() {
        super.onCreate()

        try {
            Amplify.addPlugin(AWSDataStorePlugin())
            Amplify.configure(applicationContext)

            Log.i("MyAmplifyApp", "Initialized Amplify")
        } catch (error: AmplifyException) {
            Log.e("MyAmplifyApp", "Could not initialize Amplify", error)
        }
    }
}
```

</amplify-block>
</amplify-block-switcher>

Upon building and running this application you should see the following in your console window:

```bash
Amplify configured with storage plugin
```