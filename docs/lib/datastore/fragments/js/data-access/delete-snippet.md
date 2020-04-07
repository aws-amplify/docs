To delete an item simply pass in an instance:

```js
const todelete = await DataStore.query(Post, "1234567");
DataStore.delete(todelete);
```

You can also pass predicate operators to delete multiple items. For example will delete all inactive posts:

```js
await DataStore.delete(Post, c => c.status("eq", PostStatus.INACTIVE));
```

Additionally you can perform a conditional delete, for instance only delete **if** a post is inactive by passing in an instance of a model:

```js
const todelete = await DataStore.query(Post, "123");
DataStore.delete(todelete, c => c.status("eq", PostStatus.INACTIVE));
```

Also to delete all items for a model you can use `Predicates.ALL`:

```js
await DataStore.delete(Post, Predicates.ALL);
```
