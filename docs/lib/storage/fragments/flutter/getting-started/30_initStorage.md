To initialize the Amplify Auth and Storage categories you call `Amplify.addPlugin()` method for each plugin of that category or pass all the plugins in `Amplify.addPlugins()`. To complete initialization call `Amplify.configure()`.

```dart
// Add this line, to include Auth and Storage plugins.
Amplify.addPlugins([AmplifyAuthCognito(), AmplifyStorageS3()]);
```
