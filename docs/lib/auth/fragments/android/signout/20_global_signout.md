```java
Amplify.Auth.signOut(
    AuthSignOutOptions.builder().globalSignOut(true).build(),
    () -> Log.i("AuthQuickstart", "Signed out globally"),
    error -> Log.e("AuthQuickstart", error.toString())
);
```
