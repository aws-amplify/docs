To initialize the Amplify Auth and Storage categories you call `Amplify.addPlugin()` method for each category. To complete initialization call `Amplify.configure()`.

```dart
// Add this line, to include the Auth plugin.
AmplifyAuthCognito auth = AmplifyAuthCognito();
AmplifyStorageS3 storage = AmplifyStorageS3();
amplify.addPlugin(
    authPlugins: [auth], 
    storagePlugins: [storage]
);
```