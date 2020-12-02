### Add the API plugin

DataStore's cloud synchronization uses the [API category](~/lib/graphqlapi/getting-started.md) behind the scenes. Therefore, the first step is to add an API plugin.

Make sure that you declare a dependency on the API plugin in your app-level `build.gradle`:

```groovy
dependencies {
    // Add this line.
    implementation 'com.amplifyframework:aws-api:1.6.4'
}
```

Next, add the plugin in your Amplify initialization code alongside with the previously added `AWSDataStorePlugin`.


<amplify-block-switcher>
<amplify-block name="Java">

```java
Amplify.addPlugin(new AWSDataStorePlugin());
// Add this line.
Amplify.addPlugin(new AWSApiPlugin());
Amplify.configure(getApplicationContext());
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
Amplify.addPlugin(AWSDataStorePlugin())
// Add this line.
Amplify.addPlugin(AWSApiPlugin())
Amplify.configure(applicationContext)
```

</amplify-block>
</amplify-block-switcher>

