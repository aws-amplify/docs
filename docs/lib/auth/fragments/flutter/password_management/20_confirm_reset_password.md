```dart
try {
  await Amplify.Auth.confirmPassword(
    request: ConfirmPasswordRequest(
      userKey: "myusername",
      newPassword: "cantguessthis",
      confirmationCode: "123456"
    )
  );
} on AuthError catch (e) {
  print(e);
}
```