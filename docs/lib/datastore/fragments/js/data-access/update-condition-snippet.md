```js
const original = await DataStore.query(Post, "123");

await DataStore.save(
  Post.copyOf(original, updated => {
    updated.title = `title ${Date.now()}`;
    updated.status =
      updated.status === PostStatus.ACTIVE
        ? PostStatus.INACTIVE
        : PostStatus.ACTIVE;
  }),
  c => c.rating("gt", 3)
);
```
