```dart
try{
    RestOptions options = RestOptions(
        path: "/todo"
        body: Uint8List.fromList("{\"name\":\"Mow the lawn\"}".codeUnits)
    );
    RestOperation restOperation = Amplify.API.post(
        restOptions: options
    );
    RestResponse response = await restOperation.response;
    Log.i("MyAmplifyApp", "POST succeeded: " + response);
} on Exception catch(e) {
    Log.e("MyAmplifyApp", "POST failed.", error);
}
```
