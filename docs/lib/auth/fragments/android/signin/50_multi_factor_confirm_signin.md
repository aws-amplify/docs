```java
Amplify.Auth.confirmSignIn(
  "confirmation code received via SMS",
  result -> Log.i("AuthQuickstart", result.toString()),
  error -> Log.e("AuthQuickstart", error.toString())
);
```
