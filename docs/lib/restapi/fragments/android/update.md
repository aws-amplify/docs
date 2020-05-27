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
        response -> Log.i("MyAmplifyApp", "PUT " + response.getData().asString()),
        error -> Log.e("MyAmplifyApp", "PUT failed", error)
);
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
val options: RestOptions = RestOptions.builder()
    .addPath("/todo/1")
    .addBody("{\"name\":\"Mow the lawn\"}".toByteArray())
    .build()

Amplify.API.put(options,
    { response -> Log.i("MyAmplifyApp", "PUT " + response.data.asString()) },
    { error -> Log.e("MyAmplifyApp", "PUT failed", error) }
)
```

</amplify-block>
</amplify-block-switcher>