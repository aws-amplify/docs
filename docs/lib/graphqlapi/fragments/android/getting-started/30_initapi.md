To initialize the Amplify API category, we are required to use the `Amplify.addPlugin()` method followed by `Amplify.configure()`.

Add the following code to the bottom of your MainActivity `onCreate` method (ideally this would go in your Application class but this works for getting started quickly):

```java
try {
    Amplify.addPlugin(new AWSApiPlugin());
    Amplify.configure(getApplicationContext());
    Log.i("APIQuickstart", "Amplify configured with api plugin");
} catch (Exception exception) {
    Log.e("APIQuickstart", exception.getMessage(), exception);
}
```

Upon building and running this application you should see the following in your console window:

```bash
Amplify configured with api plugin
```