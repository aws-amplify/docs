```java
Amplify.Auth.signIn(
  "username",
  "password",
  result -> Log.i(TAG, result.isSignInComplete() ? "Sign in succeeded" : "Sign in not complete"),
  error -> Log.e(TAG, error.toString())
);
```
