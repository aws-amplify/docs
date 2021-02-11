```dart
try {
  Amplify.Auth.signOut(
    globalSignOut: true
  );
} on AuthException catch (e) {
  print(e.message);
}
```