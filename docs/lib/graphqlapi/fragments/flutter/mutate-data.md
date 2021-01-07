## Run a mutation

Now that the client is set up, you can run a GraphQL mutation with `Amplify.API.mutate` to create, update, and delete your data.

```dart
try {
    String graphQLDocument = '''mutation createTodo(\$input: CreateTodoInput!) {
      createTodo(input: \$input) {
        id
        name
        description
      }
    }''';

    var operation = Amplify.API.mutate(
        request: GraphQLRequest<String>(
            document: graphQLDocument,
            variables: {
              "name": "my first todo",
              "description": "todo description"
            }
        )
    );

    var response = await operation.response;
    var data = response.data;
    
    print("Mutate SUCCESS");
} catch(e) {
    print("Mutate FAILED");
}
```