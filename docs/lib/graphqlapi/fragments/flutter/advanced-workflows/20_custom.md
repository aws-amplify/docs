```dart
try {
    String graphQLDocument = '''query getTodo(id: \$todoId) {
      getTodo(id: \$todoId) {
        id
        name
        description
      }
    }''';

    var operation = Amplify.API.query<String>(
        request: GraphQLRequest(
            document: graphQLDocument, 
            variables: {
              "todoId": todoId,
            }
        )
    );

    var response = await operation.response;
    var data = response.data;

    print("Query SUCCESS");
} catch(e) {
    print("Query FAILED");
}
```