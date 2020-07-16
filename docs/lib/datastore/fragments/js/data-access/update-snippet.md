```js
const original = await DataStore.query(Post, "123");

await DataStore.save(
  Post.copyOf(original, updated => {
    updated.title = `title ${Date.now()}`;
  })
);
```

<amplify-callout>

Models in DataStore are *immutable*. To update a record you must use the `copyOf` function to apply updates to the item's fields rather than mutating the instance directly.

</amplify-callout>
