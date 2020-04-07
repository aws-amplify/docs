```java
Post post = Post.builder()
    .title("My First Post")
    .rating(10)
    .status(PostStatus.ACTIVE)
    .build();

Amplify.DataStore.save(post,
    saved -> Log.i("GetStarted", "Saved a post."),
    failure -> Log.e("GetStarted", "Save failed.", failure)
);
```
