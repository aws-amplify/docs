```dart
List<Comment> comments = await Amplify.DataStore.query(Comment.classType,
    where: Post.STATUS.eq(PostStatus.ACTIVE));

```
