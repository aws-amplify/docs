To initialize the Amplify Auth and API categories you call `Amplify.addPlugin()` method for each category. To complete initialization call `Amplify.configure()`.

Your code should look like this:

```dart
import 'package:amplify_core/amplify_core.dart';
import 'package:amplify_api_rest/amplify_api_rest.dart';

import 'amplifyconfiguration.dart';

class MyAmplifyApp extends StatefulWidget {

    Amplify amplifyInstance = Amplify();

    @override
    void initState() {
        super.initState(); 

        AmplifyAPIRest apiRest = AmplifyAPIRest();
        amplifyInstance.addPlugin(apiRestPlugins: [apiRest]);
        amplifyInstance.configure(amplifyConfig); 
    }
}
```