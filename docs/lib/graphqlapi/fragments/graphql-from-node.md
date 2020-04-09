You can also call an AppSync GraphQL API from a NodeJS app or a Lambda function. For example, deploy a simple `Todo` model with the following schema in the `amplify add api` flow:

```
type Todo @model @auth (
    rules: [
        { allow: private, provider: iam, operations: [create] }
    ]
) {
  id: ID!
  name: String
  description: String
}
```

In the above example we want your Lambda function to have access to run a single mutation (`createTodo`) and hence we explicitly mention `create` in the `operations` list. To grant access for application users to perform other actions, you can add `read`, `update` or `delete` to the `operations` list along with `create`.

Save your changes and create a Lambda function with `amplify add function` and make sure to add access for your GraphQL API when prompted for in the `amplify add function` flow. The CLI would automatically configure the Lambda execution IAM role required by the Lambda function to call the GraphQL API. The following function will sign the request and use environment variables for the AppSync and Region that `amplify add function` created for you.

```javascript
const https = require('https');
const AWS = require("aws-sdk");
const urlParse = require("url").URL;
const appsyncUrl = process.env.API_BACKENDGRAPHQL_GRAPHQLAPIENDPOINTOUTPUT;
const region = process.env.REGION;
const endpoint = new urlParse(appsyncUrl).hostname.toString();
const graphqlQuery = require('./query.js').mutation;
const apiKey = process.env.API_KEY;

exports.handler = async (event) => {
    const req = new AWS.HttpRequest(appsyncUrl, region);

    const item = {
        input: {
            name: "Lambda Item",
            description: "Item Generated from Lambda"
        }
    };

    req.method = "POST";
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
            result.on('data', (data) => {
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