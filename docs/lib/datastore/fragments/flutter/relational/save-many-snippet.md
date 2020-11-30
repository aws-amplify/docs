```dart
Post post = Post(title: "My First Post");
User editor = User(username: "Nadia");
PostEditor postEditor = PostEditor(post: post, editor: editor);

// first you save the post
await Amplify.DataStore.save(post);

// secondly, you save the editor/user
await Amplify.DataStore.save(editor);

// then you save the mode that links a post with an editor
await Amplify.DataStore.save(postEditor);
print("Saved user, post and postEditor!");

```
