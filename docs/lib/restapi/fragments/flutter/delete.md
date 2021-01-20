## DELETE requests

```dart
try {
    RestOptions options = RestOptions(
        path: "/todo"
    );
    RestOperation restOperation = Amplify.API.delete(
        restOptions: options
    );
    RestResponse response = await restOperation.response
    print("DELETE call succeeded"); 
    print(new String.fromCharCodes(response.data));
} catch(error) {
    print("DELETE call failed: $error");
}
```

