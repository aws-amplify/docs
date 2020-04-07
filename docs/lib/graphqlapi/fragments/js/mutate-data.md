## Using Amplify GraphQL client

### Mutations

In GraphQL, mutations are used to create, update, or delete data. Here are some examples of creating, updating, and deleting items using the Amplify GraphQL client.

#### Creating an item

```javascript
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from './graphql/mutations';

const todoDetails = {
  name: 'Todo 1',
  description: 'Learn AWS AppSync'
};

const newTodo = await API.graphql(graphqlOperation(mutations.createTodo, {input: todoDetails}));
```

#### Updating an item

```javascript
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from './graphql/mutations';

const todoDetails = {
  id: 'some_id',
  description: 'My updated description!'
};

const updatedTodo = await API.graphql(graphqlOperation(mutations.updateTodo, {input: todoDetails}));
```

#### Deleting an item

```javascript
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from './graphql/mutations';

const todoDetails = {
  id: 'some_id',
};

const deletedTodo = await API.graphql(graphqlOperation(mutations.deleteTodo, {input: todoDetails}));
```

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
  query: queries.createTodo,
  variables: {input: todoDetails},
  authMode: 'AWS_IAM'
});
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