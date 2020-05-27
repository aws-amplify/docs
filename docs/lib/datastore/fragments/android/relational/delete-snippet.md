<amplify-block-switcher>
<amplify-block name="Java">

```java
Amplify.DataStore.query(Post.class, Where.id("123"),
    match -> {
        if (match.hasNext()) {
            Post post = match.next();
            Amplify.DataStore.delete(post,
                deleted -> Log.i("MyAmplifyApp", "Post deleted."),
                failure -> Log.e("MyAmplifyApp", "Delete failed.", failure)
            );
        }
    },
    failure -> Log.e("MyAmplifyApp", "Query failed.", failure)
);
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
Amplify.DataStore.query(Post::class.java, Where.id("123"),
    { matches ->
        if (matches.hasNext()) {
            val post: Post = matches.next()
            Amplify.DataStore.delete(post,
                { Log.i("MyAmplifyApp", "Post deleted.") },
                { Log.e("MyAmplifyApp", "Delete failed.", it) }
            )
        }
    },
    { Log.e("MyAmplifyApp", "Query failed.", it) }
)
```

</amplify-block>
</amplify-block-switcher>
