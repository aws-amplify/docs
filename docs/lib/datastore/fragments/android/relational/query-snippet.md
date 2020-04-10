```java
Amplify.DataStore.query(Comment.class, Post.ID.eq("123"),
    matches -> {
        while (matches.hasNext()) {
            Comment comment = matches.next();
            Log.i("GetStarted", "Content: " + comment.getContent());
        }
    },
    failure -> Log.e("GetStarted", "Query failed.", failure)
);
```
