```dart
try {
    String graphQLDocument =
        '''mutation CreateTodo(\$name: String!, \$description: String) {
              createTodo(input: {name: \$name, description: \$description}) {
                id
                name
                description
              }
        }''';
    var variables = {
      "name": "my first todo",
      "description": "todo description",
    };
    var request = GraphQLRequest<String>(document: graphQLDocument, variables: variables);

    var operation = Amplify.API.mutate(request: request);
    var response = await operation.response;

    var data = response.data;
    
    print('Mutation result: ' + data);
} on ApiException catch (e) {
    print('Mutation failed: $e');
}
```