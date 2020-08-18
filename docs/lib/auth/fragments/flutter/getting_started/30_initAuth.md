Add the Auth plugin, along with any other plugins you may have added as described in the **Prerequisites** section.

```dart
// Add this line, to include the Auth plugin.
AmplifyAuthCognito auth = AmplifyAuthCognito();
amplify.addPlugin(authPlugins: [auth]);
```
