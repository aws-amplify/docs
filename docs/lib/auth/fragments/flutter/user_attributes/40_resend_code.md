 ```dart
try {
  ResendSignUpCodeResult res = await Amplify.Auth.resendSignUpCode(
    request: ResendSignUpCodeRequest(
      username: "myusername"
    )
  );
} on AuthError catch (e) {
  print(e);
}
```
