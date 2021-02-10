### Data requirements

For this app, we have the following requirements:

1. A list of todos
2. Ability to create/update/delete a todo

### Model the data with the GraphQL Transform

Given these requirements, we'll need to be able to query the API for a list of todos and also provide a way to send updates to the API to create, update, and delete todos. In GraphQL we would use a `type` to define that entity, like so:

```graphql
type Todo {
  id: ID!
  name: String!
  description: String
}
```

Because we're using Amplify, we can use the GraphQL Schema Definition Language (SDL) and custom Amplify directives to define our backend requirements for our API. The GraphQL Transform library then converts your SDL definition into a set of fully descriptive AWS CloudFormation templates that implement your data model.

```graphql
type Todo @model {
  id: ID!
  name: String!
  description: String
}
```

The `@model` directive lets Amplify know we intend for this type to have data that needs to be stored. This will create a DynamoDB table for us and make all GraphQL operations available in the API.

## Create GraphQL API and database

Now that the data is modeled, it's time to create the GraphQL API. From the root of the project, run the following:

```bash
amplify add api
```

Select the default values which are highlighted below:

```console
? Please select from one of the below mentioned services:
# GraphQL
? Provide API name:
# myapi
? Choose the default authorization type for the API:
# API Key
? Enter a description for the API key:
# demo
? After how many days from now the API key should expire:
# 7 (or your preferred expiration)
? Do you want to configure advanced settings for the GraphQL API:
# No
? Do you have an annotated GraphQL schema?
# No
? Choose a schema template:
# Single object with fields (e.g., “Todo” with ID, name, description)
? Do you want to edit the schema now?
# Yes
```

The CLI should open this GraphQL schema in your text editor.

__amplify/backend/api/myapi/schema.graphql__

```graphql
type Todo @model {
  id: ID!
  name: String!
  description: String
}
```

The schema generated is for a Todo app. You'll notice a directive on the `Todo` type of `@model`. This directive is part of the [GraphQL transform](~/cli/graphql-transformer/model.md) library of Amplify. 

The GraphQL Transform Library provides custom directives you can use in your schema that allow you to do things like define data models, set up authentication and authorization rules, configure serverless functions as resolvers, and more.

A type decorated with the `@model` directive will scaffold out the database table for the type (Todo table), the schema for CRUD (create, read, update, delete) and list operations, and the GraphQL resolvers needed to make everything work together.

From the command line, press __enter__ to accept the schema and continue to the next steps.

## Deploy your GraphQL API

Now that the API has been successfully created. We need to push our updated configuration to the cloud so our API can be deployed:

```bash
amplify push
```

## Generate frontend code for the GraphQL API

When you run `amplify push`, you will be have the option to have all the GraphQL operations found in your schema generated for you in code. Choose the following options:

```console
Do you want to generate code for your newly created GraphQL API (Yes)
Choose the code generation language target (javascript)
Enter the file name pattern of graphql queries, mutations and subscriptions (src/graphql/**/*.js)
Do you want to generate/update all possible GraphQL operations - queries, mutations and subscriptions (Yes)
Enter maximum statement depth [increase from default if your schema is deeply nested] (2)
```

Next, run the following command to check Amplify's status:

```bash
amplify status
```

This will give us the current status of the Amplify project, including the current environment, any categories that have been created, and what state those categories are in. It should look similar to this:

```console
Current Environment: dev

| Category | Resource name | Operation | Provider plugin   |
| -------- | ------------- | --------- | ----------------- |
| Api      | myapi         | No Change | awscloudformation |
```

### Testing your API

To view services deployed in your project at any time in the AWS Amplify Console, run the following command.

```bash
amplify console
```

This will open your Amplify app project in the AWS service console. Choose the **API** tab to view your AppSync API. Clicking on the API, will open the AWS AppSync console where you can run Queries, Mutations, or Subscriptions at the server and see the changes in your client app.

## Connect frontend to API

Next, open __App.vue__.

### Writing data with GraphQL mutations

To create a new todo in the database, use the `API.graphql()` operation with the `createTodo` mutation and pass in the data you'd like to write.

```html
<template>
  <div id="app">
    <h1>Todo App</h1>
    <input type="text" v-model="name" placeholder="Todo name">
    <input type="text" v-model="description" placeholder="Todo description">
    <button v-on:click="createTodo">Create Todo</button>
  </div>
</template>

<script>
import { API } from 'aws-amplify';
import { createTodo } from './graphql/mutations';

export default {
  name: 'app',
  data() {
    return {
      name: '',
      description: ''
    }
  },
  methods: {
    async createTodo() {
      const { name, description } = this;
      if (!name || !description) return;
      const todo = { name, description };
      await API.graphql({
        query: createTodo,
        variables: {input: todo},
      });
      this.name = '';
      this.description = '';
    }
  }
};
</script>
```

### Reading data with GraphQL queries

To display the data, update `App.vue` to list all the items in the database by importing `listTodos` and then using the `created()` Vue lifecycle method to update the page when a query runs on page load:

```html
<template>
  <div id="app">
    <h1>Todo App</h1>
    <input type="text" v-model="name" placeholder="Todo name">
    <input type="text" v-model="description" placeholder="Todo description">
    <button v-on:click="createTodo">Create Todo</button>
    <div v-for="item in todos" :key="item.id">
      <h3>{{ item.name }}</h3>
      <p>{{ item.description }}</p>
    </div>
  </div>
</template>

<script>
import { API } from 'aws-amplify';
import { createTodo } from './graphql/mutations';
import { listTodos } from './graphql/queries';

export default {
  name: 'App',
  async created() {
    this.getTodos();
  },
  data() {
    return {
      name: '',
      description: '',
      todos: []
    }
  },
  methods: {
    async createTodo() {
      const { name, description } = this;
      if (!name || !description) return;
      const todo = { name, description };
      this.todos = [...this.todos, todo];
      await API.graphql({
        query: createTodo,
        variables: {input: todo},
      });
      this.name = '';
      this.description = '';
    },
    async getTodos() {
      const todos = await API.graphql({
        query: listTodos
      });
      this.todos = todos.data.listTodos.items;
    }
  }
}
</script>
```

### Real-time data with GraphQL subscriptions

Now if you wish to subscribe to data, import the `onCreateTodo` subscription and create a new subscription by adding subscription with `API.graphql()` like so:

```html
<script>
// other imports
import { onCreateTodo } from './graphql/subscriptions';

export default {
  // other functions and properties
  created(){
    this.getTodos();
    this.subscribe();
  },
  methods: {
    // other methods
    subscribe() {
      API.graphql({ query: onCreateTodo })
        .subscribe({
          next: (eventData) => {
            let todo = eventData.value.data.onCreateTodo;
            if (this.todos.some(item => item.name === todo.name)) return; // remove duplications
            this.todos = [...this.todos, todo];
          }
        });
    }
  }
};
</script>
```
