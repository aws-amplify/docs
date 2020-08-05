```dart
try {
  await Amplify.Auth.changePassword(
    request: ChangePasswordRequest(
      newPassword: "mynewpassword",
      oldPassword: "myoldpassword"
    )
  );
} on AuthError catch (e) {
  print(e);
}
```