```java
Amplify.DataStore.query(
    Post.class,
    Post.RATING.gt(4).and(Post.STATUS.eq(PostStatus.ACTIVE)),
    goodActivePosts -> {
        while (goodActivePosts.hasNext()) {
            Post post = goodActivePosts.next();
            Log.i("GetStarted", "Post: " +  post);
        }
    },
    failure -> Log.e("GetStarted", "Query failed.", failure)
);
```
