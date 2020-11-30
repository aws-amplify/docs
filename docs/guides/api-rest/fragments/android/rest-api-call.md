```kotlin
fun getMessage() {
    val options = RestOptions.builder()
        .addPath("/hello")
        .build()

    Amplify.API.get(options,
        { Log.i("MyAmplifyApp", "GET succeeded: $it") },
        { Log.e("MyAmplifyApp", "GET failed.", it) }
    )
}
```
