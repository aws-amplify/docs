To initialize the Amplify Storage and Authentication categories, we are required to use the `Amplify.addPlugin()` method for each category we want.  When we are done calling `addPlugin()` on each category, we finish configuring Amplify by calling `Amplify.configure()`.


Add the following code to the bottom of your MainActivity `onCreate` method (ideally this would go in your Application class but this works for getting started quickly):

```java
AWSMobileClient.getInstance().initialize(getApplicationContext(), new Callback<UserStateDetails>() {
    @Override
    public void onResult(UserStateDetails userStateDetails) {
        try {
            Amplify.addPlugin(new AWSS3StoragePlugin());
            Amplify.configure(getApplicationContext());
            Log.i("StorageQuickstart", "Amplify configured with storage plugin");
        } catch (Exception exception) {
            Log.e("StorageQuickstart", exception.getMessage(), exception);
        }
    }

    @Override
    public void onError(Exception exception) {
        Log.e("StorageQuickstart", "Initialization error.", exception);
    }
});
```

Upon building and running this application you should see the following in your console window:

```bash
Amplify configured with storage plugin
```