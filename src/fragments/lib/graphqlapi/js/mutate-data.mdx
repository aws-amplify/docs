## Using Amplify GraphQL client

### Mutations

In GraphQL, mutations are used to create, update, or delete data. Here are some examples of creating, updating, and deleting items using the Amplify GraphQL client.

#### Creating an item

```javascript
import { API } from "aws-amplify";
import * as mutations from './graphql/mutations';

const todoDetails = {
  name: 'Todo 1',
  description: 'Learn AWS AppSync'
};

const newTodo = await API.graphql({ query: mutations.createTodo, variables: {input: todoDetails}});
```

You do not have to pass in `createdAt` and `updatedAt` fields, AppSync manages this for you.

You can optionally import the `graphqlOperation` helper function to help you construct the argument object:

```javascript
import { API, graphqlOperation } from 'aws-amplify';
// ...
const newTodo = await API.graphql(graphqlOperation(mutations.createTodo, {input: todoDetails})); // equivalent to above example
```

#### Updating an item

```javascript
import { API } from "aws-amplify";
import * as mutations from './graphql/mutations';

const todoDetails = {
  id: 'some_id',
  description: 'My updated description!'
};

const updatedTodo = await API.graphql({ query: mutations.updateTodo, variables: {input: todoDetails}});
```

Notes:

- You do not have to pass in `createdAt` and `updatedAt` fields, AppSync manages this for you.
- If you pass in *extra* input fields not expected by the AppSync schema, this query will fail. You can see this in the `error` field returned by the query (the query itself does not throw, per GraphQL design).

#### Deleting an item

```javascript
import { API } from "aws-amplify";
import * as mutations from './graphql/mutations';

const todoDetails = {
  id: 'some_id',
};

const deletedTodo = await API.graphql({ query: mutations.deleteTodo, variables: {input: todoDetails}});
```

Only an `id` is needed.

### Custom authorization mode

By default, each AppSync API will be set with a default authorization mode when you configure your app. If you would like to override the default authorization mode, you can do so by passing in an `authMode` property.

#### Mutation with custom authorization mode

```js
import { API } from "aws-amplify";
import * as mutations from './graphql/mutations';

const todoDetails = {
  id: 'some_id',
  name: 'My todo!',
  description: 'Hello world!'
};

const todo = await API.graphql({
  query: mutations.createTodo,
  variables: {input: todoDetails},
  authMode: 'AWS_IAM'
});
```

## Using AWS AppSync SDK 

To add data you need to run a GraphQL mutation. The syntax is `client.mutate({ mutation:MUTATION, variables: vars})` which like a query returns a `Promise`. The `MUTATION` is a GraphQL document you can write yourself or use the statements which `amplify codegen` created automatically. `variables` are an optional object if the mutation requires arguments. For example, if you have a `createTodo` mutation, your code will look like the following (using `async/await` in this example):

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
