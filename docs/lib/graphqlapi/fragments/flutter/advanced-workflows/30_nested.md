```dart
try {
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

    var operation = Amplify.API.query<String>(
        request: GraphQLRequest(
            document: graphQLDocument,
            variables: {"id": "[TODO_ID]"}
        )
    );

    var response = await operation.response;
    var data = response.data;

    print("Query SUCCESS");
} catch(e) {
    print("Query FAILED");
}
```