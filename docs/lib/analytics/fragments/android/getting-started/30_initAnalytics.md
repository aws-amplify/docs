Add the following imports to the top of your `MainActivity.java` file:

```java
com.amplifyframework.analytics.pinpoint.AmazonPinpointAnalyticsPlugin;
com.amplifyframework.auth.Cognito.AmazonCognitoAuthPlugin;
com.amplifyframework.core.Amplify;
com.amplifyframework.analytics.AnalyticsEvent;
```

Add the following code to the onCreate() method of `MainActivity.java`

```java
try {
        AmazonCognitoAuthPlugin authPlugin = new AmazonCognitoAuthPlugin((Application) context)
        AmazonPinpointAnalyticsPlugin analyticsPlugin = new AmazonPinpointAnalyticsPlugin((Application) context);
        Amplify.addPlugin(authPlugin)
        Amplify.addPlugin(analyticsPlugin);
        Amplify.configure(context);
    } catch (Exception e) {
        Log.e("GetStarted", "Error initializing", e);
    }

    Analytics.recordEvent("GetStarted");
}
```