<!-- TODO update AWSMobileClient -->
To initialize the Amplify Predictions and Authentication categories, we are required to use the `Amplify.addPlugin()` method for each category we want.  When we are done calling `addPlugin()` on each category, we finish configuring Amplify by calling `Amplify.configure()`.

Add the following code to your `MainActivity#onCreate` method (ideally this would go in your Application class but this works for getting started quickly):

```java
AWSMobileClient.getInstance().initialize(getApplicationContext(), new Callback<UserStateDetails>() {
    @Override
    public void onResult(UserStateDetails userStateDetails) {
        try {
            Amplify.addPlugin(new AWSPredictionsPlugin());
            Amplify.configure(getApplicationContext());
            Log.i("AmplifyQuickstart", "All set and ready to go!");
        } catch (Exception exception) {
            Log.e("AmplifyQuickstart", exception.getMessage(), exception);
        }
    }

    @Override
    public void onError(Exception exception) {
        Log.e(TAG, "Initialization error.", exception);
    }
});
```