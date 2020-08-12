```dart
try {
  await Amplify.Auth.confirmPassword(
    request: ConfirmPasswordRequest(
      username: "myusername",
      newPassword: "mynewpassword",
      confirmationCode: "123456"
    )
  );
} on AuthError catch (e) {
  print(e);
}
```