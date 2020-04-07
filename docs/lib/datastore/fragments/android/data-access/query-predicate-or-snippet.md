```java
Amplify.DataStore.query(
    Post.class,
    Post.RATING.gt(4).or(Post.STATUS.eq(PostStatus.ACTIVE)),
    posts -> {
        while (posts.hasNext()) {
            Post post = posts.next();
            Log.i("GetStarted", "Post: " +  post);
        }
    },
    failure -> Log.e("GetStarted", "Query failed.", failure)
);
```
