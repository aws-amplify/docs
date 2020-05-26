Add the following code to the onCreate() method in your application class:
```java
Amplify.addPlugin(new AWSCognitoAuthPlugin());
Amplify.addPlugin(new AWSPinpointAnalyticsPlugin());
```
Your class should look like this:
```java
public class MyAmplifyApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();

        try {
            // Add these lines to add the AWSCognitoAuthPlugin and AWSPinpointAnalyticsPlugin plugins
            Amplify.addPlugin(new AWSCognitoAuthPlugin());
            Amplify.addPlugin(new AWSPinpointAnalyticsPlugin());
            Amplify.configure(getApplicationContext());

            Log.i("MyAmplifyApplication", "Initialized Amplify");
        } catch (AmplifyException error) {
            Log.e("MyAmplifyApplication", "Could not initialize Amplify", error);
        }
    }
}
```