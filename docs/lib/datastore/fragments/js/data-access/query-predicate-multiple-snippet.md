When using multiple conditions, there is an implicit `and` defined to mirror the [GraphQL Transform condition statements](~/cli/graphql-transformer/resolvers.md). For example with multiple conditions:

```js
const posts = await DataStore.query(Post, c =>
  c.rating("gt", 4).status("eq", PostStatus.PUBLISHED)
);
```
