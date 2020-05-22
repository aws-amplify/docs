The Amplify API category provides an interface for retrieving and persisting your model data. The API category comes with default built-in support for AWS AppSync. The Amplify CLI allows you to define your API and provision a GraphQL service with CRUD operations and real-time functionality. The Amplify AWS API plugin leverages [AWS AppSync](https://aws.amazon.com/appsync/).

## Goal
To setup and configure your application with Amplify API to create a Todo persisted in the backend.

## Prerequisites

<inline-fragment platform="ios" src="~/lib/graphqlapi/fragments/ios/getting-started/10_preReq.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/graphqlapi/fragments/android/getting-started/10_preReq.md"></inline-fragment>

## Provision Backend Storage Services

To start provisioning api resources in the backend, go to your project directory and **execute the command**:

```bash
amplify add api
```

Enter the following when prompted:
```console
? Please select from one of the below mentioned services: 
    `GraphQL`
? Provide API name: 
    `apiName`
? Choose the default authorization type for the API 
    `API key`
? Enter a description for the API key:
    `description`
? After how many days from now the API key should expire (1-365): 
    `7`
? Do you want to configure advanced settings for the GraphQL API 
    `No, I am done.`
? Do you have an annotated GraphQL schema? 
    `No`
? Do you want a guided schema creation? 
    `Yes`
? What best describes your project: 
    `Single object with fields (e.g., “Todo” with ID, name, description)`
? Do you want to edit the schema now? 
    `No`
```

The guided schema creation will create a schema with the following:
```
type Todo @model {
  id: ID!
  name: String!
  description: String
}
```

To push your changes to the cloud, **execute the command**:

```bash
amplify push
```

Enter the following when prompted:
```console
? Do you want to generate code for your newly created GraphQL API 
    `No`
```

Upon completion, `amplifyconfiguration.json` should be updated to reference provisioned backend storage resources.  Note that these files should already be a part of your project if you followed the [Project setup walkthrough](~/lib/project-setup/create-application.md).

## Generate Todo Model class

Run `amplify codegen models` to generate the Todo model. 

<inline-fragment platform="ios" src="~/lib/graphqlapi/fragments/ios/getting-started/40_codegen.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/graphqlapi/fragments/android/getting-started/40_codegen.md"></inline-fragment>

## Install Amplify Libraries
<inline-fragment platform="ios" src="~/lib/graphqlapi/fragments/ios/getting-started/20_installLib.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/graphqlapi/fragments/android/getting-started/20_installLib.md"></inline-fragment>

## Initialize Amplify API
<inline-fragment platform="ios" src="~/lib/graphqlapi/fragments/ios/getting-started/30_initapi.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/graphqlapi/fragments/android/getting-started/30_initapi.md"></inline-fragment>

## Create a Todo

<inline-fragment platform="ios" src="~/lib/graphqlapi/fragments/ios/getting-started/50_createtodo.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/graphqlapi/fragments/android/getting-started/50_createtodo.md"></inline-fragment>

Upon successfully executing this code, you should see the todo persisted in your dynamoDB table. To navigate to your backend, run `amplify console api` and choose `GraphQL`. This will open the AppSync console to your GraphQL service. Select `Data Sources` and select the Resource link in your TodoTable to bring you to the DynamoDB Console. Select the `items` tab to see the Todo object that has been persisted in your database.

## Next Steps
Congratulations! You've create a Todo object in your database. Check out the following links to see other Amplify API use cases:

* [Fetch data](~/lib/graphqlapi/query-data.md)
* [Update data](~/lib/graphqlapi/mutate-data.md)
* [Subscribe to data](~/lib/graphqlapi/subscribe-data.md)
* [Concepts](~/lib/graphqlapi/concepts.md)
* [Configure authorization modes](~/lib/graphqlapi/authz.md)

<!-- TODO: * [Authorizing API calls with Cognito User Pool] -->
