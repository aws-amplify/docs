```dart
try {
    RestOptions options = RestOptions(
        path: '/todo'
        body: Uint8List.fromList('{\'name\':\'Mow the lawn\'}'.codeUnits)
    );
    RestOperation restOperation = Amplify.API.post(
        restOptions: options
    );
    RestResponse response = await restOperation.response;
    print('POST call succeeded');
    print(new String.fromCharCodes(response.data));
} on ApiException catch (e) {
    print('POST call failed: $e');
}
```
