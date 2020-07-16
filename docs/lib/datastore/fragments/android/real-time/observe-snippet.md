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
<amplify-block name="Kotlin">

```kotlin
Amplify.DataStore.observe(Post::class.java,
    { Log.i("MyAmplifyApp", "Observation began.") },
    { Log.i("MyAmplifyApp", "Post: ${it.item()}") },
    { Log.e("MyAmplifyApp", "Observation failed.", it) },
    { Log.i("MyAmplifyApp", "Observation complete.") }
)
```

</amplify-block>
</amplify-block-switcher>
