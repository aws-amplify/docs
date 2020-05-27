## DELETE requests

<amplify-block-switcher>
<amplify-block name="Java">

```java
RestOptions options = RestOptions.builder()
        .addPath("/todo/1")
        .build();

Amplify.API.delete(options,
        response -> Log.i("MyAmplifyApp", response.getData().asString()),
        error -> Log.e("MyAmplifyApp", "DELETE failed", error)
);
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
val options: RestOptions = RestOptions.builder()
    .addPath("/todo/1")
    .build()

Amplify.API.delete(options,
    { response -> Log.i("MyAmplifyApp", response.data.asString()) },
    { error -> Log.e("MyAmplifyApp", "DELETE failed", error) }
)
```

</amplify-block>
</amplify-block-switcher>