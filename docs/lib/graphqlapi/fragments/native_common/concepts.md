
## AWS AppSync

The Amplify Framework uses AWS AppSync, a managed service that uses GraphQL to make it easy for applications to get exactly the data they need. With AppSync, you can build scalable applications, including those requiring real-time updates, on a range of data sources such as NoSQL data stores, relational databases, HTTP APIs, and your custom data sources with AWS Lambda.

For mobile and web apps, AppSync additionally provides SDKs that support local data access when devices go offline, and data synchronization with customizable conflict resolution, when they are back online.

### The API Category

The API category provides a solution for making HTTP requests to both GraphQL as well as REST endpoints. It includes a [AWS Signature Version 4](http://docs.aws.amazon.com/general/latest/gr/signature-version-4.html) signer class which automatically signs all AWS API requests for you as well as methods to use API Keys, Amazon Cognito User Pools, or 3rd party OIDC providers.

The AWS Amplify API module supports AWS AppSync or any other GraphQL backends.

<amplify-callout>

To learn more about GraphQL, please visit the [GraphQL website](http://graphql.org/learn/).

</amplify-callout>

## Using AWS AppSync

AWS AppSync helps you build data-driven apps with real-time and offline capabilities. Learn more about [AWS AppSync](https://aws.amazon.com/appsync/) by visiting [AWS AppSync Developer Guide](https://docs.aws.amazon.com/appsync/latest/devguide/welcome.html).

The Amplify Framework offers three SDK options for AppSync.

__[Amplify GraphQL client](~/lib/graphqlapi/query-data.md)__ - a light weight option if you're looking for a simple way to leverage GraphQL features and do not need the offline capabilities or caching. If you need those features, please look at [Amplify DataStore](~/lib/datastore/getting-started.md).

__[Amplify DataStore](~/lib/datastore/getting-started.md)__ - makes it easy to build apps that need to support offline and low-latency scenarios. DataStore also makes working with distributed, cross-user data just as simple as working with local-only data by providing a programming model for leveraging shared and distributed data without writing additional code.

__[AWS AppSync SDK](https://github.com/awslabs/aws-mobile-appsync-sdk-js/)__ - provides offline support and enables you to integrate your app with the AWS AppSync service and integrates with the Apollo client found [here](https://github.com/apollographql/apollo-client/).

You can integrate with AWS AppSync using the following steps:

1. Set up the API endpoint and authentication information in the client side configuration.
2. Generate TypeScript/JavaScript code from the API schema. (optional)
3. Write app code to run queries, mutations and subscriptions.

The Amplify CLI provides support for AppSync that make this process easy. Using the CLI, you can configure an AWS AppSync API, download required client side configuration files, and generate client side code within minutes by running a few simple commands on the command line.