Add the following code to your app:

```dart
await amplify.addPlugin([
    authPlugins: [AmplifyAuthCognito()],
    apiPlugins: [AmplifyAPI()]
]);
```