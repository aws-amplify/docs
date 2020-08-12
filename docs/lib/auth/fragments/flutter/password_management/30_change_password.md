```dart
try {
  await Amplify.Auth.updatePassword(
    request: UpdatePasswordRequest(
      newPassword: "mynewpassword",
      oldPassword: "myoldpassword"
    )
  );
} on AuthError catch (e) {
  print(e);
}
```