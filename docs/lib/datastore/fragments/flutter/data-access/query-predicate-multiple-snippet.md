```dart
List<Post> posts = await Amplify.DataStore.query(Post.classType,
    where: Post.RATING.eq(2).and(Post.STATUS.eq(PostStatus.PUBLISHED)));
```
