```dart
try{
    String graphQLDocument = '''query getPost(\$id: ID!) {
        "getTodo(id: \$id) {
            "id
            "title
            "rating
            "status
            "comments {
                "items {
                    "id
                    "postID
                    "content
                }
            }
        }
    }''';

    var operation = await Amplify.API
        .query<String>(request: GraphQLRequest(
        document: graphQLDocument,
        variables: {"id": "[TODO_ID]"});

    var response = await operation.response;
    var data = response.data;

    print("Query SUCCESS");
} on Exception catch(e) {
    print("Query FAILED");
}
```