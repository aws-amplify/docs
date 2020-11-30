```dart
(await Amplify.DataStore.query(Post.classType, where: Post.ID.eq("123")))
    .forEach((element) async {
  await Amplify.DataStore.delete(element);
  print("Deleted a post");
});
```
