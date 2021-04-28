You can open query explorer in the AWS Console directly from the command line.

```
amplify console api

? Please select from one of the below mentioned services:
    `GraphQL`
```

#### Inspect data

Paste the following query into the left pane of the explorer and press the **play button** to run the query. If you have added todos from your app, you should see them show up as part of the query results!

```graphql
query MyQuery {
  listTodos {
    items {
      id
      name
      description
      isComplete
      _deleted
    }
  }
}
```

#### Create data

Synchronization is bi-directional. Try creating a Todo entry in by pasting the following mutation into the left pane of the explorer and pressing the **play button** to run the mutation.

```graphql
mutation MyMutation {
  createTodo(input: {
    name: "Sync app to cloud",
    description: "This was created remotely!",
    isComplete: false
  }) {
    id
    name
    description
    isComplete
    _lastChangedAt
    _version
  }
}
```
