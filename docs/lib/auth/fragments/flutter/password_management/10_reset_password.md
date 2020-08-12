```dart
try {
  ResetPasswordResult res = await Amplify.Auth.resetPassword(
    request: ResetPasswordRequest(
      username: "myusername",
    ), 
  );
  setState(() {
    isPasswordReset = res.isPasswordReset;
  });
} on AuthError catch (e) {
  print(e);
}
```