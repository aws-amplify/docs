```dart
try {
  await Amplify.Auth.confirmPassword(
    username: "myusername",
    newPassword: "mynewpassword",
    confirmationCode: "123456"
  );
} on AuthError catch (e) {
  print(e);
}
```