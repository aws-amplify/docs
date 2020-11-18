```dart
Post oldPost = (await Amplify.DataStore.query(Post.classType,
    where: Post.ID.eq("123")))[0];
Post newPost = oldPost.copyWith(id: oldPost.id, title: 'Updated Title');

await Amplify.DataStore.save(newPost);
```
