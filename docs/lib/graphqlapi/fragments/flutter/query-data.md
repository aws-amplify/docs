## Query item

Now that you were able to make a mutation, take the `Id` that was printed out and use it in your query to retrieve data.

```dart
try{
    String graphQLDocument = '''query getTodo(id: \$todoId) {
      getTodo(id: \$todoId) {
        id
        name
        description
      }
    }''';

    var operation = await Amplify.API.query<String>(
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
} on Exception catch(e) {
    print("Query FAILED");
}
```

## List items

You can get the list of items in `Amplify.API.query`:

```dart
try{
    String graphQLDocument = '''query GetTodos {
      listTodos {
        items {
          id
          name
          description
        }
      }
    }''';

    var operation = await Amplify.API.query<String>(
        request: GraphQLRequest(
            document: graphQLDocument, 
        )
    );

    var response = await operation.response;
    var data = response.data;

    print("Query SUCCESS");
} on Exception catch(e) {
    print("Query FAILED");
}
```