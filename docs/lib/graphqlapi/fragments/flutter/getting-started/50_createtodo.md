```dart
try{
    String graphQLDocument = '''mutation MyMutation(\$name: String!) {
      createBlog(input: {name: \$name}) {
        id
        name
        createdAt
      }
    }''';
    
    var operation = await Amplify.API.mutate(
        request: GraphQLRequest<String>(
            document: graphQLDocument, variables: {"name": "Test App Blog"}))
    var response = await operation.response
    print('Mutate SUCCESS')
} on Exception catch(e) {
    print('Mutate FAILED')
}
```