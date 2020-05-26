```java
Amplify.Auth.confirmSignUp(
  "username",
  "the code you received via email",
  result -> Log.i("AuthQuickstart", result.isSignUpComplete() ? "Confirm signUp succeeded" : "Confirm sign up not complete"),
  error -> Log.e("AuthQuickstart", error.toString())
);
```
