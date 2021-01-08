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

    var operation = Amplify.API.mutate(
        request: GraphQLRequest<String>(document: graphQLDocument, variables: {
      "name": "my first todo",
      "description": "todo description",
    }));

    var response = await operation.response;
    var data = response.data;
    
    print('Mutation result: ' + data);
} catch(e) {
    print(e);
}
```