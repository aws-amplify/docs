#### Initialize Amplify in your project

<!-- // spell-checker: disable -->
```
amplify init

? Enter a name for the project
    `amplifiedtodo`
? Initialize the project with the above configuration?
    `Yes`
? Select the authentication method you want to use:
    `AWS profile`
? Please choose the profile you want to use
    `default`
```
<!-- // spell-checker: enable -->

#### Add and configure a GraphQL API 

When prompted to configure **advanced settings**, take care to respond with **Yes, I want to make some additional changes**, and ensure that **conflict detection** is enabled as it is *required* when using the DataStore to sync data with the cloud.

```
amplify add api

? Please select from one of the below mentioned services:
    `GraphQL`
? Provide API name:
    `amplifiedTodoAPI`
? Choose the default authorization type for the API
    `API key`
? Enter a description for the API key:
    `Amplified Todo API key`
? After how many days from now the API key should expire (1-365):
    `7`
? Do you want to configure advanced settings for the GraphQL API
    `Yes, I want to make some additional changes.`
? Configure additional auth types?
    `No`
? Enable conflict detection?
    `Yes`
? Select the default resolution strategy
    `Auto Merge`
? Do you have an annotated GraphQL schema?
    `No`
? Choose a schema template
    `Single object with fields (e.g., “Todo” with ID, name, description)`
? Do you want to edit the schema now?
    `No`
```

#### Update data models

At this point, Amplify should have generated several directories and configuration files in your project for you. Let’s take a look at the generated GraphQL schema.

1. From your project root, navigate to the `amplify/backend/api/amplifiedTodoAPI/` directory and open `schema.graphql` using a text editor of your choice. You should see the following.

    ```graphql
    type Todo @model {
      id: ID!
      name: String!
      description: String
    }
    ```

2. This is a good start but let’s take it a step further by adding a completion flag to our Todo items.

    <inline-fragment src="~/start/getting-started/fragments/flutter/blocks/generate-model-graphql-model.md"></inline-fragment>

3. Generate the Dart models for the Flutter app to use.
    ```bash
    amplify codegen models
    ```
