```dart
try {
  await Amplify.Auth.rememberDevice();
  print('Remember device succeeded');
} on Exception catch (e) {
  print('Remember device failed with error: $e');
}
```