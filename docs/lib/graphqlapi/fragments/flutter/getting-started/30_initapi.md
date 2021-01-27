To initialize the Amplify API category you call `Amplify.addPlugin()` method. To complete initialization call `Amplify.configure()`.

Your code should look like this:

```dart
import 'package:amplify_flutter/amplify.dart';
import 'package:amplify_api/amplify_api.dart';

import 'amplifyconfiguration.dart';

class MyAmplifyApp extends StatefulWidget {

    @override
    void initState() {
        super.initState();

        Amplify.addPlugin(AmplifyAPI());
        Amplify.configure(amplifyconfig);
    }
}
```
