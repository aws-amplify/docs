## Querying from a JavaScript application

To pass in a `limit` in a query from a JavaScript application, you can use the following code:

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

To set the `nextToken` in a query from a JavaScript application, you can use the following code:

```js
import { API } from 'aws-amplify';

async function fetchTodos() {
  const todoData = await API.graphql({
    query: listTodos,
    variables: {
      limit: 2,
      nextToken: <your_token>
    }
  })
  console.log({ todoData })
}
```