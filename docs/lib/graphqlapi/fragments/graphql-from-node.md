You can call an AppSync GraphQL API from a Node.js app or a Lambda function. Take a basic `Todo` app as an example: 

```graphql
type Todo @model {
  id: ID!
  name: String
  description: String
}
```

This API will have operations available for `create`, `read`, `update`, and `delete`. Let's take a look at how to perform both a __query__ as well as a __mutation__ from a Lambda function using Node.js.

## Query

```javascript
const axios = require('axios');
const gql = require('graphql-tag');
const graphql = require('graphql');
const { print } = graphql;

const listTodos = gql`
  query listTodos {
    listTodos {
      items {
        id
        name
        description
      }
    }
  }
`

exports.handler = async (event) => {
  try {
    const graphqlData = await axios({
      url: process.env.API_URL,
      method: 'post',
      headers: {
        'x-api-key': process.env.API_<YOUR_API_NAME>_GRAPHQLAPIKEYOUTPUT
      },
      data: {
        query: print(listTodos),
      }
    });
    const body = {
        graphqlData: graphqlData.data.data.listTodos
    }
    return {
        statusCode: 200,
        body: JSON.stringify(body),
        headers: {
            "Access-Control-Allow-Origin": "*",
        }
    }
  } catch (err) {
    console.log('error posting to appsync: ', err);
  } 
}
```

## Mutation

In this example we create a mutation showing how to pass in variables as arguments.

```js
const axios = require('axios');
const gql = require('graphql-tag');
const graphql = require('graphql');
const { print } = graphql;

const createTodo = gql`
  mutation createTodo($input: CreateTodoInput!) {
    createTodo(input: $input) {
      id
      name
      description
    }
  }
`

exports.handler = async (event) => {
  try {
    const graphqlData = await axios({
      url: process.env.API_URL,
      method: 'post',
      headers: {
        'x-api-key': process.env.API_<YOUR_API_NAME>_GRAPHQLAPIKEYOUTPUT
      },
      data: {
        query: print(createTodo),
        variables: {
          input: {
            name: "Hello world!",
            description: "My first todo"
          }
        }
      }
    });
    const body = {
      message: "successfully created todo!"
    }
    return {
      statusCode: 200,
      body: JSON.stringify(body),
      headers: {
          "Access-Control-Allow-Origin": "*",
      }
    }
  } catch (err) {
    console.log('error creating todo: ', err);
  } 
}
```

## Signing a request from Lambda

What about working with custom signing of the request? Let's take a look at another example schema that uses `iam` authorization.

```graphql
type Todo @model @auth (
    rules: [
        { allow: private, provider: iam }
    ]
) {
  id: ID!
  name: String
  description: String
}
```

Create a Lambda function with `amplify add function` and make sure to give access to your GraphQL API when prompted for in the `amplify add function` flow.

```bash
amplify update function
```
```console
? Select which capability you want to update: Lambda function (serverless function)
? Select the Lambda function you want to update: MyFunction
General information
| Name: MyFunction
| Runtime: nodejs
...

? Which setting do you want to update? Resource access permissions
? Select the categories you want this function to have access to. (Select using <space>)
> api
? Select the operations you want to permit on <YOUR_API_NAME> (Select using <space>)
> Query, Mutation, Subscription

You can access the following resource attributes as environment variables from your Lambda function
	API_<YOUR_API_NAME>_GRAPHQLAPIENDPOINTOUTPUT
	API_<YOUR_API_NAME>_GRAPHQLAPIIDOUTPUT
	API_<YOUR_API_NAME>_GRAPHQLAPIKEYOUTPUT
? Do you want to edit the local lambda function now? No
```

The CLI will automatically configure the Lambda execution IAM role required by the Lambda function to call the GraphQL API. The following function will sign the request and use environment variables for the AppSync and Region that `amplify add function` created for you.

```javascript
const https = require('https');
const AWS = require("aws-sdk");
const urlParse = require("url").URL;
const appsyncUrl = process.env.API_<YOUR_API_NAME>_GRAPHQLAPIENDPOINTOUTPUT;
const region = process.env.REGION;
const endpoint = new urlParse(appsyncUrl).hostname.toString();
const graphqlQuery = require('./query.js').mutation;
const apiKey = process.env.API_<YOUR_API_NAME>_GRAPHQLAPIKEYOUTPUT;

exports.handler = async (event) => {
    const req = new AWS.HttpRequest(appsyncUrl, region);

    const item = {
        input: {
            name: "Lambda Item",
            description: "Item Generated from Lambda"
        }
    };

    req.method = "POST";
    req.path = "/graphql";
    req.headers.host = endpoint;
    req.headers["Content-Type"] = "application/json";
    req.body = JSON.stringify({
        query: graphqlQuery,
        operationName: "createTodo",
        variables: item
    });

    if (apiKey) {
        req.headers["x-api-key"] = apiKey;
    } else {
        const signer = new AWS.Signers.V4(req, "appsync", true);
        signer.addAuthorization(AWS.config.credentials, AWS.util.date.getDate());
    }

    const data = await new Promise((resolve, reject) => {
        const httpRequest = https.request({ ...req, host: endpoint }, (result) => {
            let data = "";

            result.on("data", (chunk) => {
                data += chunk;
            });

            result.on("end", () => {
                resolve(JSON.parse(data.toString()));
            });
        });

        httpRequest.write(req.body);
        httpRequest.end();
    });

    return {
        statusCode: 200,
        body: data
    };
};
```

Finally you can define the GraphQL operation you're running, in this case the `createTodo` mutation, in a separate `query.js` file:

```javascript
module.exports = {
    mutation: `mutation createTodo($input: CreateTodoInput!) {
      createTodo(input: $input) {
        id
        name
        description
      }
    }
    `
}
```
