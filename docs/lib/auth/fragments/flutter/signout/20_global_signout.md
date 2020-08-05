```dart
try {
  Amplify.Auth.signOut(
    request: SignOutRequest(
      options: CognitoSignOutOptions(
        globalSignOut: true
      )
    )
  );
} on AuthError catch (e) {
  print(e);
}
```