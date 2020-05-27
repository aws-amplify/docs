<amplify-block-switcher>
<amplify-block name="Java">

```java
Amplify.DataStore.observe(Post.class,
    cancelable -> Log.i("GetStarted", "Observation began."),
    postChanged -> {
        Post post = postChanged.item();
        Log.i("GetStarted", "Post: " + post);
    },
    failure -> Log.e("GetStarted", "Observation failed.", failure),
    () -> Log.i("GetStarted", "Observation complete.")
);
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
Amplify.DataStore.observe(Post::class.java,
    { Log.i("GetStarted", "Observation began.") },
    { postChanged ->
        val post = postChanged.item
        Log.i("GetStarted", "Post: $post")
    },
    { failure -> Log.e("GetStarted", "Observation failed.", failure) },
    { Log.i("GetStarted", "Observation complete.") }
)
```

</amplify-block>
</amplify-block-switcher>
