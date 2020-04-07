```java
Amplify.DataStore.query(Post.class, Post.ID.eq("123"), matches -> {
    if (matches.hasNext()) {
        Post original = matches.next();
        Post edited = original.copyOfBuilder()
            .title("New Title")
            .build();
        Amplify.DataStore.save(edited,
            updated -> Log.i("GetStarted", "Updated a post."),
            failure -> Log.e("GetStarted", "Update failed.", failure)
        );
    }
}, failure -> Log.e("GetStarted", "Query failed.", failure));
```

<amplify-callout>

Models in DataStore are *immutable*. Instead of directly modifying the fields on a Model, you must use the `.copyOfBuilder()` method to create a new representation of the model. 

</amplify-callout>
