## PUT requests

To update an item via the API endpoint:

<amplify-block-switcher>
<amplify-block name="Java">

```java
RestOptions options = RestOptions.builder()
    .addPath("/todo/1")
    .addBody("{\"name\":\"Mow the lawn\"}".getBytes())
    .build();

Amplify.API.put(options,
    response -> Log.i("MyAmplifyApp", "PUT succeeded: " + response),
    error -> Log.e("MyAmplifyApp", "PUT failed.", error)
);
```

</amplify-block>
<amplify-block name="Kotlin - Callbacks">

```kotlin
val request = RestOptions.builder()
    .addPath("/todo/1")
    .addBody("{\"name\":\"Mow the lawn\"}".getBytes())
    .build()

Amplify.API.put(request,
    { Log.i("MyAmplifyApp", "PUT succeeded: $it") },
    { Log.e("MyAmplifyApp", "PUT failed", it) }
)
```

</amplify-block>
<amplify-block name="Kotlin - Coroutines (Beta)">

```kotlin
val request = RestOptions.builder()
    .addPath("/todo/1")
    .addBody(JSONObject()
        .put("name", "Mow the lawn")
        .toString()
        .toByteArray())
    .build()
try {
    val response = Amplify.API.put(request)
    Log.i("MyAmplifyApp", "PUT succeeded: $response")
} catch (error: ApiException) {
    Log.e("MyAmplifyApp", "PUT failed", it)
}
```

</amplify-block>
<amplify-block name="RxJava">

```java
RestOptions options = RestOptions.builder()
    .addPath("/todo/1")
    .addBody("{\"name\":\"Mow the lawn\"}".getBytes())
    .build();

RxAmplify.API.put(options)
    .subscribe(
          response -> Log.i("MyAmplifyApp", "PUT succeeded: " + response),
          error -> Log.e("MyAmplifyApp", "PUT failed.", error)
    );
```

</amplify-block>
</amplify-block-switcher>
