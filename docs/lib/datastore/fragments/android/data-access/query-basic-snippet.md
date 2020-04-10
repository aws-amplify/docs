```java
Amplify.DataStore.query(Post.class,
    allPosts -> {
        while (allPosts.hasNext()) {
            Post post = allPosts.next();
            Log.i("GetStarted", "Title: " + post.getTitle());
        }
    },
    failure -> Log.e("GetStarted", "Query failed.", failure)
);
```
