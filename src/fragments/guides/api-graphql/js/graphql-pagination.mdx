## Querying from a JavaScript application

The `listTodos` query should have been created for you automatically by the CLI, but for reference purposes it should look something like this:

```js
const listTodos = `
  query listTodos($limit: Int) {
    listTodos(limit: $limit) {
      items {
        id
        title
        description
      }
      nextToken
    }
  }
`
```

To pass in a `limit` in a query from a JavaScript application, you can use the following code by setting the limit as a variable:

```js
import { API } from 'aws-amplify';

async function fetchTodos() {
  const todoData = await API.graphql({
    query: listTodos,
    variables: {
      limit: 2
    }
  })
  console.log({ todoData })
}
```

The data returned from the API request should look like this (with the items array containing however many items have been created):

```graphql
{
  "data" {
    "listTodos" {
      "items": [{ id: "001", title: "Todo 1", description: "My first todo" }],
      "nextToken": "<token-id>"
    }
  }
}
```

To set the `nextToken` in a query from a JavaScript application, you can use the following code:

```js
import { API } from 'aws-amplify';

async function fetchTodos() {
  const todoData = await API.graphql({
    query: listTodos,
    variables: {
      limit: 2,
      nextToken: "<token-id>"
    }
  })
  console.log({ todoData })
}
```