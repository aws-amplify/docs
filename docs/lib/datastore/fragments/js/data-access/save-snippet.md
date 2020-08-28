```js
await DataStore.save(
  new Post({
    title: "My First Post",
    rating: 10,
    status: PostStatus.DRAFT
  })
);
```
