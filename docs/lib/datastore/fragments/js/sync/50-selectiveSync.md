## Selectively syncing a subset of your data

By default, DataStore downloads the entire contents of your cloud data source to your local device.
The max number of records that will be stored is configurable [here](https://docs.amplify.aws/lib/datastore/conflict/q/platform/js#example).

You can utilize selective sync to have DataStore persist a subset of your data instead.

Selective sync works by applying predicates to the base and delta sync queries, as well as to incoming subscriptions.

```js
import { DataStore, syncExpression } from 'aws-amplify';
import { Post, Comment } from './models';

DataStore.configure({
  syncExpressions: [
    syncExpression(Post, () => {
      return (c) => c.rating('gt', 5);
    }),
    syncExpression(Comment, () => {
      return (c) => c.status('eq', 'active');
    }),
  ]
});
```

When DataStore starts syncing, only Posts with `rating > 5` and Comments with `status === 'active'` will be synced down to the user's local store.

<amplify-callout>

Developers should only specify a single `syncExpression` per model. Any subsequent expressions for the same model will be ignored.

</amplify-callout>

### Reevaluate expressions at runtime
Sync expressions get evaluated whenever DataStore starts.
In order to have your expressions reevaluated, you can execute `DataStore.clear()` or `DataStore.stop()` followed by `DataStore.start()`.

If you have the following expression and you want to change the filter that gets applied at runtime, you can do the following:
```js
let rating = 5;

DataStore.configure({
  syncExpressions: [
    syncExpression(Post, () => {
      return (c) => c.rating('gt', rating));
    })
  ]
});

async function changeSync() {
  rating = 1;
  await DataStore.stop();
  await DataStore.start();
}
```

Upon calling `DataStore.start()` (or executing a DataStore operation, e.g., `query`, `save`, `delete`, or `observe`), DataStore will reevaluate the `syncExpressions`. 

In the above case, the predicate will contain the value `1`, so all Posts with `rating > 1` will get synced down.

Keep in mind that the existing contents of the local store is _retained_ when calling `DataStore.stop()`.

<amplify-callout>

If you're applying a more restrictive filter and would therefore like to clear the local records, use `DataStore.clear()` instead:

</amplify-callout>

```js
async function changeSync() {
  rating = 8;
  await DataStore.clear();
  await DataStore.start();
}
```
This will clear the contents of your local store, reevaluate your sync expressions and re-sync the data from the cloud, applying all of the specified predicates to the sync queries.

You can also have your sync expression return `Predicates.ALL` in order to remove any filtering for that model. This will have the same effect as the default sync behavior.

```js
let rating = null;

DataStore.configure({
  syncExpressions: [
    syncExpression(Post, () => {
      if (rating) {
        return (c) => c.rating('gt', rating));
      }

      return Predicates.ALL;
    })
  ]
});
```
<amplify-callout warning>

`DataStore.configure` should only by called once at the root of your file.

</amplify-callout>

### Async expressions
You can pass a Promise to `syncExpression`:
```js
DataStore.configure({
  syncExpressions: [
    syncExpression(Post, async () => {
      const ratingValue = await getRatingValue();
      return (c) => c.rating('gt', ratingValue);
    })
  ]
});
```
DataStore will wait for the Promise to resolve before applying the expression to the sync. Async expressions can also be reevaluated at runtime, just like synchronous expressions (see previous section). 

### Shorthand
If you don't need to add any logic to your `syncExpression`, you can use the following shorthand, returning the predicate directly:
```js
DataStore.configure({
  syncExpressions: [
    syncExpression(Post, (c) => c.rating('gt', 5))
  ]
});
```

### Advanced use case - Query instead of Scan
You can utilize selective sync in order to have your base sync retrieve items from DynamoDB by performing a [query operation](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Query.html) against a GSI. By default, the base sync will perform a scan.

In order to do that, your `syncExpression` should return a predicate that maps to a query expression.

For example, for the following schema:
```graphql
type User @model
  @key(name: "byLastName", fields: ["lastName", "createdAt"]) {
  id: ID!
  firstName: String!
  lastName: String!
  createdAt: AWSDateTime!
}
```

Either of these sync expressions will result in AWS AppSync retrieving records from Amazon DynamoDB via a query operation:

```js
DataStore.configure({
  syncExpressions: [
    syncExpression(User, () => {
      const lastName = await getLastNameForSync();
      return (c) => c.lastName('eq', lastName)
    })
  ]
});

// OR

DataStore.configure({
  syncExpressions: [
    syncExpression(User, () => {
      const lastName = await getLastNameForSync();
      return (c) => c.lastName('eq', lastName).createdAt('gt', '2020-10-10')
    })
  ]
});
```

In order to construct a query expression, you will need to return a predicate with the primary key of the GSI. You can only use the `eq` operator with this predicate.

For the schema defined above `(c) => c.lastName('eq', 'Bobby')` is a valid query expression.

Optionally, you can also chain the sort key to this expression, using any of the following operators: `eq | ne | le | lt | ge | gt | beginsWith | between`. 

E.g., `(c) => c.lastName('eq', 'Bobby').createdAt('gt', '2020-10-10')`.
