```dart
try {
  Amplify.Auth.signOut()
} on AuthError catch (e) {
  print(e);
}
```

