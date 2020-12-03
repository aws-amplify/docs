### Add the API plugin

DataStore's cloud synchronization uses the [API category](~/lib/graphqlapi/getting-started.md) behind the scenes. Therefore, the first step is to add an API plugin.

Make sure that you declare a dependency on the DataStore plugin in your pubspec.yaml:

```yaml
dependencies:
  flutter:
    sdk: flutter
  amplify_api: '<1.0.0'
```

Next, add the plugin in your Amplify initialization code alongside with the previously added `AWSDataStorePlugin` but before calling `configure()`

```dart

AmplifyDataStore datastorePlugin =
    AmplifyDataStore(modelProvider: ModelProvider.instance);

amplifyInstance.addPlugin(dataStorePlugins: [datastorePlugin]);

// Add the following two lines
AmplifyAPI apiPlugin = AmplifyAPI();
amplifyInstance.addPlugin(apiPlugins: [apiPlugin]);

amplifyInstance.configure(amplifyConfig);
```
