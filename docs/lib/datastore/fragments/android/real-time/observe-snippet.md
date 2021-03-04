<amplify-block-switcher>
<amplify-block name="Java">

```java
Amplify.DataStore.observe(Post.class,
    cancelable -> Log.i("MyAmplifyApp", "Observation began."),
    postChanged -> {
        Post post = postChanged.item();
        Log.i("MyAmplifyApp", "Post: " + post);
    },
    failure -> Log.e("MyAmplifyApp", "Observation failed.", failure),
    () -> Log.i("MyAmplifyApp", "Observation complete.")
);
```

</amplify-block>
<amplify-block name="Kotlin - Callbacks">

```kotlin
Amplify.DataStore.observe(Post::class.java,
    { Log.i("MyAmplifyApp", "Observation began") },
    {
        val post = postChanged.item()
        Log.i("MyAmplifyApp", "Post: $post")
    },
    { Log.e("MyAmplifyApp", "Observation failed", it) },
    { Log.i("MyAmplifyApp", "Observation complete") }
)
```

</amplify-block>
<amplify-block name="Kotlin - Coroutines (Beta)">

```kotlin
Amplify.DataStore.observe(Post::class)
    .onStart { Log.i("MyAmplifyApp", "Observation began") }
    .catch { Log.e("MyAmplifyApp", "Observation failed", it) }
    .onCompletion { Log.i("MyAmplifyApp", "Observation complete") }
    .collect { Log.i("MyAmplifyApp", "Post: ${it.item()}") }
```

</amplify-block>
<amplify-block name="RxJava">

```java
RxAmplify.DataStore.observe(Post.class)
    .subscribe(
        post -> Log.i("MyAmplifyApp", "Post: " + post),
        failure -> Log.e("MyAmplifyApp", "Observation failed.", failure),
        () -> Log.i("MyAmplifyApp", "Observation complete.")
    );
```

</amplify-block>
</amplify-block-switcher>
