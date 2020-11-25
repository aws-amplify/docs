<amplify-block-switcher>
<amplify-block name="Java">

```java
RestOptions options = RestOptions.builder()
    .addPath("/todo")
    .addBody("{\"name\":\"Mow the lawn\"}".getBytes())
    .build();

Amplify.API.post(options,
    response -> Log.i("MyAmplifyApp", "POST succeeded: " + response),
    error -> Log.e("MyAmplifyApp", "POST failed.", error)
);
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
val options = RestOptions.builder()
    .addPath("/todo")
    .addBody("{\"name\":\"Mow the lawn\"}".toByteArray())
    .build()

Amplify.API.post(options,
    { Log.i("MyAmplifyApp", "POST succeeded: $it") },
    { Log.e("MyAmplifyApp", "POST failed.", it) }
)
```

</amplify-block>
<amplify-block name="RxJava">

```java
RestOptions options = RestOptions.builder()
    .addPath("/todo")
    .addBody("{\"name\":\"Mow the lawn\"}".getBytes())
    .build();

RxAmplify.API.post(options)
    .subscribe(
        response -> Log.i("MyAmplifyApp", "POST succeeded: " + response),
        error -> Log.e("MyAmplifyApp", "POST failed.", error)
    );
```

</amplify-block>
</amplify-block-switcher>
