```dart
try {
  Amplify.Auth.signOut(
    globalSignOut: true
  );
} on AuthError catch (e) {
  print(e);
}
```