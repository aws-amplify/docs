## Save Data

To write any data to the DataStore, you can pass an instance of a Model to `DataStore.save()` and it will be persisted in offline storage. The DataStore supports standard storage operations like querying, updating and deleting. If you choose to connect to the cloud at a later time, the local items will be synchronized using GraphQL mutations. Any other systems connected to the same backend can then run queries or mutations on your DataStore items, or observe changes to them via GraphQL subscriptions.

```java
Post post = Post.builder()
    .title("My First Post")
    .rating(10)
    .status(PostStatus.ACTIVE)
    .build();

Amplify.DataStore.save(post, new ResultListener<DataStoreItemChange<Post>>() {
    @Override
    public void onResult(DataStoreItemChange<Post> result) {
        Log.i("DataStore", "Result: " + result);
    }

    @Override
    public void onError(Throwable error) {
        Log.e("DataStore", "Error.", error);
    }
});
```

## Query Data

Queries are always performed against the local copy of your data. When connected to the cloud, the local copy of your data is automatically updated in the background. You can query for models by their class, or by providing additional search criteria for finer-grained results. A simple query without any filtering criteria is shown below.

```java
Amplify.DataStore.query(Post.class, new ResultListener<Iterator<Post>>() {
    @Override
    public void onResult(Iterator<Post> result) {       
        while (result.hasNext()) {
            Post post = result.next();
            Log.i("DataStore", "Title: " + post.getTitle());
            Log.i("DataStore", "Rating: " + post.getRating());
            Log.i("DataStore", "Status: " + post.getStatus());
        }
    }

    @Override
    public void onError(Throwable error) {
        Log.e("DataStore", "Error.", error);
    }
});
```

### Query with Predicates

You can provide additional filters to your query using a **query predicate**. The AWS-standard nomenclature of these query predicates will be familiar to those who have used Amazon DynamoDB, in the past.

**Strings:** `eq | ne | le | lt | ge | gt | contains | beginsWith | between`

**Numbers:** `eq | ne | le | lt | ge | gt | between`

**Lists:** `contains`

For example, if you wanted a list of all `Post` models that have a `rating` greater than 4:

```java
Amplify.DataStore.query(Post.class, Post.RATING.gt(4), new ResultListener<Iterator<Post>>() {
    @Override
    public void onResult(Iterator<Post> result) {
        while (result.hasNext()) {
            Post post = result.next();
            Log.i("DataStore", "Title: " + post.getTitle());
            Log.i("DataStore", "Rating: " + post.getRating());
            Log.i("DataStore", "Status: " + post.getStatus());
        }
    }

    @Override
    public void onError(Throwable error) {
        Log.e("DataStore", "Error.", error);
    }
});
```

Note: when constructing predicates, static `QueryField` instances such as `Post.RATING` do not own any information about the model to which the field belongs. In order to avoid any ambiguity between field names which are used across multiple models, it is recommended to construct a custom instance of `QueryField` in the form of  `QueryField.field("{model-name}.{field-name}")` (i.e. `QueryField.field("Post.rating")`).
{: .callout .callout--info}

Multiple conditions can be chained together by using `and | or | not`:

```java
Amplify.DataStore.query(
    Post.class,
    Post.RATING.gt(4).and(Post.STATUS.eq(PostStatus.ACTIVE)),
    new ResultListener<Iterator<Post>>() {
        @Override
        public void onResult(Iterator<Post> result) {
            while (result.hasNext()) {
                Post post = result.next();
                Log.i("DataStore", "Title: " +  post.getTitle());
                Log.i("DataStore", "Rating: " + post.getRating());
                Log.i("DataStore", "Status: " + post.getStatus());
            }
        }

        @Override
        public void onError(Throwable error) {
            Log.e("DataStore", "Error.", error);
        }
    }
);
```

## Update Data

An in-memory representation of a DataStore Model is immutable. Instead of directly modifying the fields on a Model, you must use the `.copyOfBuilder()` function to create a new representation of the model:

```java
ResultListener<DataStoreItemChange<Post>> updateListener = new ResultListener<DataStoreItemChange<Post>>() {
    @Override
    public void onResult(DataStoreItemChange<Post> result) {
        Log.i("DataStore", "Result: " + result.item());
    }

    @Override
    public void onError(Throwable error) {
        Log.e("DataStore", "Error.", error);
    }
};

Amplify.DataStore.query(Post.class, Post.ID.eq("123"), new ResultListener<Iterator<Post>>() {
    @Override
    public void onResult(Iterator<Post> result) {
        if (result.hasNext()) {
            Post original = result.next();
            Post edited = original.copyOfBuilder()
                .title("New Title")
                .build();
            Amplify.DataStore.save(edited, updateListener);
        }
    }

    @Override
    public void onError(Throwable error) {
        Log.e("DataStore", "Error.", error);
    }
});
```

## Delete Data

To delete an item, simply pass in an instance:

```java
ResultListener<DataStoreItemChange<Post>> deleteListener = new ResultListener<DataStoreItemChange<Post>>() {
    @Override
    public void onResult(DataStoreItemChange<Post> result) {
        Log.i("DataStore", "Result: " + result.item());
    }

    @Override
    public void onError(Throwable error) {
        Log.e("DataStore", "Error.", error);
    }
};

Amplify.DataStore.query(Post.class, Post.ID.eq("123"), new ResultListener<Iterator<Post>>() {
    @Override
    public void onResult(Iterator<Post> result) {
        if (result.hasNext()) {
            Post post = result.next();
            Amplify.DataStore.delete(post, deleteListener);
        }
    }

    @Override
    public void onError(Throwable error) {
        Log.e("DataStore", "Error.", error);
    }
});
```

## Observe Data

You can subscribe to changes on your Models by using the DataStore's `observe` method. This method reacts dynamically to all changes in local storage. These changes could be the result of local modifications, or the result of changes observed on your GraphQL endpoint, if using remote synchronization.

The `AWSDataStorePlugin.observe()` method returns an `io.reactivex.Observable<DataStoreItemChange<? extends Model>>`. You can subscribe to this Rx Observable to get notifications whenever any model is created, updated, or deleted. To use a method in this family, you must make Rx available at runtime by adding `implementation 'io.reactivex.rxjava2:rxandroid:2.1.1'` to your module's `build.gradle`. [Read more about RxJava, here](https://github.com/ReactiveX/RxJava/blob/v2.2.17/README.md#rxjava-reactive-extensions-for-the-jvm).
{: .callout .callout--info}

```java
Amplify.DataStore.observe(Post.class).subscribe(changed -> {
    Post post = changed.item();
    Log.i("DataStore", "Post Title: " + post.getTitle());
});
```