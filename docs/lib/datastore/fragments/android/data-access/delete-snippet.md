To delete an item, simply pass in an instance to `Amplify.DataStore.delete()`.  Below, we query for an instance with an `id` of `"123"`, and then delete it, if found:

```java
Amplify.DataStore.query(Post.class, Post.ID.eq("123"),
    matches -> {
        if (matches.hasNext()) {
            Post post = matches.next();
            Amplify.DataStore.delete(post,
                deleted -> Log.i("GetStarted", "Deleted a post."),
                failure -> Log.i("GetStarted", "Delete failed.", failure)
            );
        }
    },
    failure -> Log.e("GetStarted", "Query failed.", failure)
);
```
