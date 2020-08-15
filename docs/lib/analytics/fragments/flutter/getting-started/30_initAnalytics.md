To initialize the Amplify Auth and Analytics categories you call `Amplify.addPlugin()` method for each category. To complete initialization call `Amplify.configure()`.

Add the following code to the `initState` method 




```java
Amplify.addPlugin(new AWSCognitoAuthPlugin());
Amplify.addPlugin(new AmplifyAnalyticsPinpointPlugin());
```

(VERIFY, To be determined) Make sure that the amplifyconfiguration.dart file generated in the project setup is included and sent to Amplify.configure: 

```java 
import 'amplifyconfiguration.dart';

Amplify.configure( amplifyConfig )
```

Your class will look like this:

```java
import 'amplifyconfiguration.dart';

class MyAmplifyApp extends StatefulWidget {

    @override
    void initState() {
        super.initState(); 

        Amplify.addPlugin(new AWSCognitoAuthPlugin());
        Amplify.addPlugin(new AWSPinpointAnalyticsPlugin(this));

        Amplify.configure( amplifyConfig ); 

    }
}
```