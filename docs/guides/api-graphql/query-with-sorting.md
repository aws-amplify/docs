---
title: GraphQL query with sorting
description: How to implement sorting in a GraphQL query
---

In this guide you will learn how to implement sorting in a GraphQL API using the GraphQL transform library.

### Overview

To get started, let's start with a basic GraphQL schema for a Todo app:

```graphql
type Todo @model {
  id: ID!
  title: String!
}
```

When the API is created with an `@model` directive, the following queries will automatically be created for you:

```graphql
type Query {
  getTodo(id: ID!): Todo
  listTodos(filter: ModelTodoFilterInput, limit: Int, nextToken: String): ModelTodoConnection
}
```

Next, take a look at the `ModelTodoConnection` type to get an idea of the data that will be returned when the `listTodos` query is run:

```graphql
type ModelTodoConnection {
  items: [Todo]
  nextToken: String
}
```

By default, the `listTodos` query will return the `items` array __unordered__. Many times you will need these items to be ordered by title, by creation date, or in some other way.

To enable this, you can use the [@key](~/cli/graphql-transformer/key.md) directive. This directive will allow you to set a custom `sortKey` on any field in your API.

### Implementation

In this example, you will enable sorting by the `createdAt` field. By default, Amplify will populate this `createdAt` field with a timestamp if none is passed in.

To enable this, update your schema with the following:

```graphql
type Todo @model
  @key(name: "todosByDate", fields: ["type", "createdAt"], queryField: "todosByDate") {
  id: ID!
  title: String!
  type: String!
  createdAt: String!
}
```

<amplify-callout>

When created a Todo, you must now populate the `type` field for this to work properly.

</amplify-callout>

Next, create a few todos being sure to populate the `type` field:

```graphql
mutation createTodo {
  createTodo(input: {
    title: "Todo 1"
    type: "Todo"
  }) {
    id
    title
  }
}
```

Now, you can query for todos by date in an ascending or descending order using the new `todosByDate` query:

```graphql
query todosByDate {
  todosByDate(
    type: "Todo"
    sortDirection: ASC
  ) {
    items {
      id
      title
      createdAt
    }
  }
}

query todosByDateDescending {
  todosByDate(
    type: "Todo"
    sortDirection: DESC
  ) {
    items {
      id
      title
      createdAt
    }
  }
}
```

To learn more about the `@key` directive, check out the documentation [here](~/cli/graphql-transformer/key.md)
