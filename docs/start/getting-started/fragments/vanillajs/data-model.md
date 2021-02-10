Now that you’ve initialized a new Amplify project, you can add a feature. The first feature you will add is an API. An API will allow you to save and read data to and from the cloud.

The Amplify CLI supports creating and interacting with two types of API categories: [REST](~/lib/restapi/getting-started.md) and [GraphQL](~/lib/graphqlapi/getting-started.md).

The API you will be creating in this step is a GraphQL API using AWS AppSync (a managed GraphQL service) and the database will be Amazon DynamoDB (a NoSQL database).

## Create GraphQL API and database

Add a [GraphQL API](https://docs.aws.amazon.com/appsync/latest/devguide/designing-a-graphql-api.html) to your app and automatically provision a database by running the following command from the root of your application directory:

```bash
amplify add api
```

Accept the **default values** which are highlighted below:

```console
? Please select from one of the below mentioned services:
# GraphQL
? Provide API name:
# amplifyjsapp
? Choose the default authorization type for the API:
# API Key
? Enter a description for the API key:
# todos
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

__amplify/backend/api/amplifyjsapp/schema.graphql__

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

## Generate code for the GraphQL API

When you run `amplify push`, you will be presented with the option to have all the GraphQL operations found in your schema generated for you in code. Choose the following options:

```console
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

```console
Current Environment: dev

| Category | Resource name | Operation | Provider plugin   |
| -------- | ------------- | --------- | ----------------- |
| Api      | amplifyjsapp  | No Change | awscloudformation |

GraphQL endpoint: https://•••••••••••.appsync-api.us-east-1.amazonaws.com/graphql
GraphQL API KEY: ••••••••••
```

### Testing your API

You can open the AWS console to run Queries, Mutation, or Subscription against your new API at any time directly by running the following command:

```bash
amplify console api
```

When prompted, select **GraphQL**. This will open the AWS AppSync console for you to run Queries, Mutations, or Subscriptions at the server and see the changes in your client app.

## Connect frontend to API

Update your `src/app.js` file to configure the library with `Amplify.configure()` and add data to your database with a mutation by using `API.graphql()`:

```javascript
import Amplify, { API, graphqlOperation } from "aws-amplify";

import awsconfig from "./aws-exports";
import { createTodo } from "./graphql/mutations";

Amplify.configure(awsconfig);

async function createNewTodo() {
  const todo = {
    name: "Use AppSync",
    description: `Realtime and Offline (${new Date().toLocaleString()})`,
  };

  return await API.graphql(graphqlOperation(createTodo, { input: todo }));
}

const MutationButton = document.getElementById("MutationEventButton");
const MutationResult = document.getElementById("MutationResult");

MutationButton.addEventListener("click", (evt) => {
  createNewTodo().then((evt) => {
    MutationResult.innerHTML += `<p>${evt.data.createTodo.name} - ${evt.data.createTodo.description}</p>`;
  });
});
```

After restarting your app using `npm start` go back to your browser and click **ADD DATA**.  You'll see that your application is now submitting events to AppSync and storing records in DynamoDB. Next, update `src/app.js` to list all the items in the database by importing `listTodos` and update the page when a query runs on app start by immediately calling the function:

```diff
 import Amplify, { API, graphqlOperation } from "aws-amplify";

 import awsconfig from "./aws-exports";
 import { createTodo } from "./graphql/mutations";
+import { listTodos } from "./graphql/queries";

 Amplify.configure(awsconfig);

 async function createNewTodo() {
   const todo = {
     name: "Use AppSync",
     description: `Realtime and Offline (${new Date().toLocaleString()})`,
   };

   return await API.graphql(graphqlOperation(createTodo, { input: todo }));
 }

+async function getData() {
+  API.graphql(graphqlOperation(listTodos)).then((evt) => {
+    evt.data.listTodos.items.map((todo, i) => {
+      QueryResult.innerHTML += `<p>${todo.name} - ${todo.description}</p>`;
+    });
+  });
+}
+
 const MutationButton = document.getElementById("MutationEventButton");
 const MutationResult = document.getElementById("MutationResult");
+const QueryResult = document.getElementById("QueryResult");

 MutationButton.addEventListener("click", (evt) => {
   createNewTodo().then((evt) => {
     MutationResult.innerHTML += `<p>${evt.data.createTodo.name} - ${evt.data.createTodo.description}</p>`;
   });
 });

+getData();
```

Now if you wish to subscribe to data, import the `onCreateTodo` subscription and create a new subscription by adding subscription with `API.graphql()` like so:

```diff
 import Amplify, { API, graphqlOperation } from "aws-amplify";

 import awsconfig from "./aws-exports";
 import { createTodo } from "./graphql/mutations";
 import { listTodos } from "./graphql/queries";
+import { onCreateTodo } from "./graphql/subscriptions";

 Amplify.configure(awsconfig);

 async function createNewTodo() {
   const todo = {
     name: "Use AppSync",
     description: `Realtime and Offline (${new Date().toLocaleString()})`,
   };

   return await API.graphql(graphqlOperation(createTodo, { input: todo }));
 }

 async function getData() {
   API.graphql(graphqlOperation(listTodos)).then((evt) => {
     evt.data.listTodos.items.map((todo, i) => {
       QueryResult.innerHTML += `<p>${todo.name} - ${todo.description}</p>`;
     });
   });
 }

 const MutationButton = document.getElementById("MutationEventButton");
 const MutationResult = document.getElementById("MutationResult");
 const QueryResult = document.getElementById("QueryResult");
+const SubscriptionResult = document.getElementById("SubscriptionResult");

 MutationButton.addEventListener("click", (evt) => {
   createNewTodo().then((evt) => {
     MutationResult.innerHTML += `<p>${evt.data.createTodo.name} - ${evt.data.createTodo.description}</p>`;
   });
 });

+API.graphql(graphqlOperation(onCreateTodo)).subscribe({
+  next: (evt) => {
+    const todo = evt.value.data.onCreateTodo;
+    SubscriptionResult.innerHTML += `<p>${todo.name} - ${todo.description}</p>`;
+  },
+});
+
 getData();
```

After restarting your app using `npm start` go back to your browser and using dev tools you will see data being stored and retrieved in your backend from the console logs.
