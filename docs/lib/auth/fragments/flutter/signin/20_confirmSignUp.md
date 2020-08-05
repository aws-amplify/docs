```dart
try {
  SignUpResult res = await Amplify.Auth.confirmSignUp(
    request: ConfirmSignUpRequest(
      userKey: "myusername",
      confirmationCode: "123456"
    )
  );
} on AuthError catch (e) {
  print(e);
}
```

