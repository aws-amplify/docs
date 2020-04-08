```java
Amplify.DataStore.query(Post.class, Post.ID.eq("123"),
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
