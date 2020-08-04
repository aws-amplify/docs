```dart
SignUpResult res = await Amplify.Auth.confirmSignUp(
  request: ConfirmSignUpRequest(
    userKey: "myusername",
    confirmationCode: "123456"
  )
);
```

