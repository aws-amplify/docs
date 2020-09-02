
## Update the schema

Edit the schema and re-run `amplify codegen models`.

```graphql
enum PostStatus {
  ACTIVE
  INACTIVE
  STAGED # new enum value
}

type Post @model {
  id: ID!
  title: String!
  rating: Int!
  status: PostStatus!
}
```

This will evaluate the changes and create a versioned hash if any changes are detected which impact the underlying on-device storage structure. For example, types being added/deleted or fields becoming required/optional. DataStore evaluates this version on startup and if there are changes the **local items on device will be removed and a full sync from AppSync will take place** if you are syncing with the cloud.

## Local migrations

Local migrations (i.e. migrations controlled by the developer) on device are not currently supported. Therefore, your local data will be lost when the schema changes.

If you are syncing with the cloud the structure and items of that **data in your AppSync backend will not be touched** as part of this process.

<amplify-callout warning>

**Troubleshooting:** due to a limitation in DynamoDB, you can only add one `@key` at a time. Make sure you run `amplify push` in between changes when cloud sync is enabled.

</amplify-callout>
