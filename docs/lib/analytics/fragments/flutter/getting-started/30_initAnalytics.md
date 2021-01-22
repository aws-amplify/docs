Add the Auth and Analytics plugin, along with any other plugins you may have added as described in the **Prerequisites** section;

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
import 'package:amplify_flutter/amplify.dart';
import 'package:amplify_analytics_pinpoint/amplify_analytics_pinpoint.dart';
import 'package:amplify_auth_cognito/amplify_auth_cognito.dart';

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
