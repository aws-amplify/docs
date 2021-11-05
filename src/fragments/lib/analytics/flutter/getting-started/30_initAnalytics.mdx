Add the Auth and Analytics plugin, along with any other plugins you may have added as described in the **Prerequisites** section;

```dart
Amplify.addPlugins([AmplifyAuthCognito(), AmplifyAnalyticsPinpoint()]);
```

Make sure that the amplifyconfiguration.dart file generated in the project setup is included and sent to Amplify.configure:

```dart 
import 'amplifyconfiguration.dart';

await Amplify.configure(amplifyconfig)
```

Your class will look like this:

```dart
import 'package:amplify_flutter/amplify.dart';
import 'package:amplify_analytics_pinpoint/amplify_analytics_pinpoint.dart';
import 'package:amplify_auth_cognito/amplify_auth_cognito.dart';

import 'amplifyconfiguration.dart';

class MyApp extends StatefulWidget {
  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
    @override
    void initState() {
        super.initState();
        _configureAmplify();
    }

    void _configureAmplify() async {
        // Add the following line to add Pinpoint and Cognito plugin to your app
        Amplify.addPlugins([AmplifyAuthCognito(), AmplifyAnalyticsPinpoint()]);

        try {
            await Amplify.configure(amplifyconfig);
        } on AmplifyAlreadyConfiguredException {
            print("Tried to reconfigure Amplify; this can occur when your app restarts on Android.");
        }
    }
}
```
