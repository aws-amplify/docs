```dart
try {
  List<Post> posts = await Amplify.DataStore.query(Post.classType);
} on DataStoreException catch (e) {
  print('Query failed: $e');
}
```
