```java
Post post = Post.builder()
    .title("My First Post")
    .status(PostStatus.ACTIVE)
    .build();

User editor = User.builder()
    .username("Nadia")
    .build();

Amplify.DataStore.save(post,
    savedPost -> {
        Log.i("GetStarted", "Post saved.");

        Amplify.DataStore.save(editor,
            savedEditor -> {
                Log.i("GetStarted", "Editor saved.");
                PostEditor postEditor = PostEditor.builder()
                    .post(post)
                    .editor(editor)
                    .build();
                Amplify.DataStore.save(postEditor,
                    saved -> Log.i("GetStarted", "PostEditor saved."),
                    failure -> Log.e("GetStarted", "PostEditor not saved.", failure)
                );
            },
            failure -> Log.e("GetStarted", "Editor not saved.", failure)
        );
    },
    failure -> Log.e("GetStarted", "Post not saved.", failure)
);
```

<amplify-callout>

This example illustrates the complexity of working with multiple dependent persistence operations. The callback model is flexible but imposes some challenges when dealing with such scenarios.

We are aware of this limitation and we are evaluating possible solutions. In the meantime, the recommendation is that you use multiple methods to simplify the code and feel free to provide feedback and ideas in our [GitHub Issues](https://github.com/aws-amplify/amplify-android/issues).

</amplify-callout>
