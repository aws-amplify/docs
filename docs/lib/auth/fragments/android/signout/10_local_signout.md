```java
Amplify.Auth.signOut(
    () -> Log.i(TAG, "Signed out successfully"),
    error -> Log.e(TAG, error.toString())
);
```
