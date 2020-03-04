a. Switch to **Project** view in Android Studio and open the schema file at `amplify/backend/api/amplifyDatasource/schema.graphql`.  
[Learn more](https://aws-amplify.github.io/docs/cli-toolchain/graphql) about annotating GraphQL schemas and data modeling.

In this guide, use the default schema included:

```
type Task @model {
    id: ID!
    title: String!
    description: String
    status: String
}
type Note @model {
    id: ID!
    content: String!
}
```

b. To generate the Java classes for these models, click the Gradle Task dropdown in the toolbar and select **modelgen** and run the task. Once it completes you should have generated Java classes under `app/src/main/java/com/amplifyframework.datastore.generated.model`.
