### Data requirements

For this app, we have the following requirements:

1. A list of todos
2. Ability to create/update/delete a todo

### Model the data with the GraphQL Transform

Given these requirements, we'll need to be able to display a list of photos and upload photos, meaning there will definitely be a Photo entity in the app. In GraphQL we would use a `type` to define that entity, like so:

```graphql
type Todo {
  id: ID!
  name: String!
  description: String!
}
```

Because we're using Amplify, we can use the GraphQL Schema Definition Language (SDL) and custom Amplify directives to define our backend requirements for our API. The GraphQL Transform library then converts your SDL definition into a set of fully descriptive AWS CloudFormation templates that implement your data model.

```graphql
type Todo {
  id: ID!
  name: String!
  description: String!
}
```

The `@model` directive let's Amplify know we intend for this type to have data that needs to be stored. This will create a DynamoDB table for us and make all GraphQL operations available in the API.

## Create GraphQL API and database

Now that the data is modeled, it's time to create the GraphQL API. From the root of the project, run the following:

```bash
amplify add api #accept defaults
```

The default values are highlighted below.
```bash
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
? Do you want a guided schema creation? 
# Yes
? What best describes your project: 
# Single object with fields
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

The schema generated is for a Todo app. You'll notice a directive on the `Todo` type of `@model`. This directive is part of the [GraphQL transform](/cli/graphql-transformer/directives) library of Amplify. 

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

```bash
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

```bash
Current Environment: dev

| Category | Resource name | Operation | Provider plugin |
| -------- | ------------- | --------- | --------------- |
```

### Testing your API

To view services deployed in your project at any time in the AWS Amplify Console, run the following command.

```sh
$ amplify console
```

This will open your Amplify app project in the AWS service console. Choose the **API** tab to view your AppSync API. Clicking on the API, will ppen the AWS AppSync console where you can run Queries, Mutations, or Subscriptions at the server and see the changes in your client app.

## Integrate into your app

Update your `main.js` file to configure the library with `Amplify.configure()` like so:

```javascript
import Vue from 'vue'
import App from './App.vue'

import API from '@aws-amplify/api';
import PubSub from '@aws-amplify/pubsub';
import awsconfig from './aws-exports';
API.configure(awsconfig);
PubSub.configure(awsconfig);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
```

Next, open `App.vue` add data to your database with a mutation by using `API.graphql()`:

```html
<template>
  <div id="app">
    <button @click="createNewTodo">Add Todo</button>
  </div>
</template>

<script>
import API, {  graphqlOperation } from '@aws-amplify/api';
// eslint-disable-next-line
import { createTodo } from "./graphql/mutations";

export default {
  name: 'app',
  methods :{
    async createNewTodo(){
      const todo = { name: "Use AppSync" , description: "Realtime and Offline"}
      await API.graphql(graphqlOperation(createTodo, { input: todo }))
    }
  }
};
</script>
```

To display the data, update `App.vue` to list all the items in the database by importing `listTodos` and then using the `created()` Vue lifecycle method to update the page when a query runs on page load:

```html
<template>
  <div id="app">
    <button @click="createNewTodo">Add Todo</button>
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        {% raw %}{{todo.name}}{% endraw %} - {% raw %}{{todo.description}}{% endraw %}
      </li>
    </ul>
  </div>
</template>

<script>
// other imports
import { listTodos } from './graphql/queries'

export default {
  name: 'app',
  data(){
    return {
      todos: []
    }
  },
  methods :{
    async createNewTodo(){ /* code above */}, 
    async getData(){
      const todoData = await API.graphql(graphqlOperation(listTodos))
      this.todos.push(...this.todos, ...todoData.data.listTodos.items);
    }
  },
  created(){
    this.getData()
  }
};

</script>
```

Now if you wish to subscribe to data, import the `onCreateTodo` subscription and create a new subscription by adding subscription with `API.graphql()` like so:

```html
<script>
// other imports
import { onCreateTodo } from './graphql/subscriptions'

export default {
  name: 'app',
  data(){
    return {
      todos: []
    }
  },
  methods :{
    async createNewTodo(){  /* code above */ }, 
    async getData(){  /* code above */ },
    subscribe(){
      API.graphql(graphqlOperation(onCreateTodo)).subscribe({
        next: (eventData) => {
          const todo = eventData.value.data.onCreateTodo;
          this.todos.push(todo);
        }
      })
    }
  },
  created(){
    this.getData()
    this.subscribe()
  }
};
</script>
```

> The code above imports only the API and PubSub category. To import the entire Amplify library use `import Amplify from 'aws-amplify'`. However, importing only the required categories is recommended as it will greatly reduce the final bundle size.