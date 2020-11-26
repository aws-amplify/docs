```dart
Post post = Post(title: "My First Post");
User editor = User(username: "Nadia");
PostEditor postEditor = PostEditor(post: post, editor: editor);

try {
  await Amplify.DataStore.save(post);
  await Amplify.DataStore.save(editor);
  await Amplify.DataStore.save(postEditor);
  print("Saved user, post and postEditor!");
} catch (e) {
  print("Error saving post, user and postEditor: " + e.toString());
}
```
