```dart
List<Post> posts = await Amplify.DataStore.query(Post.classType,
    sortBy: [Post.RATING.ascending(), Post.TITLE.descending()]);
```
