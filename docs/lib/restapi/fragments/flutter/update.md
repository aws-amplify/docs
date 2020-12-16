## PUT requests

To update an item via the API endpoint:

```dart
try{
    RestOptions options = RestOptions(
        path: "/todo/1",
        body: Uint8List.fromList("{\"name\":\"Mow the lawn\"}".codeUnits)
    );
    RestOperation restOperation = Amplify.API.put(
        restOptions: options
    );
    RestResponse response = await restOperation.response;
    Log.i("MyAmplifyApp", "PUT succeeded: " + response);
} on Exception catch(e) {
    Log.e("MyAmplifyApp", "PUT failed.", error);
}
```
