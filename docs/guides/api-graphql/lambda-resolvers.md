---
title: How to use Lambda GraphQL Resolvers
description: How to use Lambda GraphQL resolvers to interact with other services
---

The [GraphQL Transform Library](~/cli/graphql-transformer/function.md) provides a `@function` directive that enables the configuration of AWS Lambda function resolvers within your GraphQL API. In this guide you will learn how to use Lambda functions as GraphQL resolvers to interact with other services and APIs using the `@function` directive.

## Creating basic query and mutation Function resolvers

To get started, let's take a look at a GraphQL schema with a query and a mutation that has the data source set as a Lambda function.

```graphql
# A query that returns the arguments
type Query {
  echo(msg: String): String @function(name: "functionName-${env}")
}

# A mutation that adds two numbers
type Mutation {
  add(number1: Int, number2: Int): Int @function(name: "functionName-${env}")
}
```

Using the `@function` directive, you can specify a Lambda function to be invoked as the GraphQL resolver.

In this guide, you'll learn how to enable Lambda function resolvers in a GraphQL API.

### Creating the functions

To get started, create the first Lambda function:

```sh
amplify add function

? Provide a friendly name for your resource to be used as a label for this category in the project: addingfunction
? Provide the AWS Lambda function name: echofunction
? Choose the function runtime that you want to use: NodeJS
? Choose the function template that you want to use: Hello World
? Do you want to access other resources created in this project from your Lambda function? No
? Do you want to invoke this function on a recurring schedule? No
? Do you want to edit the local lambda function now? Yes
```

Open the function code (located at __amplify/backend/function/echofunction/src/index.js__) and press enter:

```js
exports.handler = async (event) => {
    const response = event.arguments.msg
    return response;
};
```

This function will just return the value of the `msg` property passed in as an argument.

#### Lambda event information

The `event` object will contain the following properties:

```js
/*
event = {
  "typeName": "Query" or "Mutation", Filled dynamically based on @function usage location
  "fieldName": Filled dynamically based on @function usage location
  "arguments": { msg }, GraphQL field arguments
  "identity": {}, AppSync identity object
  "source": {}, The object returned by the parent resolver. E.G. if resolving field 'Post.comments', the source is the Post object
  "request": {}, AppSync request object. Contains things like headers
  "prev": {} If using the built-in pipeline resolver support, this contains the object returned by the previous function.
}
*/
```

In the above function we've used the `arguments` property to get the values passed in as arguments to the function.

Next, create another Lambda function:

```sh
amplify add function

? Provide a friendly name for your resource to be used as a label for this category in the project: addingfunction
? Provide the AWS Lambda function name: addfunction
? Choose the function runtime that you want to use: NodeJS
? Choose the function template that you want to use: Hello World
? Do you want to access other resources created in this project from your Lambda function? No
? Do you want to invoke this function on a recurring schedule? No
? Do you want to edit the local lambda function now? Yes
```

Next, update the function code (located at __amplify/backend/function/addingfunction/src/index.js__) to the following and press enter:

```js
exports.handler = async (event) => {
    /* Add number1 and number2, return the result */
    const response = event.arguments.number1 + event.arguments.number2
    return response;
};
```

This function will add two numbers together and return the result.

### Creating the GraphQL API

Now that the functions have been created, you can create the GraphQL API:

```sh
amplify add api

? Please select from one of the below mentioned services: GraphQL
? Provide API name: gqllambda
? Choose the default authorization type for the API: API Key
? Enter a description for the API key: public (or some description)
? After how many days from now the API key should expire: 365 (or your preferred expiration)
? Do you want to configure advanced settings for the GraphQL API: N
? Do you have an annotated GraphQL schema? N
? Do you want a guided schema creation? Y
? What best describes your project: Single object with fields
? Do you want to edit the schema now? Y
```

Next, update the base GraphQL schema (located at __amplify/backend/api/gqllambda/schema.graphql__) with the following code and press enter:

```graphql
type Query {
  echo(msg: String): String @function(name: "echofunction-${env}")
}

type Mutation {
  add(number1: Int, number2: Int): Int @function(name: "addfunction-${env}")
}
```

Now deploy the functions and GraphQL API:

```sh
amplify push
```

### Querying the GraphQL API

Now, you can run the following queries and mutations to interact with the API:

```sh
query echo {
  echo(msg: "Hello world!")
}

mutation add {
  add(number1: 1100, number2:100)
}
```

## Creating a resolver that interacts with another API

Next, we'll create a function that will interact with a public Cryptocurrency REST API.

Create another function:

```sh
amplify add function
```

Next, update the function code (located at __amplify/backend/function/cryptofunction/src/index.js__) to the following and press enter:

```javascript
const axios = require('axios')

exports.handler = async (event) => {
    let limit = 10
    if (event.arguments.limit) {
        limit = event.arguments.limit
    }
    const url = `https://api.coinlore.net/api/tickers/?limit=${limit}`
    let response = await axios.get(url)
    return JSON.stringify(response.data.data);
};
```

Next, install the axios library in the function __src__ folder and change back into the root directory:

```sh
cd amplify/backend/function/cryptofunction/src
npm install axios
cd ../../../../../
```

Now, update the GraphQL schema and add a `getCoins` resolver to the Query type:

```graphql
type Query {
  echo(msg: String): String @function(name: "gqlfunc-${env}")
  getCoins(limit: Int): String @function(name: "cryptofunction-${env}")
}
```

Next, deploy the updates:

```sh
amplify push
```

Now you can query the GraphQL API using the new `getCoins` query.

#### Basic query

```graphql
query getCoins {
  getCoins
}
```

#### Query with limit

```graphql
query getCoins {
  getCoins(limit: 100)
}
```

To learn more about the `@function` directive, check out the GraphQL Transform documentation [here](~/cli/graphql-transformer/function.md).
