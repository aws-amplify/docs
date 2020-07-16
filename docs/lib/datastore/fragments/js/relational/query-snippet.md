```js
const comments = (await DataStore.query(Comment)).filter(c => c.postID === "123");
```

Alternatively:

```js
const post = await DataStore.query(Post, "123");
const comments = (await DataStore.query(Comment)).filter(c => c.postID === post.id);
```
