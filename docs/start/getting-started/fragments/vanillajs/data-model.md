Now that you’ve created and configured the web app and initialized a new Amplify project, you can add a feature. The first feature you will add is an API.

The Amplify CLI supports creating and interacting with two types of API categories: REST and GraphQL.

The API you will be creating in this step is a GraphQL API using AWS AppSync (a managed GraphQL service) and the database will be Amazon DynamoDB (a NoSQL database).

## Create GraphQL API and database

Add a [GraphQL API](https://docs.aws.amazon.com/appsync/latest/devguide/designing-a-graphql-api.html) to your app and automatically provision a database by running the the following command from the root of your application directory:

```bash
amplify add api # accept defaults
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

The schema generated is for a Todo app. You'll notice a directive on the `Todo` type of `@model`. This directive is part of the [GraphQL transform](~/cli/graphql-transformer/directives.md) library of Amplify. 

The GraphQL Transform Library provides custom directives you can use in your schema that allow you to do things like define data models, set up authentication and authorization rules, configure serverless functions as resolvers, and more.

A type decorated with the `@model` directive will scaffold out the database table for the type (Todo table), the schema for CRUD (create, read, update, delete) and list operations, and the GraphQL resolvers needed to make everything work together.

From the command line, press __enter__ to accept the schema and continue to the next steps.

## Deploy your GraphQL API

Now that the API has been successfully created. We need to push our updated configuration to the cloud so our API can be deployed:

```bash
amplify push
```

## Generate code for the GraphQL API

When you run `amplify push`, you will be presented with the option to have all the GraphQL operations found in your schema generated for you in code. Choose the following options:

```bash
? Do you want to generate code for your newly created GraphQL API (Yes)
? Choose the code generation language target (javascript)
? Enter the file name pattern of graphql queries, mutations and subscriptions (src/graphql/**/*.js)
? Do you want to generate/update all possible GraphQL operations - queries, mutations and subscriptions (Yes)
? Enter maximum statement depth [increase from default if your schema is deeply nested] (2)
```

Next, run the following command to check Amplify's status:

```bash
amplify status
```

This will give us the current status of the Amplify project, including the current environment, any categories that have been created, and what state those categories are in. It should look similar to this:

```bash
Current Environment: dev

| Category | Resource name | Operation | Provider plugin   |
| -------- | ------------- | --------- | ----------------- |
| Api      | myapi         | No Change | awscloudformation |
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
