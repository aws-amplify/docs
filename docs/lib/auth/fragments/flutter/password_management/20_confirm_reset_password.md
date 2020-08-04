```dart
await Amplify.Auth.confirmPassword(
  request: ConfirmPasswordRequest(
    userKey: "myusername",
    newPassword: "cantguessthis",
    confirmationCode: "123456"
  )
);
```