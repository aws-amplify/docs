<amplify-block-switcher>
<amplify-block name="Java">

```java
public class MyAmplifyApp extends Application {
    @Override
    public void onCreate() {
        super.onCreate();

        try {
            AWSApiPlugin apiPlugin = AWSApiPlugin.builder().build();
            AWSCognitoAuthPlugin authPlugin = new AWSCognitoAuthPlugin();
            AWSDataStorePlugin datastorePlugin = AWSDataStorePlugin.builder()
                .authModeStrategy(AuthModeStrategyType.MULTIAUTH)
                .build();
            Amplify.addPlugin(apiPlugin);
            Amplify.addPlugin(authPlugin);
            Amplify.addPlugin(datastorePlugin);
            Amplify.configure(getApplicationContext());

            Log.i("MyAmplifyApp", "Initialized Amplify");
        } catch (AmplifyException error) {
            Log.e("MyAmplifyApp", "Could not initialize Amplify", error);
        }
    }
}


```

</amplify-block>
<amplify-block name="Kotlin - Callbacks">

```kotlin
public class MyAmplifyApp : Application() {
    override fun onCreate() {
        super.onCreate()

        try {
            val awsCognitoAuthPlugin = AWSCognitoAuthPlugin()
            val apiPlugin = AWSApiPlugin.builder().build()
            val datastorePlugin = AWSDataStorePlugin.builder()
                .authModeStrategy(AuthModeStrategyType.MULTIAUTH)
                .build()

            Amplify.addPlugin(awsCognitoAuthPlugin)
            Amplify.addPlugin(apiPlugin)
            Amplify.addPlugin(datastorePlugin)

            Amplify.configure(applicationContext)
            Log.i("MyAmplifyApp", "Initialized Amplify")
        } catch (error: AmplifyException) {
            Log.e("MyAmplifyApp", "Could not initialize Amplify", error)
        }
    }
}
```

</amplify-block>
<amplify-block name="Kotlin - Coroutines (Beta)">

```kotlin
// Be sure to import the Amplify library from the core-kotlin package.
import com.amplifyframework.kotlin.core.Amplify

public class MyAmplifyApp : Application() {
    override fun onCreate() {
        super.onCreate()

        try {
            val awsCognitoAuthPlugin = AWSCognitoAuthPlugin()
            val apiPlugin = AWSApiPlugin.builder().build()
            val datastorePlugin = AWSDataStorePlugin.builder()
                .authModeStrategy(AuthModeStrategyType.MULTIAUTH)
                .build()

            Amplify.addPlugin(awsCognitoAuthPlugin)
            Amplify.addPlugin(apiPlugin)
            Amplify.addPlugin(datastorePlugin)

            Amplify.configure(applicationContext)
            Log.i("MyAmplifyApp", "Initialized Amplify")
        } catch (error: AmplifyException) {
            Log.e("MyAmplifyApp", "Could not initialize Amplify", error)
        }
    }
}

```

</amplify-block>
<amplify-block name="RxJava">

```java
public class MyAmplifyApp extends Application {
    @Override
    public void onCreate() {
        super.onCreate();

        try {
            AWSApiPlugin apiPlugin = AWSApiPlugin.builder().build();
            AWSCognitoAuthPlugin authPlugin = new AWSCognitoAuthPlugin();
            AWSDataStorePlugin datastorePlugin = AWSDataStorePlugin.builder()
                .authModeStrategy(AuthModeStrategyType.MULTIAUTH)
                .build();
            RxAmplify.addPlugin(apiPlugin);
            RxAmplify.addPlugin(authPlugin);
            RxAmplify.addPlugin(datastorePlugin);
            RxAmplify.configure(getApplicationContext());

            Log.i("MyAmplifyApp", "Initialized Amplify");
        } catch (AmplifyException error) {
            Log.e("MyAmplifyApp", "Could not initialize Amplify", error);
        }
    }
}
```

</amplify-block>
</amplify-block-switcher>
