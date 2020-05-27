<amplify-block-switcher>
<amplify-block name="Java">

```java
Post post = Post.builder()
    .title("My Post with comments")
    .rating(10)
    .status(PostStatus.ACTIVE)
    .build();

Amplify.DataStore.save(post,
    savedPost -> {
        Log.i("GetStarted", "Post saved.");
        Comment comment = Comment.builder()
            .post(post) // Directly pass in the post instance
            .content("Loving Amplify DataStore!")
            .build();
        Amplify.DataStore.save(comment,
            savedComment -> Log.i("GetStarted", "Comment saved."),
            failure -> Log.e("GetStarted", "Comment not saved.", failure)
        );
    },
    failure -> Log.e("GetStarted", "Post not saved.", failure)
);
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
val post = Post.builder()
    .title("My Post with comments")
    .rating(10)
    .status(PostStatus.ACTIVE)
    .build()

Amplify.DataStore.save(post,
    {
        Log.i("GetStarted", "Post saved.")
        val comment = Comment.builder()
            .post(post) // Directly pass in the post instance
            .content("Loving Amplify DataStore!")
            .build()
        Amplify.DataStore.save(comment,
            { Log.i("GetStarted", "Comment saved.") },
            { failure -> Log.e("GetStarted", "Comment not saved.", failure) }
        )
    },
    { failure -> Log.e("GetStarted", "Post not saved.", failure) }
)
```

</amplify-block>
</amplify-block-switcher>
