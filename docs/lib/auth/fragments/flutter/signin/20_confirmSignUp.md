```dart
try {
  SignUpResult res = await Amplify.Auth.confirmSignUp(
    request: ConfirmSignUpRequest(
      username: "myusername",
      confirmationCode: "123456"
    )
  );
  setState(() {
    isSignUpComplete = res.isSignUpComplete;
  });
} on AuthError catch (e) {
  print(e);
}
```

