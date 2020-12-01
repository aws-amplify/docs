<amplify-block-switcher>
<amplify-block name="Java">

```java
Post post = Post.builder()
    .title("My First Post")
    .build();

User editor = User.builder()
    .username("Nadia")
    .build();

PostEditor postEditor = PostEditor.builder()
    .post(post)
    .editor(editor)
    .build();

Amplify.DataStore.save(post,
    savedPost -> {
        Log.i("MyAmplifyApp", "Post saved.");
        Amplify.DataStore.save(editor,
            savedEditor -> {
                Log.i("MyAmplifyApp", "Editor saved.");
                Amplify.DataStore.save(postEditor,
                    saved -> Log.i("MyAmplifyApp", "PostEditor saved."),
                    failure -> Log.e("MyAmplifyApp", "PostEditor not saved.", failure)
                );
            },
            failure -> Log.e("MyAmplifyApp", "Editor not saved.", failure)
        );
    },
    failure -> Log.e("MyAmplifyApp", "Post not saved.", failure)
);
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
val post = Post.builder()
    .title("My First Post")
    .build()

val editor = User.builder()
    .username("Nadia")
    .build()

val postEditor = PostEditor.builder()
        .post(post)
        .editor(editor)
        .build()

Amplify.DataStore.save(post,
    {
        Log.i("MyAmplifyApp", "Post saved.")
        Amplify.DataStore.save(editor,
            {
                Log.i("MyAmplifyApp", "Editor saved.")
                Amplify.DataStore.save(postEditor,
                    { Log.i("MyAmplifyApp", "PostEditor saved.") },
                    { Log.e("MyAmplifyApp", "PostEditor not saved.", it) }
                )
            },
            { Log.e("MyAmplifyApp", "Editor not saved.", it) }
        )
    },
    { Log.e("MyAmplifyApp", "Post not saved.", it) }
)
```

</amplify-block>
<amplify-block name="RxJava">

```java
Post post = Post.builder()
    .title("My First Post")
    .build();

User editor = User.builder()
    .username("Nadia")
    .build();

PostEditor postEditor = PostEditor.builder()
    .post(post)
    .editor(editor)
    .build();

Completable.mergeArray(
    RxAmplify.DataStore.save(post),
    RxAmplify.DataStore.save(editor)
).andThen(
    RxAmplify.DataStore.save(postEditor)
).subscribe(
    () -> Log.i("MyAmplifyApp", "Post, Editor, and PostEditor saved."),
    failure -> Log.e("MyAmplifyApp", "Item not saved.", failure)
);
```

</amplify-block>
</amplify-block-switcher>

<amplify-callout>

This example illustrates the complexity of working with multiple dependent persistence operations. The callback model is flexible but imposes some challenges when dealing with such scenarios.

We are aware of this limitation and we are evaluating possible solutions. In the meantime, the recommendation is that you use multiple methods to simplify the code and feel free to provide feedback and ideas in our [GitHub Issues](https://github.com/aws-amplify/amplify-android/issues).

</amplify-callout>
