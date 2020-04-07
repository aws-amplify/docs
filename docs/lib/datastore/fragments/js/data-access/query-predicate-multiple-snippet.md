```js
const posts = await DataStore.query(Post, c =>
  c.rating("gt", 4).status("eq", PostStatus.ACTIVE)
);
```
