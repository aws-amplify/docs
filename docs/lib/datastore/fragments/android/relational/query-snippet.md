<amplify-block-switcher>
<amplify-block name="Java">

```java
Amplify.DataStore.query(Comment.class, Post.STATUS.eq(PostStatus.ACTIVE),
    matches -> {
        while (matches.hasNext()) {
            Comment comment = matches.next();
            Log.i("GetStarted", "Content: " + comment.getContent());
        }
    },
    failure -> Log.e("GetStarted", "Query failed.", failure)
);
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
Amplify.DataStore.query(Comment::class.java, Where.matches(Post.STATUS.eq(PostStatus.ACTIVE)),
    { matches ->
        while (matches.hasNext()) {
            val comment: Comment = matches.next()
            val content: String = comment.content
            Log.i("GetStarted", "Content: $content")
        }
    },
    { failure -> Log.e("GetStarted", "Query failed.", failure) }
)
```

</amplify-block>
</amplify-block-switcher>
