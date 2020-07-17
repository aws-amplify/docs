<amplify-block-switcher>
<amplify-block name="Java">

```java
Post post = Post.builder()
    .title("My First Post")
    .rating(10)
    .status(PostStatus.PUBLISHED)
    .build();

Amplify.DataStore.save(post,
    saved -> Log.i("MyAmplifyApp", "Saved a post."),
    failure -> Log.e("MyAmplifyApp", "Save failed.", failure)
);
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
val post = Post.builder()
    .title("My First Post")
    .rating(10)
    .status(PostStatus.PUBLISHED)
    .build()

Amplify.DataStore.save(post,
    { Log.i("MyAmplifyApp", "Saved a post.") },
    { Log.e("MyAmplifyApp", "Save failed.", it) }
)
```

</amplify-block>
</amplify-block-switcher>
