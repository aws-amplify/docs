To make a GET request, first create a RestOptions object and then use the Amplify.API.get api to issue the request:

```kotlin
fun getItems() {
    val options = RestOptions.builder()
        .addPath("/items")
        .build()

    Amplify.API.get(options,
        { Log.i("MyAmplifyApp", "GET succeeded: $it") },
        { Log.e("MyAmplifyApp", "GET failed.", it) }
    )
}
```
