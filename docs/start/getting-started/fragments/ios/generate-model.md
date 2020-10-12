With the basic setup complete, next you will model the data your application will store. Amplify DataStore will use this model to persist data to your local device that will be synchronized to a backend API without writing any additional code. These models are specified as [GraphQL](http://graphql.org/) schemas. If you'd like, first [learn more](~/cli/graphql-transformer/overview.md) about GraphQL schemas and data modeling.

1. In Xcode, make sure the project navigator is displayed. You can use **Cmd+1** to switch to this view. **Open the schema file** located at **Todo** > **AmplifyConfig** > **schema.graphql**. In your project folder, this file is located at `"amplify/backend/api/amplifyDatasource/schema.graphql"`.

    Replace the contents of the file with the following schema:

    ```graphql
    enum Priority {
      LOW
      NORMAL
      HIGH
    }

    type Todo @model {
      id: ID!
      name: String!
      priority: Priority
      description: String
    }
    ```

    This schema creates a model called `Todo` with four properties:

    - **id** an auto-generated identifier field for a Todo item
    - **name** a non-optional string field that is the title of the Todo item
    - **priority** an optional enumeration type field that indicates the importance of a Todo item; the value of priority can be only *LOW*, *NORMAL*, or *HIGH*
    - **description** an optional string field that holds more information about a Todo item

1. Next, generate the classes for these models and add them to your Xcode project. **Run the command**:
  ```bash
  amplify codegen models && amplify-app
  ```

1. Now that the generated models has been added to your project, you will need to **build (`Cmd+b`)** to compile the newly generated files.
