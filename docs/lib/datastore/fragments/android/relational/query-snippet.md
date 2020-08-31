<amplify-block-switcher>
<amplify-block name="Java">

```java
Amplify.DataStore.query(Comment.class, Post.STATUS.eq(PostStatus.ACTIVE),
    matches -> {
        while (matches.hasNext()) {
            Comment comment = matches.next();
            Log.i("MyAmplifyApp", "Content: " + comment.getContent());
        }
    },
    failure -> Log.e("MyAmplifyApp", "Query failed.", failure)
);
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
Amplify.DataStore.query(Comment::class.java, Where.matches(Post.STATUS.eq(PostStatus.ACTIVE)),
    {
        while (it.hasNext()) {
            val comment: Comment = it.next()
            val content: String = comment.content
            Log.i("MyAmplifyApp", "Content: $content")
        }
    },
    { Log.e("MyAmplifyApp", "Query failed.", it) }
)
```

</amplify-block>
<amplify-block name="RxJava">

```java
RxAmplify.DataStore.query(Comment.class, Post.STATUS.eq(PostStatus.ACTIVE))
    .subscribe(
        comment -> Log.i("MyAmplifyApp", "Content: " + comment.getContent()),
        failure -> Log.e("MyAmplifyApp", "Query failed.", failure)
    );
```

</amplify-block>
</amplify-block-switcher>
