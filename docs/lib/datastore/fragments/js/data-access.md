## Save Data

To write any data to the DataStore you can pass an instance of a Model to `DataStore.save()` and it will be persisted in offline storage. At this point you can use it as an item in a normal data store such as querying, updating or deleting. If you choose to later connect to the cloud the item will be synchronized using GraphQL mutations and any other systems connected to the same backend can run queries or mutations on these items as well as observe them with GraphQL subscriptions.

```js
await DataStore.save(
    new Post({
      title: `My First Post`,
      rating: 10,
      status: PostStatus.ACTIVE
    })
  );
```

## Query Data

Querying data is always against the locally synchronized data, which is updated in the background for you by the DataStore Sync Engine when connected to the cloud. You can query using models as well as conditions using predicate filters for finer grained results.

```js
const posts = await DataStore.query(Post);
```

This will return a list of the first 100 items, you can optionally pass in a limit and page:

```js
const posts = await DataStore.query(Post, Predicates.ALL, {
  page: 0,
  limit: 100
});
```

The second object is a condition, described in the next section. The `page` and `limit` are optional.

### Query with Predicates

You can apply predicate filters against the DataStore using the fields defined on your GraphQL type along with the following conditions supported by DynamoDB:

**Strings:** `eq | ne | le | lt | ge | gt | contains | notContains | beginsWith | between`

**Numbers:** `eq | ne | le | lt | ge | gt | between`

**Lists:** `contains | notContains`

For example if you wanted a list of all "Post" Models that have a "rating" greater than 4:

```js
const posts = await DataStore.query(Post, c => c.rating("gt", 4));
```

When using multiple conditions, there is an implicit **AND** defined to mirror the GraphQL Transform condition statements. For example with multiple conditions:

```js
const posts = await DataStore.query(Post, c => c.rating("gt", 4).status("eq", PostStatus.ACTIVE));
```

If you wanted this to be an **OR** statement you would wrap your combined predicates with `c => c.or(...)`

```js
const posts = await DataStore.query(Post, c => c.or(
  c => c.rating("gt", 4).status("eq", PostStatus.ACTIVE)
));
```

## Update Data

Models in DataStore are immutable. To update a record you must use the `.copyOf` function to apply updates to the item's fields rather than mutating the instance directly:

```javascript

const original = await DataStore.query(Post, "123");

await DataStore.save(
	Post.copyOf(original, updated => {
		updated.title = `title ${Date.now()}`;
		updated.status =
			updated.status === PostStatus.ACTIVE
				? PostStatus.INACTIVE
				: PostStatus.ACTIVE;
	})
);
```

You can also apply conditions to update and delete operations. The condition will be applied locally and if you have enabled synchronization with the cloud it will be placed in a network mutation queue. The GraphQL mutation will then include this condition and be evaluated against the existing record in DynamoDB. If the condition holds the item in the cloud is updated and synchronized across devices. If the check fails then the item is not updated and the source of truth from the cloud will be applied to the local DataStore. For instance if you wanted to update if the `rating` was greater than 3:

```javascript

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

Conditional updates can only be applied to single items and not lists. If you wish to update a list of items you can loop over them and apply conditions one at a time.

## Delete Data

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

## Observe Data

You can subscribe to changes on your Models by using `observe` in the DataStore API. This reacts dynamically to updates of data to the underlying Storage Engine, which could be the result of GraphQL Subscriptions as well as Queries or Mutations that run against the backing AppSync API if you are synchronizing with the cloud.

**Note**: `observe` is async however you should not put `await` in front of it like the other DataStore API methods.

```js
const subscription = DataStore.observe(Post).subscribe(msg => {
  console.log(msg.model, msg.opType, msg.element);
});
```