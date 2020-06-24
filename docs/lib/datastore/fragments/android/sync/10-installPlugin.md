### Add the API plugin

DataStore's cloud synchronization uses the [API category](~/lib/graphqlapi/getting-started.md) behind the scenes. Therefore, the first step is to add an API plugin.

Make sure that you declare a dependency on the API plugin in your app-level `build.gradle`:

\```groovy
dependencies {
    // Add this line.
    implementation 'com.amplifyframework:aws-api:1.0.0'
}
\```

Then add the plugin in your Amplify initialization code alongside with the previously added `AWSDataStorePlugin`.

TODO: add Android API plugin
