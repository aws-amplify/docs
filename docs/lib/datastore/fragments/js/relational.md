DataStore has the capability to handle relationships between Models, such as `Has One`, `Has Many`, `Belongs To`, and `Many To Many`. In GraphQL this is done with `@connection` as defined in the [GraphQL Transformer documentation](https://aws-amplify.github.io/docs/cli-toolchain/graphql#connection){:target="_blank"}. For the examples below with DataStore use the following schema:

```graphql
enum PostStatus {
  ACTIVE
  INACTIVE
}

type Post @model {
  id: ID!
  title: String!
  comments: [Comment] @connection(name: "PostComments")
  rating: Int!
  status: PostStatus!
}
type Comment @model {
  id: ID!
  content: String
  post: Post @connection(name: "PostComments")
}
```

## Saving relations

In order to save connected models you will create an instance of the model you wish to connect and pass it to `DataStore.save` with the parent as an argument (`post` in the below example):

```javascript
const post =  await DataStore.save(
    new Post({
      title: `My Post with comments`,
      rating: 10,
      status: PostStatus.ACTIVE
    })
  );

await DataStore.save(
  new Comment({
    content: "Loving Amplify DataStore!",
    post
  })
);
```

The above example shows how to use a one-to-many schema and save connected models. For many-to-many relations, such as the one shows in the [GraphQL Transformer examples](https://aws-amplify.github.io/docs/cli-toolchain/graphql#connection) you would do something like the following:

```javascript
const post =  await DataStore.save(
  new Post({
    title: `My first post`,
  })
);

const editor =  await DataStore.save(
  new User({
    username: `Nadia`,
  })
);

await DataStore.save(
  new PostEditor({
    post,
    editor
  })
);
```

In this case, you save instances of models from each side of the relationship and then join them together in the connecting type on a field defined with `@connection`. For the schema above this corresponds to `post: Post! @connection(fields: ["postID"])` and `editor: User! @connection(fields: ["editorID"])`.

## Querying relations

```javascript
const comments = (await DataStore.query(Comment)).filter(c => c.post.id === "123");
```
Alternatively:
```javascript
const post = await DataStore.query(Post, "123");
const comments = (await DataStore.query(Comment)).filter(c => c.post.id === post.id);
```

## Observing relations

```javascript
const subscription = DataStore.observe(Comment)
  .subscribe(msg => {
    if(c.post.id === "123") {
      console.log(msg.model, msg.opType, msg.element);
    }
  });
```

## Deleting relations

When you delete a parent object in a one to many relationship, the children will also be removed from the DataStore and mutations for this deletion will be sent over the network. For example the following operation would remove the Post with id *123* as well as any related comments:

```javascript
const todelete = await DataStore.query(Post, "123");
DataStore.delete(todelete);
```
However, in a many to many relationship the children are not removed and you must explicitly delete them.
