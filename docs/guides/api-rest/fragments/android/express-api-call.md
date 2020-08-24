To make a GET request, first create a RestOptions object and then use the Amplify.API.get api to issue the request:

```kotlin
void getItems() {
    RestOptions options = new RestOptions("/items");

    Amplify.API.get(options,
            restResponse -> Log.i("MyAmplifyApp", restResponse.toString()),
            apiFailure -> Log.e("MyAmplifyApp", apiFailure.getMessage(), apiFailure)
    );
}
```