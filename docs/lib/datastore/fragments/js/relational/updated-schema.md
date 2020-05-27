For the examples below with DataStore let's add a new model to the [sample schema](~/lib/datastore/getting-started.md#sample-schema):

```graphql
enum PostStatus {
  ACTIVE
  INACTIVE
}

type Post @model {
  id: ID!
  title: String!
  rating: Int!
  status: PostStatus!
  # New field with @connection
  comments: [Comment] @connection(keyName: "byPost", fields: ["id"])
}

# New model
type Comment @model
  @key(name: "byPost", fields: ["postID", "content"]) {
  id: ID!
  postID: ID!
  content: String!
}
```