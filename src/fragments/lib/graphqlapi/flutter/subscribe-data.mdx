Subscribe to mutations for creating real-time clients.  

## Setup subscription with callbacks

To listen to create mutations, you can use the following code sample:

```dart
try {
    String graphQLDocument = '''subscription OnCreateTodo {
        onCreateTodo {
          id
          name
          description
        }
      }''';
    
    var operation = Amplify.API.subscribe(
        request: GraphQLRequest<String>(document: graphQLDocument),
        onData: (event) {
          print('Subscription event data received: ${event.data}');
        },
        onEstablished: () {
          print('Subscription established');
        },
        onError: (e) {
          print('Subscription failed with error: $e');
        },
        onDone: () {
          print('Subscription has been closed successfully');
        });
} on ApiException catch (e) {
    print('Failed to establish subscription: $e');
}
```

## Unsubscribe from updates

To unsubscribe from updates, you can call `cancel()` on the subscription operation

```dart
// Cancel the subscription when you're finished with it
operation.cancel();
```
