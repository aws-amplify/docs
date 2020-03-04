## Using Amplify GraphQL Client

The API category provides a GraphQL client for working with queries, mutations, and subscriptions. This client does not support offline programming.

### Query Declarations

The Amplify CLI codegen automatically generates all possible GraphQL statements (queries, mutations and subscriptions) and for JavaScript applications saves it in `src/graphql` folder

```javascript
import * as queries from './graphql/queries';
import * as mutations from './graphql/mutations';
import * as subscriptions from './graphql/subscriptions';
```

### Simple Query

Running a GraphQL query is simple. Import the generated query and execute it with `API.graphql`:

```javascript
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import * as queries from './graphql/queries';


// Simple query
const allTodos = await API.graphql(graphqlOperation(queries.listTodos));
console.log(allTodos);

// Query using a parameter
const oneTodo = await API.graphql(graphqlOperation(queries.getTodo, { id: 'some id' }));
console.log(oneTodo);

```

## Using AWS AppSync SDK

The following documentation outlines how to use the Apollo client with AWS AppSync and important client APIs to understand. For sample code to use in your JavaScript framework such as React, Vue, etc. or to open issues with the SDK please see the [AppSync Apollo client SDK GitHub repository](https://github.com/awslabs/aws-mobile-appsync-sdk-js/).

**Configuration**

The AWS SDKs support configuration through a centralized file called `aws-exports.js` that defines your AWS regions and service endpoints. You obtain this file in one of two ways, depending on whether you are creating your AppSync API in the AppSync console or using the Amplify CLI.

* If you are creating your API in the console, navigate to the `Getting Started` page, and follow the steps in the `Integrate with your app` section. The `aws-exports.js` file you download is already populated for your specific API. Place the file in the `src` directory of your JavaScript project.

* If you are creating your API with the Amplify CLI (using `amplify add api`), the `aws-exports.js` file is automatically downloaded and updated each time you run `amplify push` to update your cloud resources. The file is placed in the `src` directory that you choose when setting up your JavaScript project.

**Code Generation**

To execute GraphQL operations in JavaScript you need to have GraphQL statements (for example, queries, mutations, or subscriptions) to send over the network to the server. You can optionally run a code generation process to do this for you. The Amplify CLI toolchain makes this easy by automatically pulling down your schema and generating default GraphQL queries, mutations, and subscriptions. If your client requirements change, you can alter these GraphQL statements and your JavaScript project will automatically pick them up. You can also generate TypeScript definitions with the CLI and regenerate your types.

**AppSync APIs Created in the Console**

After installing the Amplify CLI open a terminal, go to your JavaScript project root, and then run the following:

```bash
amplify init
amplify add codegen --apiId XXXXXX
```

The `XXXXXX` is the unique AppSync API identifier that you can find in the console in the root of your API's integration page. When you run this command you can accept the defaults, which create a `./src/graphql` folder structure with your statements.

**AppSync APIs Created Using the CLI**

Navigate in your terminal to a JavaScript project directory and run the following:

```terminal
$amplify init     ## Select JavaScript as your platform
$amplify add api  ## Select GraphQL, API key, "Single object with fields Todo application"
```
Select *GraphQL* when prompted for service type:

```terminal
? Please select from one of the below mentioned services (Use arrow keys)
❯ GraphQL
  REST
```

The `add api` flow above will ask you some questions, such as if you already have an annotated GraphQL schema. If this is your first time using the CLI select **No** and let it guide you through the default project **"Single object with fields (e.g., “Todo” with ID, name, description)"** as it will be used in the code examples below. Later on, you can always change it.

Name your GraphQL endpoint and select authorization type:

```terminal
? Please select from one of the below mentioned services GraphQL
? Provide API name: myTodosApi
? Choose an authorization type for the API (Use arrow keys)
❯ API key
  Amazon Cognito User Pool
```

AWS AppSync API keys expire seven days after creation, and using API KEY authentication is only suggested for development. To change AWS AppSync authorization type after the initial configuration, use the `$ amplify update api` command and select `GraphQL`.
{: .callout .callout--info}

When you update your backend with *push* command, you can go to [AWS AppSync Console](http://console.aws.amazon.com/appsync/home) and see that a new API is added under *APIs* menu item:

```bash
$ amplify push
```

The `amplify push` process will prompt you to enter the codegen process and walk through configuration options. Accept the defaults and it will create a `./src/graphql` folder structure with your documents. You also will have an `aws-exports.js` file that the AppSync client will use for initialization. At any time you can open the AWS console for your new API directly by running the following command:

```terminal
$ amplify console api
> GraphQL               ##Select GraphQL
```

This will open the AWS AppSync console for you to run Queries, Mutations, or Subscriptions at the server and see the changes in your client app.

#### Dependencies

To use AppSync in your JavaScript project, add in the following dependencies:

```bash
npm install aws-appsync graphql-tag
# or
yarn add aws-appsync graphql-tag
```

#### Client Initialization

In your app's entry point, import the AWS AppSync Client and instantiate it.

```javascript
import gql from 'graphql-tag';
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import awsconfig from './aws-exports';

const client = new AWSAppSyncClient({
  url: awsconfig.aws_appsync_graphqlEndpoint,
  region: awsconfig.aws_appsync_region,
  auth: {
    type: AUTH_TYPE.API_KEY, // or type: awsconfig.aws_appsync_authenticationType,
    apiKey: awsconfig.aws_appsync_apiKey,
  }
});
```

#### Run a Query

Now that the client is configured, you can run a GraphQL query. The syntax is `client.query({ query: QUERY})` which returns a `Promise` you can optionally `await` on. The `QUERY` is a GraphQL document you can write yourself or use the statements which `amplify codegen` created automatically. For example, if you have a `ListTodos` query, your code will look like the following:

```javascript
import { listTodos } from './graphql/queries';

client.query({
  query: gql(listTodos)
}).then(({ data: { listTodos } }) => {
  console.log(listTodos.items);
});
```

If you want to change the `fetchPolicy` to something like `cache-only` and not retrieve data over the network, you need to wait for the cache to be hydrated (instantiate an in-memory object from storage for the Apollo cache to use).

```javascript
import { listTodos } from './graphql/queries';

(async () => { 
  await client.hydrated();

  const result = await client.query({
    query: gql(listTodos),
    fetchPolicy: 'cache-only',
  });
  console.log(result.data.listTodos.items);
})();
```

We recommend leaving the default of `fetchPolicy: 'cache-and-network` for usage with AppSync.

