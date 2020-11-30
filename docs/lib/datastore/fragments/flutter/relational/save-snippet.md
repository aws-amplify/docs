```dart
Post post = Post(
    title: "My Post with comments", rating: 10, status: PostStatus.ACTIVE);
Comment comment = Comment(
    post: post, // Directly pass in the post instance
    content: "Loving Amplify DataStore!");

await Amplify.DataStore.save(post);
print("Post saved");
await Amplify.DataStore.save(comment);
print("Comment saved");

```
