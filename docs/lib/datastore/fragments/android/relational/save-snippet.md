<amplify-block-switcher>
<amplify-block name="Java">

```java
Post post = Post.builder()
    .title("My Post with comments")
    .rating(10)
    .status(PostStatus.ACTIVE)
    .build();

Comment comment = Comment.builder()
    .post(post) // Directly pass in the post instance
    .content("Loving Amplify DataStore!")
    .build();

Amplify.DataStore.save(post,
    savedPost -> {
        Log.i("MyAmplifyApp", "Post saved.");
        Amplify.DataStore.save(comment,
            savedComment -> Log.i("MyAmplifyApp", "Comment saved."),
            failure -> Log.e("MyAmplifyApp", "Comment not saved.", failure)
        );
    },
    failure -> Log.e("MyAmplifyApp", "Post not saved.", failure)
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

val comment = Comment.builder()
    .post(post) // Directly pass in the post instance
    .content("Loving Amplify DataStore!")
    .build()

Amplify.DataStore.save(post,
    {
        Log.i("MyAmplifyApp", "Post saved.")
        Amplify.DataStore.save(comment,
            { Log.i("MyAmplifyApp", "Comment saved.") },
            { Log.e("MyAmplifyApp", "Comment not saved.", it) }
        )
    },
    { Log.e("MyAmplifyApp", "Post not saved.", it) }
)
```

</amplify-block>
</amplify-block-switcher>
