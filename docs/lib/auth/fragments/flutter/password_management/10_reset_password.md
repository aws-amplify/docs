```dart
try {
  ResetPasswordResult res = await Amplify.Auth.resetPassword(
    request: ResetPasswordRequest(
      userKey: "myusername",
    ), 
  );
  setState(() {
    isPasswordReset = res.isPasswordReset;
  });
} on AuthError catch (e) {
  print(e);
}
```