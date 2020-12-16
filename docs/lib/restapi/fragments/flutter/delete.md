## DELETE requests

```dart
try{
    RestOptions options = RestOptions(
        path: "/todo"
    );
    RestOperation restOperation = Amplify.API.delete(
        restOptions: options
    );
    RestResponse response = await restOperation.response;
    Log.i("MyAmplifyApp", "DELETE succeeded: " + response);
} on Exception catch(e) {
    Log.e("MyAmplifyApp", "DELETE failed.", error);
}
```

