## Run a mutation

Now that the client is set up, you can run a GraphQL mutation with `Amplify.API.mutate` to create, update, and delete your data.

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
      'name': 'my first todo',
      'description': 'todo description',
    }));

    var response = await operation.response;
    var data = response.data;
    
    print('Mutation result: ' + data);
} on ApiException catch (e) {
  print('Mutation failed: $e');
}
```

The response data will be a JSON String that looks like this:

```json
{
  "createTodo": {
    "name": "my first todo",
    "id": "4422c06e-3f93-4db1-87c4-571f87e656a0",
    "description": "todo description"
  }
}
```

You can decode the data to a Map and access the attributes as needed:

```dart
// Decode the data into a Map
Map result = json.decode(response.data);
Map todoMap = result['createTodo'];

// Access the attributes
final id = todoMap['id'];
print('Todo id: $id');
```