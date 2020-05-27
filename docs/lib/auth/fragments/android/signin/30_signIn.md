```java
Amplify.Auth.signIn(
  "username",
  "password",
  result -> Log.i("AuthQuickstart", result.isSignInComplete() ? "Sign in succeeded" : "Sign in not complete"),
  error -> Log.e("AuthQuickstart", error.toString())
);
```
