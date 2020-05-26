```java
Amplify.Auth.signOut(
    AuthSignOutOptions.builder().globalSignOut(true).build(),
    () -> Log.i(TAG, "Signed out globally"),
    error -> Log.e(TAG, error.toString())
);
```
