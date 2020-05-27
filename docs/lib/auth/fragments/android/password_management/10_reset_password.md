```java
Amplify.Auth.resetPassword(
   "username",
   result -> Log.i("AuthQuickstart", result.toString()),
   error -> Log.e("AuthQuickstart", error.toString())
);
```
