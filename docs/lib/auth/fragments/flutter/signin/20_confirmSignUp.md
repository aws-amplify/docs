```dart
try {
  SignUpResult res = await Amplify.Auth.confirmSignUp(
    username: "myusername",
    confirmationCode: "123456"
  );
  setState(() {
    isSignUpComplete = res.isSignUpComplete;
  });
} on AuthError catch (e) {
  print(e);
}
```

