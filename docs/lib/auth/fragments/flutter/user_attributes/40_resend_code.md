 ```dart
try {
  ResendSignUpCodeResult res = await Amplify.Auth.resendSignUpCode(
    username: "myusername"
  );
} on AuthError catch (e) {
  print(e);
}
```
