Sign in users normally with the chosen `Username` type and password. If MFA is **ON** or enabled for the user, you must call `confirmSignIn` with the OTP sent to their phone.

```dart
await Amplify.Auth.signIn(
    username: username,
    password: password,
);

// If MFA is ON
await Amplify.Auth.confirmSignIn(
    confirmationValue: otp,
);
```