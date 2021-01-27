```dart
try {
  List<Post> posts = await Amplify.DataStore.query(Post.classType);
} catch (e) {
  print("Query failed: " + e);
}
```
