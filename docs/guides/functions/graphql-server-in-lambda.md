---
title: GraphQL Server in Lambda
description: How to run an Apollo GraphQL server in a Lambda function
---

In this guide you will learn how to run a GraphQL server in a Lambda function using [Apollo Server](https://www.apollographql.com/docs/) and [Apollo Server Lambda](https://github.com/apollographql/apollo-server/tree/master/packages/apollo-server-lambda).

### Installing the dependencies

To get started, change into the folder of the Lambda function and install the following dependencies:

```sh
npm install apollo-server-lambda graphql
```

### Function code

Next, open the Lambda function and add the following code for a basic GraphQL server with a single query:

```javascript
const { ApolloServer, gql } = require('apollo-server-lambda');

/* Construct a schema, using GraphQL schema language */
const typeDefs = gql`
  type Query { hello: String }
`

/* Provide resolver functions for your schema fields */
const resolvers = {
  Query: {
    hello: () => 'Hello from Apollo!!',
  },
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ event, context }) => ({
      headers: event.headers,
      functionName: context.functionName,
      event,
      context,
    }),
  })
  
exports.handler = server.createHandler({
  cors: {
    origin: '*',
    credentials: true,
  }
})
```