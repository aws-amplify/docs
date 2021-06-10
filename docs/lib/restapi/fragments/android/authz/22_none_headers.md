If you would like to add request headers, you can add it directly to the request

<amplify-block-switcher>
<amplify-block name="Java">

This implementation uses `CompletableFuture<T>`, which requires `minSdkVersion >= 24`.

```java
RestOptions options = RestOptions.builder()
    .addHeaders(Collections.singletonMap("key", "value"))
    .build();
```

</amplify-block>
<amplify-block name="Kotlin - Callbacks">

This implementation uses `CompletableFuture<T>`, which requires `minSdkVersion >= 24`.

```kotlin
val options = RestOptions.builder()
    .addHeaders(mapOf("key" to "value"))
    .build()
```

</amplify-block>
<amplify-block name="Kotlin - Coroutines (Beta)">

This implementation uses `CompletableFuture<T>`, which requires `minSdkVersion >= 24`.

```kotlin
val request = RestOptions.builder()
    .addHeaders(mapOf("key" to "value"))
    .build()
```

</amplify-block>
<amplify-block name="RxJava">

```
RestOptions options = RestOptions.builder()
    .addHeaders(Collections.singletonMap("key", "value"))
    .build();
```
</amplify-block>
</amplify-block-switcher>
