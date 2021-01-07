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
    print("Delete SUCCESS");
} catch(e) {
    print("Delete FAILED");
}
```

