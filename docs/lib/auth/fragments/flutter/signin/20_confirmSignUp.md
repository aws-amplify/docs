```dart
try {
  SignUpResult res = await Amplify.Auth.confirmSignUp(
    request: ConfirmSignUpRequest(
      userKey: "myusername",
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

