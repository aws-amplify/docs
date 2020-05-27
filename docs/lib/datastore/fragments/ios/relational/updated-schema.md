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
  comments: [Comment] @connection(name: "PostComments")
}

# New model
type Comment @model {
  id: ID!
  content: String
  post: Post @connection(name: "PostComments")
}
```