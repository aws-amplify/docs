## DELETE requests

<amplify-block-switcher>
<amplify-block name="Java">

```java
RestOptions options = RestOptions.builder()
    .addPath("/todo/1")
    .build();

Amplify.API.delete(options,
    response -> Log.i("MyAmplifyApp", "DELETE succeeded: " + response),
    error -> Log.e("MyAmplifyApp", "DELETE failed.", error)
);
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
val request = RestOptions.builder()
    .addPath("/todo/1")
    .build()
try {
    val response = Amplify.API.delete(request)
    Log.i("MyAmplifyApp", "DELETE succeeded: $response")
} catch (error: ApiException) {
    Log.e("MyAmplifyApp", "DELETE failed", error)
}
```

</amplify-block>
<amplify-block name="RxJava">

```java
RestOptions options = RestOptions.builder()
    .addPath("/todo/1")
    .build();

RxAmplify.API.delete(options)
    .subscribe(
        response -> Log.i("MyAmplifyApp", "DELETE succeeded: " + response),
        error -> Log.e("MyAmplifyApp", "DELETE failed.", error)
    );
```

</amplify-block>
</amplify-block-switcher>
