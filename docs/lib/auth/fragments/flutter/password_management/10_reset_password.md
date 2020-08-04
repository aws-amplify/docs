```dart
  ResetPasswordResult res = await Amplify.Auth.resetPassword(
    request: ResetPasswordRequest(
      userKey: "myusername",
    ), 
  );
```