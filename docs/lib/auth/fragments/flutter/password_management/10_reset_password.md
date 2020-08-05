```dart
try {
  ResetPasswordResult res = await Amplify.Auth.resetPassword(
    request: ResetPasswordRequest(
      userKey: "myusername",
    ), 
  );
} on AuthError catch (e) {
  print(e);
}
```