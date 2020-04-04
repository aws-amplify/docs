## Save Data

To write data to the DataStore, you can pass an instance of a `Model` to
`DataStore.save()` and it will be persisted in offline storage. The
DataStore supports standard storage operations like querying, updating
and deleting. If you choose to connect to the cloud at a later time, the
local items will be synchronized using GraphQL mutations. Any other
systems connected to the same backend can then run queries or mutations
on your DataStore items, or observe changes to them via GraphQL
subscriptions.

```java
Post post = Post.builder()
    .title("My First Post")
    .rating(10)
    .status(PostStatus.ACTIVE)
    .build();

Amplify.DataStore.save(post,
    saved -> Log.i("DataStore", "Saved a post: " + saved.item()),
    saveFailure -> Log.e("DataStore", "Save failed.", saveFailure)
);
```

## Query Data

Queries are always performed against the local copy of your data. When
connected to the cloud, the local copy of your data is automatically
updated in the background. You can query for models by their class, or
by providing additional search criteria for finer-grained results. A
simple query without any filtering criteria is shown below.

```java
Amplify.DataStore.query(Post.class,
    allPosts -> {
        while (allPosts.hasNext()) {
            Post post = allPosts.next();
            Log.i("DataStore", "Title: " + post.getTitle());
            Log.i("DataStore", "Rating: " + post.getRating());
            Log.i("DataStore", "Status: " + post.getStatus());
        }
    },
    queryFailure -> Log.e("DataStore", "Query failed.", queryFailure)
); 
```

### Query with Predicates

You can provide additional filters to your query using a **query
predicate**. The AWS-standard nomenclature of these query predicates
will be familiar to those who have used Amazon DynamoDB, in the past.

**Strings:** `eq | ne | le | lt | ge | gt | contains | beginsWith | between`

**Numbers:** `eq | ne | le | lt | ge | gt | between`

**Lists:** `contains`

For example, if you wanted a list of all `Post` models that have a
`rating` greater than 4:

```java
Amplify.DataStore.query(Post.class, Post.RATING.gt(4),
    wellRatedPosts -> {
        while (wellRatedPosts.hasNext()) {
            Post post = wellRatedPosts.next();
            Log.i("DataStore", "Title: " + post.getTitle());
            Log.i("DataStore", "Rating: " + post.getRating());
            Log.i("DataStore", "Status: " + post.getStatus());
        }
    },
    queryFailure -> Log.e("DataStore", "Query failed.", queryFailure)
);
```

<amplify-callout>
Note: when constructing predicates, static `QueryField` instances such
as `Post.RATING` do not own any information about the model to which the
field belongs. In order to avoid any ambiguity between field names which
are used across multiple models, it is recommended to construct a custom
instance of `QueryField` in the form of
`QueryField.field("{model-name}.{field-name}")` (i.e.
`QueryField.field("Post.rating")`).
</amplify-callout>

Multiple conditions can be chained together by using `and | or | not`:

```java
Amplify.DataStore.query(
    Post.class,
    Post.RATING.gt(4).and(Post.STATUS.eq(PostStatus.ACTIVE)),
    wellRatedActivePosts -> {
        while (wellRatedActivePosts.hasNext()) {
            Post post = wellRatedActivePosts.next();
            Log.i("DataStore", "Title: " +  post.getTitle());
            Log.i("DataStore", "Rating: " + post.getRating());
            Log.i("DataStore", "Status: " + post.getStatus());
        }
    },
    queryFailure -> Log.e("DataStore", "Query failed.", queryFailure)
);
```

## Update Data

An in-memory representation of a DataStore Model is immutable. Instead
of directly modifying the fields on a Model, you must use the
`.copyOfBuilder()` function to create a new representation of the model:

```java
Amplify.DataStore.query(Post.class, Post.ID.eq("123"),
    postsToUpdate -> {
        if (postsToUpdate.hasNext()) {
            Post original = postsToUpdate.next();
            Post edited = original.copyOfBuilder()
                .title("New Title")
                .build();
            Amplify.DataStore.save(edited,
                updated -> Log.i("DataStore", "Updated a post: " + updated.item()),
                updateFailure -> Log.e("DataStore", "Update failed.", updateFailure)
            );
        }
    },
    queryFailure -> Log.e("DataStore", "Query failed.", queryFailure)
);
```

## Delete Data

To delete an item, simply pass in an instance to `DataStore.delete()`.
Below, we query for an instance with an `id` of `"123"`, and then delete
it, if found.

```java
Amplify.DataStore.query(Post.class, Post.ID.eq("123"),
    postsToDelete -> {
        if (postsToDelete.hasNext()) {
            Post post = postsToDelete.next();
            Amplify.DataStore.delete(post,
                deleted -> Log.i("DataStore", "Deleted a post: " + deleted.item()),
                deleteFailure -> Log.i("DataStore", "Delete failed.", deleteFailure)
            );
        }
    },
    queryFailure -> Log.e("DataStore", "Query failed.", queryFailure)
);
```

## Observe Data

You can subscribe to changes on your Models by using the DataStore's
`observe` method. This method reacts dynamically to all changes in local
storage. These changes could be the result of local modifications, or
the result of changes observed on your GraphQL endpoint, if using remote
synchronization.

<amplify-callout>
You can subscribe to the `DataStore.observe()` method to get
notifications whenever any model is created, updated, or deleted.
</amplify-callout>

```java
Amplify.DataStore.observe(Post.class,
    cancelable -> Log.i("DataStore", "Observation began."),
    postChanged -> {
        Post post = postChanged.item();
        Log.i("DataStore", "Post Title: " + post.getTitle());
    },
    failure -> Log.e("DataStore", "Observation failed.", failure),
    () -> Log.i("DataStore", "Observation complete.")
);
```
