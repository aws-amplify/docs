```java
Amplify.Auth.resetPassword(
   "username",
   result -> Log.i(TAG, result.toString()),
   error -> Log.e(TAG, error.toString())
);
```
