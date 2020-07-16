```js
// first you save the post
const post = await DataStore.save(
  new Post({
    title: "My first post",
  })
);

// secondly, you save the editor/user
const editor = await DataStore.save(
  new User({
    username: "Nadia",
  })
);

// then you save the mode that links a post with an editor
await DataStore.save(
  new PostEditor({
    post: post,
    editor: editor
  })
);
```
