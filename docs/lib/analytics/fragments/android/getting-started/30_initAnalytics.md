Add the following code to the onCreate() method of `MainActivity.java`

```java
try {
        AmazonCognitoAuthPlugin authPlugin = new AmazonCognitoAuthPlugin((Application) context)
        AmazonPinpointAnalyticsPlugin analyticsPlugin = new AmazonPinpointAnalyticsPlugin((Application) context);
        Amplify.addPlugin(authPlugin)
        Amplify.addPlugin(analyticsPlugin);
        Amplify.configure(context);
        Log.i("GetStarted", "Amplify initialized with auth and analytics plugins");
    } catch (Exception e) {
        Log.e("GetStarted", "Error initializing", e);
    }

    Analytics.recordEvent("AppOpened");
}
```