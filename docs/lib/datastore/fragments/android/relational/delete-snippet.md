<amplify-block-switcher>
<amplify-block name="Java">

```java
Amplify.DataStore.query(Post.class, Where.id("123"),
    match -> {
        if (match.hasNext()) {
            Post post = match.next();
            Amplify.DataStore.delete(post,
                deleted -> Log.i("GetStarted", "Post deleted."),
                failure -> Log.e("GetStarted", "Delete failed.", failure)
            );
        }
    },
    failure -> Log.e("GetStarted", "Query failed.", failure)
);
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
Amplify.DataStore.query(Post::class.java, Where.id("123"),
    { match ->
        if (match.hasNext()) {
            val post: Post = match.next()
            Amplify.DataStore.delete(post,
                { Log.i("GetStarted", "Post deleted.") },
                { failure -> Log.e("GetStarted", "Delete failed.", failure) }
            )
        }
    },
    { failure -> Log.e("GetStarted", "Query failed.", failure) }
)
```

</amplify-block>
</amplify-block-switcher>
