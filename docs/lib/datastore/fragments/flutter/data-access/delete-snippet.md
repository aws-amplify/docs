Below, we query for an instance with an `id` of `"123"`, and then delete it, if found:

```dart
(await Amplify.DataStore.query(Post.classType, where: Post.ID.eq("123")))
    .forEach((element) async {
  try {
    await Amplify.DataStore.delete(element);
    print("Deleted a post");
  } catch (e) {
    print("Delete failed: " + e);
  }
});
```
