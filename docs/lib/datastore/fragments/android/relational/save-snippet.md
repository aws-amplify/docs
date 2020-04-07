```java
Post post = Post.builder()
    .title("My Post with comments")
    .status(PostStatus.ACTIVE)
    .build();

Amplify.DataStore.save(post,
    savedPost -> {
        Log.i("GetStarted", "Post saved.");
        Comment comment = Comment.builder()
            .content("Loving Amplify DataStore!")
            .post(post) // Directly pass in the post instance
            .build();
        Amplify.DataStore.save(comment,
            savedComment -> Log.i("GetStarted", "Comment saved."),
            failure -> Log.e("GetStarted", "Comment not saved.", failure)
        );
    },
    failure -> Log.e("GetStarted", "Post not saved.", failure)
);
```
