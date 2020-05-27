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
