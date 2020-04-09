```js
const comments = (await DataStore.query(Comment)).filter(c => c.post.id === "123");
```

Alternatively:

```js
const post = await DataStore.query(Post, "123");
const comments = (await DataStore.query(Comment)).filter(c => c.post.id === post.id);
```
