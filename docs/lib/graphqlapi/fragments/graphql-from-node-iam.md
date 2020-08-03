Lets create a rudimentary system to keep track of ATM deposits and withdrawals.

We'll allow users to run mutations `deposit` and `withdraw`.

We'll allow our lambdas to create and read transactions with IAM.

```console
amplify add api
? Please select from one of the below mentioned services: GraphQL
? Provide API name: ledger
? Choose the default authorization type for the API IAM
? Do you want to configure advanced settings for the GraphQL API Yes, I want to make some additional changes.
? Configure additional auth types? Yes
? Choose the additional authorization types you want to configure for the API Amazon Cognito User Pool
Do you want to use the default authentication and security configuration? Default configuration
How do you want users to be able to sign in? Email
Do you want to configure advanced settings? No, I am done.
? Configure conflict detection? No
? Do you have an annotated GraphQL schema? No
? Choose a schema template: Single object with fields (e.g., “Todo” with ID, name, description)
? Do you want to edit the schema now? Yes
```

Replace the schema with the following schema.

```graphql
type Transaction
  @model
  @key(fields: ["id", "timestamp"])
  @auth(rules: [
    { provider: iam, allow: private, operations: [create, read] },
  ]) {
  id: ID!
  timestamp: Float!
  amount: Float!
}

type Mutation {
  deposit(amount: Float!): String! @function(name: "deposit-${env}") @aws_cognito_user_pools
  withdraw(amount: Float!): String! @function(name: "withdraw-${env}") @aws_cognito_user_pools
}
```

### Layer with Axios & Fetch

```console
amplify add function
? Select which capability you want to add: Lambda layer (shared code & resource used across functions)
? Provide a name for your Lambda layer: ledgerCommonModules
? Select up to 2 compatible runtimes: NodeJS
? The current AWS account will always have access to this layer. <enter>
```

```console
cd amplify/backend/function/ledgerCommonModules/lib/nodejs/
npm i axios cross-fetch
cd -
```

### Deposit using axios

```console
amplify add function
? Select which capability you want to add: Lambda function (serverless function)
? Provide a friendly name for your resource to be used as a label for this category in the project: deposit
? Provide the AWS Lambda function name: deposit
? Choose the runtime that you want to use: NodeJS
? Choose the function template that you want to use: Hello World
? Do you want to access other resources in this project from your Lambda function? Yes
? Select the category api
? Select the operations you want to permit for ledger create, read
? Do you want to invoke this function on a recurring schedule? No
? Do you want to configure Lambda layers for this function? Yes
? Provide existing layers or select layers in this project to access from this function (pick up to 5): ledgerCommonModules
? Select a version for ledgerCommonModules: 1
? Do you want to edit the local lambda function now? Yes
```

```js
const axios = require("axios");
const AWS = require("aws-sdk");
const URL = require("url").URL;
const REGION = process.env.REGION;
const { href: ENDPOINT, hostname: HOST } = new URL(
  process.env.API_LEDGER_GRAPHQLAPIENDPOINTOUTPUT
);

const createTransaction = /* GraphQL */ `
  mutation CreateTransaction(
    $input: CreateTransactionInput!
    $condition: ModelTransactionConditionInput
  ) {
    createTransaction(input: $input, condition: $condition) {
      id
      timestamp
      amount
      createdAt
      updatedAt
    }
  }
`;

exports.handler = async (event) => {
  try {
    const signAxiosRequest = (data) => {
      const request = new AWS.HttpRequest(ENDPOINT, REGION);
      request.body = JSON.stringify(data);
      request.headers.host = HOST;
      new AWS.Signers.V4(request, "appsync", true).addAuthorization(
        AWS.config.credentials,
        AWS.util.date.getDate()
      );
      return {
        method: request.method,
        headers: request.headers,
        data,
        url: ENDPOINT,
      };
    };

    await axios(
      signAxiosRequest({
        query: createTransaction,
        variables: {
          input: {
            id: event.identity.sub,
            timestamp: Date.now(),
            amount: event.arguments.amount,
          },
        },
      })
    );

    return `Deposited ${event.arguments.amount}`;
  } catch (err) {
    return err.message;
  }
};
```

### Withdraw using fetch

```console
amplify add function
? Select which capability you want to add: Lambda function (serverless function)
? Provide a friendly name for your resource to be used as a label for this category in the project: withdraw
? Provide the AWS Lambda function name: withdraw
? Choose the runtime that you want to use: NodeJS
? Choose the function template that you want to use: Hello World
? Do you want to access other resources in this project from your Lambda function? Yes
? Select the category api
? Select the operations you want to permit for ledger create, read
? Do you want to invoke this function on a recurring schedule? No
? Do you want to configure Lambda layers for this function? Yes
? Provide existing layers or select layers in this project to access from this function (pick up to 5): ledgerCommonModules
? Select a version for ledgerCommonModules: 1
? Do you want to edit the local lambda function now? Yes
```

```js
const fetch = require("cross-fetch");
const AWS = require("aws-sdk");
const URL = require("url").URL;
const REGION = process.env.REGION;
const { href: ENDPOINT, hostname: HOST } = new URL(
  process.env.API_LEDGER_GRAPHQLAPIENDPOINTOUTPUT
);

const createTransaction = /* GraphQL */ `
  mutation CreateTransaction(
    $input: CreateTransactionInput!
    $condition: ModelTransactionConditionInput
  ) {
    createTransaction(input: $input, condition: $condition) {
      id
      timestamp
      amount
      createdAt
      updatedAt
    }
  }
`;

exports.handler = async (event) => {
  try {
    const signFetchRequest = (body) => {
      const request = new AWS.HttpRequest(ENDPOINT, REGION);
      request.body = body;
      request.headers.host = HOST;
      new AWS.Signers.V4(request, "appsync", true).addAuthorization(
        AWS.config.credentials,
        AWS.util.date.getDate()
      );
      return {
        method: request.method,
        headers: request.headers,
        body,
        url: ENDPOINT,
      };
    };

    await fetch(
      ENDPOINT,
      signFetchRequest(
        JSON.stringify({
          query: createTransaction,
          variables: {
            input: {
              id: event.identity.sub,
              timestamp: Date.now(),
              amount: -event.arguments.amount,
            },
          },
        })
      )
    );

    return `Withdrew ${event.arguments.amount}`;
  } catch (err) {
    return err.message;
  }
};
```

Next, create a user in Cognito User Pool and head over to AppSync queries in AWS Console and sign in with the newly created user.

And run the following mutations:

```graphql
mutation Deposit {
  deposit(amount: 22.22)
}

mutation Withdraw {
  withdraw(amount: 11.11)
}
```
