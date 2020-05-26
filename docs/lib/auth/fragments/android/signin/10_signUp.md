```java
Amplify.Auth.signUp(
  "username",
  "Password123",
  AuthSignUpOptions.builder().userAttributes(Collections.singletonMap("email", "your@email.com")).build(),
  result -> Log.i("AuthQuickStart", "Result: " + result.toString()),
  error -> Log.e("AuthQuickStart", "Sign up failed", error)
);
```
