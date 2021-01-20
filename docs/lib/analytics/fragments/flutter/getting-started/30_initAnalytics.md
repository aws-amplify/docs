Add the Auth and Analytics plugin, along with any other plugins you may have added as described in the *Prerequisites* section; 

```dart
Amplify.addPlugins([AmplifyAuthCognito(), AmplifyAnalyticsPinpoint()]);
```

Make sure that the amplifyconfiguration.dart file generated in the project setup is included and sent to Amplify.configure: 

```dart 
import 'amplifyconfiguration.dart';

Amplify.configure(amplifyConfig)
```

Your class will look like this:

```dart
import 'amplifyconfiguration.dart';

class MyAmplifyApp extends StatefulWidget {

    @override
    void initState() {
        super.initState(); 

        Amplify.addPlugins([AmplifyAuthCognito(), AmplifyAnalyticsPinpoint()]);

        Amplify.configure(amplifyConfig); 
    }
}
```
