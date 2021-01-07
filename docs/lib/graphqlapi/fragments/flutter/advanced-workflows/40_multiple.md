```dart
try {
    String graphQLDocument = '''query get(\$postId: ID!, \$todoId: ID!) {
          getPost(id: \$postId) {
            id
            title
            rating
          }
          getTodo(id: \$todoId) {
            id
            name
          }
        }''';

    var operation = Amplify.API.query<String>(
      request: GraphQLRequest(
        document: graphQLDocument,
        variables: {
            "postId" : "[POST_ID]", 
            "todoId" : "[TODO_ID]"
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