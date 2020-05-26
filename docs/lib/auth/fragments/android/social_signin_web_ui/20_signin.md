For now, just add this method to the `onCreate` method of MainActivity with whatever provider you're using (shown with Facebook below):

```java
Amplify.Auth.signInWithSocialWebUI(
        AuthProvider.facebook(),
        this,
        result -> Log.i(TAG, result.toString()),
        error -> Log.e(TAG, error.toString())
);
```
