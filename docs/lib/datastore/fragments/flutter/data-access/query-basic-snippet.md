```dart
try {
  List<Post> posts = query(Post.classType);
} catch (e) {
  print("Query failed: " + e);
}
```
