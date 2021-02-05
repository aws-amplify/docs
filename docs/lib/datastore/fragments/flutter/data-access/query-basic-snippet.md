```dart
try {
  List<Post> posts = await Amplify.DataStore.query(Post.classType);
} on DatastoreException catch (e) {
  print('Query failed: $e');
}
```
