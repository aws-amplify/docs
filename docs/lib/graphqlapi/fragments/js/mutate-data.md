## Using Amplify GraphQL client

### Mutations

Mutations are used to create or update data with GraphQL. A sample mutation query to create a new *Todo* looks like this:

```javascript
import Amplify, { API, graphqlOperation } from "aws-amplify";
import * as mutations from './graphql/mutations';

// Mutation
const todoDetails = {
    name: 'Todo 1',
    description: 'Learn AWS AppSync'
};

const newTodo = await API.graphql(graphqlOperation(mutations.createTodo, {input: todoDetails}));
console.log(newTodo);
```

## Using AWS AppSync SDK 

To add data you need to run a GraphQL mutation. The syntax is `client.mutate({ mutation:MUTATION, variables: vars})` which like a query returns a `Promise`. The `MUTATION` is a GraphQL document you can write yourself use use the statements which `amplify codegen` created automatically. `variables` are an optional object if the mutation requires arguments. For example, if you have a `createTodo` mutation, your code will look like the following (using `async/await` in this example):

```javascript
import { createTodo } from './graphql/mutations';

(async () => {
  const result = await client.mutate({
    mutation: gql(createTodo),
    variables: {
      input: {
        name: 'Use AppSync',
        description: 'Realtime and Offline',
      }
    }
  });
  console.log(result.data.createTodo);
})();
```