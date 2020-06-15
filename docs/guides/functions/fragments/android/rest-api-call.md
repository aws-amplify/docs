```kotlin
void getMessage() {
    RestOptions options = new RestOptions("/hello");

    Amplify.API.get(options,
            restResponse -> Log.i("Success", restResponse.toString()),
            apiFailure -> Log.e("Failed", apiFailure.getMessage(), apiFailure)
    );
}
```