## Query item

Now that you were able to make a mutation, take the `id` that was printed out and use it in your query to retrieve data.

```dart
try {
    String graphQLDocument = '''query GetTodo(\$id: ID!) {
      getTodo(id: \$id) {
        id
        name
        description
      }
    }''';

    var operation = Amplify.API.query(
        request: GraphQLRequest<String>(
            document: graphQLDocument,
            variables: {'id': '8e0dd2fc-2f4a-4dc4-b47f-2052eda10775'}));

    var response = await operation.response;
    var data = response.data;

    print('Query result: ' + data);
} on ApiException catch (e) {
    print('Query failed: $e');
}
```

## List items

You can get the list of items in `Amplify.API.query`:

```dart
try {
    String graphQLDocument = '''query ListTodos {
      listTodos {
        items {
          id
          name
          description
        }
        nextToken
      }
    }''';

    var operation = Amplify.API.query(
        request: GraphQLRequest<String>(
      document: graphQLDocument,
    ));

    var response = await operation.response;
    var data = response.data;

    print('Query result: ' + data);
} on ApiException catch (e) {
    print('Query failed: $e');
}
```