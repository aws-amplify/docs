
Before using any methods in the Amplify Flutter Library, it's important to add all necessary plugins and to call configure.  These init methods should only be called once at the root level of your flutter app. 

Add the following method to your application and call it: 

```dart
void _configureAmplify() async {
  if (!mounted) return;

  // Add Pinpoint and Cognito Plugins, or any other plugins you want to use
  AmplifyAnalyticsPinpointPlugin analyticsPlugin = new AmplifyAnalyticsPinpointPlugin();
  AmplifyAuthCognito authPlugin = new AmplifyAuthCognito();
  amplifyInstance.addPlugin(authPlugins: [authPlugin]);
  amplifyInstance.addPlugin(analyticsPlugins: [analyticsPlugin]);

  // Once Plugins are added, configure Amplify
  await amplifyInstance.configure(amplifyconfig);
  try {
    setState(() {
      _amplifyConfigured = true;
    });
  } catch (e) {
    print(e);
  }

}
```

Note that all calls to `addPlugin` are made before `amplify.configure` is called.