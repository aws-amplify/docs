To initialize the Amplify API category you call `Amplify.addPlugin()` method for each category. To complete initialization call `Amplify.configure()`.

Your code should look like this:

```dart
import 'package:amplify_core/amplify_core.dart';
import 'package:amplify_api/amplify_api.dart';

import 'amplifyconfiguration.dart';

class MyAmplifyApp extends StatefulWidget {

    Amplify amplify = Amplify();

    @override
    void initState() {
        super.initState();

        AmplifyAPI api = AmplifyAPI();
        await amplify.addPlugin(apiPlugins: [api]);
        await amplify.configure(amplifyConfig);
    }
}
```