To specify your own headers, use the `configureClient()` configuration option on the `AWSApiPlugin`'s builder. Specify the name of one of the configured APIs in your **amplifyconfiguration.json**. Apply customizations to the underlying OkHttp instance by providing a lambda expression as below.

<amplify-block-switcher>
<amplify-block name="Java">

```java
AWSApiPlugin plugin = AWSApiPlugin.builder()
    .configureClient("yourApiName", okHttpBuilder -> {
        okHttpBuilder.addInterceptor(chain -> {
            Request originalRequest = chain.request();
            Request updatedRequest = originalRequest.newBuilder()
                .addHeader("customHeader", "someValue")
                .build();
            return chain.proceed(updatedRequest);
        });
    })
    .build();
Amplify.addPlugin(plugin);
```

</amplify-block>
<amplify-block name="Kotlin - Callbacks">

```kotlin
val plugin = AWSApiPlugin.builder()
    .configureClient("yourApiName") { okHttpBuilder ->
        okHttpBuilder.addInterceptor { chain ->
            val originalRequest = chain.request()
            val updatedRequest = originalRequest.newBuilder()
                .addHeader("customHeader", "someValue")
                .build()
            chain.proceed(updatedRequest)
        }
    }
    .build()
Amplify.addPlugin(plugin)
```

</amplify-block>
<amplify-block name="Kotlin - Coroutines (Beta)">

```kotlin
val plugin = AWSApiPlugin.builder()
    .configureClient("yourApiName") { okHttpBuilder ->
        okHttpBuilder.addInterceptor { chain ->
            val originalRequest = chain.request()
            val updatedRequest = originalRequest.newBuilder()
                .addHeader("customHeader", "someValue")
                .build()
            chain.proceed(updatedRequest)
        }
    }
    .build()
Amplify.addPlugin(plugin)
```

</amplify-block>
<amplify-block name="RxJava">

```java
AWSApiPlugin plugin = AWSApiPlugin.builder()
    .configureClient("yourApiName", okHttpBuilder -> {
        okHttpBuilder.addInterceptor(chain -> {
            Request originalRequest = chain.request();
            Request updatedRequest = originalRequest.newBuilder()
                .addHeader("customHeader", "someValue")
                .build();
            return chain.proceed(updatedRequest);
        });
    })
    .build();
RxAmplify.addPlugin(plugin);
```

</amplify-block>
</amplify-block-switcher>
