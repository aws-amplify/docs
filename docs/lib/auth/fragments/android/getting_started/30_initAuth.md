To initialize the Amplify Auth category, we are required to use the `Amplify.addPlugin()` method. We then finish configuring Amplify by calling `Amplify.configure()`.

Add the following code to your `MainActivity#onCreate` method (for production, this should go in your Application class but this works for getting started quickly):

```java
try {
    Amplify.addPlugin(new AWSCognitoAuthPlugin());
    Amplify.configure(getApplicationContext());
    Log.i("AmplifyQuickstart", "Configured!");
} catch(AmplifyException exception) {
    Log.e("AmplifyQuickstart", "Failed to configure Amplify", exception);
}
```
