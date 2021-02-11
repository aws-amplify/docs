```dart
try {
  var res = await Amplify.Auth.fetchUserAttributes();
} on AuthException catch (e) {
  print(e.message);
}
```

