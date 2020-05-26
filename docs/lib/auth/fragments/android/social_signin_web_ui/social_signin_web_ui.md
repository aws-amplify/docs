<inline-fragment platform="android" src="~/lib/auth/fragments/android/signin_web_ui/20_platform_specific_setup.md"></inline-fragment>

## Launch Social Web UI Sign In
Sweet! You're now ready to launch sign in with your social provider's web UI.
For now, just add this method to the `onCreate` method of MainActivity with whatever provider you're using (shown with Facebook below):

```java
Amplify.Auth.signInWithSocialWebUI(
        AuthProvider.facebook(),
        this,
        result -> Log.i(TAG, result.toString()),
        error -> Log.e(TAG, error.toString())
);
```
