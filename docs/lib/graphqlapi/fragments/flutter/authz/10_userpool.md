Add the following code to your app:

```dart
await amplify.addPlugin(
    authPlugins: [AmplifyAuth()]
    apiPlugins: [AmplifyAPI()]
);
```