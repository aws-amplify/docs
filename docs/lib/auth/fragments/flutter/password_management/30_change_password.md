```dart
await Amplify.Auth.changePassword(
  request: ChangePasswordRequest(
    newPassword: "mynewpassword",
    oldPassword: "myoldpassword"
  )
);
```