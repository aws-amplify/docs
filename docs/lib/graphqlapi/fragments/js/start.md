The AWS Amplify API module supports AWS AppSync or any other GraphQL backends.

To learn more about GraphQL, please visit the [GraphQL website](http://graphql.org/learn/).
{: .callout .callout--action}

## Using AWS AppSync

AWS AppSync helps you build data-driven apps with real-time and offline capabilities. Learn more about [AWS AppSync](https://aws.amazon.com/appsync/) by visiting [AWS AppSync Developer Guide](https://docs.aws.amazon.com/appsync/latest/devguide/welcome.html){: .target='new'}.
{: .callout .callout--action}


The Amplify Framework offers two client options for AppSync:

- [Amplify GraphQL client](#amplify-graphql-client)

- [AWS AppSync SDK](#aws-appsync-sdk)

The Amplify GraphQL client is a light weight option if you're looking for a simple way to leverage GraphQL features and do not need the offline capabilities or caching. If you need those features, please look at [Amplify DataStore](https://aws-amplify.github.io/docs/js/datastore).

Alternatively the [AWS AppSync SDK](https://github.com/awslabs/aws-mobile-appsync-sdk-js/) enables you to integrate your app with the AWS AppSync service and integrates with the Apollo client found [here](https://github.com/apollographql/apollo-client/).

You can integrate with AWS AppSync using the following steps:

1. Set up the API endpoint and authentication information in the client side configuration.
2. Generate TypeScript/JavaScript code from the API schema. (optional)
3. Write app code to run queries, mutations and subscriptions.

The Amplify CLI provides support for AppSync that make this process easy. Using the CLI, you can configure an AWS AppSync API, download required client side configuration files, and generate client side code within minutes by running a few simple commands on the command line.

### Automated Configuration with CLI

After creating your AWS AppSync API, the following command enables AppSync GraphQL API in your  project:

```bash
$ amplify add api
```

Select *GraphQL* when prompted for service type:

```terminal
? Please select from one of the below mentioned services (Use arrow keys)
❯ GraphQL
  REST
```

Name your GraphQL endpoint and select the authorization type:

```terminal
? Please select from one of the below mentioned services GraphQL
? Provide API name: myNotesApi
? Choose an authorization type for the API (Use arrow keys)
❯ API key
  Amazon Cognito User Pool
```

AWS AppSync API keys expire seven days after creation, and using API KEY authentication is only suggested for development. To change the AWS AppSync authorization type after the initial configuration, use the `$ amplify update api` command and select `GraphQL`.
{: .callout .callout--info}

When you update your backend with the *push* command, you can go to [AWS AppSync Console](https://aws.amazon.com/appsync/) and see that a new API is added under the *APIs* menu item:

```bash
$ amplify push
```

### Updating Your GraphQL Schema

When you create a GraphQL backend with the CLI, the schema definition for your backend data structure is saved in one of two places:

1. By default, schemas are saved in *amplify/backend/api/YOUR-API-NAME/schema.graphql*. If the `schema.graphql` file exists, it will take precedence over option 2.
2. Optionally, schemas may be saved as a set of `.graphql` files stored in the *amplify/backend/api/YOUR-API-NAME/schema/* directory. E.g. you might have files `Query.graphql`, `User.graphql`, and `Post.graphql`.

Once your API is deployed, updating the schema is easy with the CLI. You can edit the schema file(s) and run *amplify push* command to update your GraphQL backend.

For example, a sample GraphQL schema will look like this:

```graphql
type Todo @model {
  id: ID!
  name: String!
  description: String
}
```

Add a *priority* field to your Todo type:

```graphql
type Todo @model {
  id: ID!
  name: String!
  description: String
  priority: String
}
```

Save your schema file and update your GraphQL backend:

```bash
$ amplify push
```

When you run the *push* command, you will notice that your schema change is automatically detected, and your backend will be updated respectively. 

```terminal
| Category | Resource name   | Operation | Provider plugin   |
| -------- | --------------- | --------- | ----------------- |
| Api      | myNotesApi      | Update    | awscloudformation |
| Auth     | cognito6255949a | No Change | awscloudformation |
```

When the update is complete, you can see the changes on your backend by visiting [AWS AppSync Console](https://aws.amazon.com/appsync/).

### Using GraphQL Transformers

As you can notice in the sample schema file above, the schema has a `@model` directive. The `@model` directive leverages a set of libraries that can help simplify the process of bootstrapping highly scalable, serverless GraphQL APIs on AWS. The `@model` directive tells the GraphQL Transform that we would like to store Todo objects in an Amazon DynamoDB table and configure CRUD operations for it. When you create or update your backend with *push* command, the CLI will automatically create and configure a new DynamoDB table that works with your AppSync API. The `@model` directive is just one of multiple transformers that can be used by annotating your *schema.graphql*. 

The following directives are available to be used when defining your schema:  

| Directive | Description |
| --- | --- |
| @model on Object | Store objects in DynamoDB and configure CRUD resolvers. |
| @auth on Object | Define authorization strategies for your API. | 
| @connection on Field | Specify relationships between @model object types. |
| @searchable on Object | Stream data of an @model object type to Amazon Elasticsearch Service. |
| @versioned on Object | Add object versioning and conflict detection to a @model. | 

You may also write your own transformers to implement reproducible patterns that you find useful. To learn more about the GraphQL Transform libraries see [GraphQL Transform Documentation](https://aws-amplify.github.io/docs/cli/graphql?sdk=js).

### Mocking and Local Testing

Amplify supports running a local mock server for testing your application with AWS AppSync, including debugging of resolvers, before pushing to the cloud. Please see the [CLI Toolchain documentation](../cli-toolchain/usage#mocking-and-testing) for more details.

### Generate client types from a GraphQL schema

When working with GraphQL data it is useful to import types from your schema for type safety. You can do this with the Amplify CLI's automated code generation feature. The CLI automatically downloads GraphQL Introspection Schemas from the defined GraphQL endpoint and generates TypeScript or Flow classes for you. Every time you push your GraphQL API, the CLI will provide you the option to generate types and statements.

If you want to generate your GraphQL statements and types, run:

```bash
$ amplify codegen
```

A TypeScript or Flow type definition file will be generated in your target folder.  

### Using the Configuration File in Your Code

Import your auto-generated `aws-exports.js` file to configure your app to work with your AWS AppSync GraphQL backend:

```javascript
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);
```

## Manual Configuration

As an alternative to automatic configuration, you can manually enter AWS AppSync configuration parameters in your app. Authentication type options are `API_KEY`, `AWS_IAM`, `AMAZON_COGNITO_USER_POOLS` and `OPENID_CONNECT`.

### Using API_KEY

```javascript
const myAppConfig = {
    // ...
    'aws_appsync_graphqlEndpoint': 'https://xxxxxx.appsync-api.us-east-1.amazonaws.com/graphql',
    'aws_appsync_region': 'us-east-1',
    'aws_appsync_authenticationType': 'API_KEY',
    'aws_appsync_apiKey': 'da2-xxxxxxxxxxxxxxxxxxxxxxxxxx',
    // ...
}

Amplify.configure(myAppConfig);
```

### Using AWS_IAM

```javascript
const myAppConfig = {
    // ...
    'aws_appsync_graphqlEndpoint': 'https://xxxxxx.appsync-api.us-east-1.amazonaws.com/graphql',
    'aws_appsync_region': 'us-east-1',
    'aws_appsync_authenticationType': 'AWS_IAM',
    // ...
}

Amplify.configure(myAppConfig);
```

### Using AMAZON_COGNITO_USER_POOLS

```javascript
const myAppConfig = {
    // ...
    'aws_appsync_graphqlEndpoint': 'https://xxxxxx.appsync-api.us-east-1.amazonaws.com/graphql',
    'aws_appsync_region': 'us-east-1',
    'aws_appsync_authenticationType': 'AMAZON_COGNITO_USER_POOLS', // You have configured Auth with Amazon Cognito User Pool ID and Web Client Id
    // ...
}

Amplify.configure(myAppConfig);
```

### Using OPENID_CONNECT

```javascript
const myAppConfig = {
    // ...
    'aws_appsync_graphqlEndpoint': 'https://xxxxxx.appsync-api.us-east-1.amazonaws.com/graphql',
    'aws_appsync_region': 'us-east-1',
    'aws_appsync_authenticationType': 'OPENID_CONNECT', // Before calling API.graphql(...) is required to do Auth.federatedSignIn(...) check authentication guide for details.
    // ...
}

Amplify.configure(myAppConfig);
```