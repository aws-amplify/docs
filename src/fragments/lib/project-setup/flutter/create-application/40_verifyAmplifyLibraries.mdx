
Before using any methods in the Amplify Flutter Library, it's important to add all necessary plugins and to call configure once in your app.  The steps below will guide you through configuring Amplify Flutter at the root level of your flutter app. 

Import the necessary dart dependencies at the top of main.dart: 

```dart
// Amplify Flutter Packages
import 'package:amplify_flutter/amplify.dart';
import 'package:amplify_analytics_pinpoint/amplify_analytics_pinpoint.dart';
import 'package:amplify_auth_cognito/amplify_auth_cognito.dart';

// Generated in previous step 
import 'amplifyconfiguration.dart'; 
```

Add the following code to your application's root Stateful Widget, for a blank Flutter app this should be the `class _MyHomePageState extends State<MyHomePage>`. 

```dart

class _MyHomePageState extends State<MyHomePage> {

  @override
  initState() {
    super.initState(); 
    _configureAmplify(); 
  }

  void _configureAmplify() async {

    // Add Pinpoint and Cognito Plugins, or any other plugins you want to use
    AmplifyAnalyticsPinpoint analyticsPlugin = AmplifyAnalyticsPinpoint();
    AmplifyAuthCognito authPlugin = AmplifyAuthCognito();
    Amplify.addPlugins([authPlugin, analyticsPlugin]);

    // Once Plugins are added, configure Amplify
    // Note: Amplify can only be configured once.
    try {
      await Amplify.configure(amplifyconfig);
    } on AmplifyAlreadyConfiguredException {
      print("Tried to reconfigure Amplify; this can occur when your app restarts on Android.");
    }
  }

  // customize the rest of your Widget below as you wish...

```

Note that all calls to `addPlugin()` or `addPlugins()` are made before `Amplify.configure()` is called.
