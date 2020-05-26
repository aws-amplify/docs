```java
Amplify.Auth.confirmSignUp(
  "username",
  <Code from your email>,
  result -> Log.i(TAG, result.isSignUpComplete() ? "Confirm signUp succeeded" : "Confirm sign up not complete"), 
  error -> Log.e(TAG, error.toString())
);
```
