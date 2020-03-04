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

## Generate code for the GraphQL API

When you run `amplify push`, you will be have the option to have all the GraphQL operations found in your schema generated for you in code. Choose the following options:

```bash
Do you want to generate code for your newly created GraphQL API (Yes)

Choose the code generation language target (javascript)

Enter the file name pattern of graphql queries, mutations and subscriptions (src/graphql/**/*.js)

Do you want to generate/update all possible GraphQL operations - queries, mutations and subscriptions (Yes)

Enter maximum statement depth [increase from default if your schema is deeply nested] (2)
```

### Testing your API

You can open the AWS console to run Queries, Mutation, or Subscription against you new API at any time directly by running the following command:

```bash
$ amplify console api
> GraphQL               ##Select GraphQL
```

This will open the AWS AppSync console for you to run Queries, Mutations, or Subscriptions at the server and see the changes in your client app.

## Connect frontend to API

Update your `src/app.js` file to configure the library with `Amplify.configure()` and add data to your database with a mutation by using `API.graphql()`:

```javascript
import API, { graphqlOperation } from '@aws-amplify/api'
import PubSub from '@aws-amplify/pubsub';
import { createTodo } from './graphql/mutations'

import awsconfig from './aws-exports';
API.configure(awsconfig);
PubSub.configure(awsconfig);

async function createNewTodo() {
  const todo = { name: "Use AppSync" , description: "Realtime and Offline"}
  return await API.graphql(graphqlOperation(createTodo, { input: todo }))
}

const MutationButton = document.getElementById('MutationEventButton');
const MutationResult = document.getElementById('MutationResult');

MutationButton.addEventListener('click', (evt) => {
  MutationResult.innerHTML = `MUTATION RESULTS:`;
  createNewTodo().then( (evt) => {
    MutationResult.innerHTML += `<p>${evt.data.createTodo.name} - ${evt.data.createTodo.description}</p>`
  })
});
```

After restarting your app using `npm start` go back to your browser and click **ADD DATA**.  You'll see that your application is now submitting events to AppSync and storing records in DynamoDB. Next, update `src/app.js` to list all the items in the database by importing `listTodos` and update the page when a query runs on app start by immediately calling the function:

```javascript
// other imports
import { listTodos } from './graphql/queries'

const QueryResult = document.getElementById('QueryResult');

async function getData() {
  QueryResult.innerHTML = `QUERY RESULTS`;
  API.graphql(graphqlOperation(listTodos)).then((evt) => {
    evt.data.listTodos.items.map((todo, i) => 
    QueryResult.innerHTML += `<p>${todo.name} - ${todo.description}</p>`
    );
  })
}

getData();
```

Now if you wish to subscribe to data, import the `onCreateTodo` subscription and create a new subscription by adding subscription with `API.graphql()` like so:

```javascript
// other imports
import { onCreateTodo } from './graphql/subscriptions'

const SubscriptionResult = document.getElementById('SubscriptionResult');

API.graphql(graphqlOperation(onCreateTodo)).subscribe({
  next: (evt) =>{
    SubscriptionResult.innerHTML = `SUBSCRIPTION RESULTS`
    const todo = evt.value.data.onCreateTodo;
    SubscriptionResult.innerHTML += `<p>${todo.name} - ${todo.description}</p>`
  }
});
```

> The code above imports only the API and PubSub category. To import the entire Amplify library use `import Amplify from 'aws-amplify'`. However, importing only the required categories is recommended as it will greatly reduce the final bundle size.

After restarting your app using `npm start` go back to your browser and using dev tools you will see data being stored and retrieved in your backend from the console logs.