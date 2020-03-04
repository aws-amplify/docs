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

Now that the data is modeled, it's time to create the GraphQL API. From the root of the project, runthe following:

```bash
$ amplify add api
```

You'll be prompted for some information so that Amplify can create the right infrastructure to support your API. For each question, choose the options listed below:

```bash
# Amplify supports both REST and GraphQL APIs
Please select from one of the below mentioned services (GraphQL)

Provide API name (todo)

# API_KEY is an authorization mechanism for your API
Choose an authorization type for the API (API_KEY)

# Because we use a schema to create the backend you can share these schemas and use them as boilerplates
Do you have an annotated GraphQL schema (No)

# Since we don't have a schema we want a guided creation
Do you want a guided schema creation (Yes)

# We only have one data type so we don't need to handle any data relationships
What best describes your project (Single object with fields (e.g., “Todo” with ID, name, description))

# This option will open a `schema.graphql` file in our editor
# The TODO example will already be pre-populated
# Save the file and then come back to the terminal
Do you want to edit the schema now (Yes)

# Once you have updated the schema.graphql file and saved it, press enter
Press enter to continue
```

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