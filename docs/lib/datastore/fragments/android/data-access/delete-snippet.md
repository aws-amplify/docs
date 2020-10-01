To delete an item, simply pass in an instance to `Amplify.DataStore.delete()`.  Below, we query for an instance with an `id` of `"123"`, and then delete it, if found:

<amplify-block-switcher>
<amplify-block name="Java">

```java
Amplify.DataStore.query(Post.class, Where.id("123"),
    matches -> {
        if (matches.hasNext()) {
            Post post = matches.next();
            Amplify.DataStore.delete(post,
                deleted -> Log.i("MyAmplifyApp", "Deleted a post."),
                failure -> Log.e("MyAmplifyApp", "Delete failed.", failure)
            );
        }
    },
    failure -> Log.e("MyAmplifyApp", "Query failed.", failure)
);
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
Amplify.DataStore.query(Post::class.java, Where.id("123"),
    { matches ->
        if (matches.hasNext()) {
            val post = matches.next()
            Amplify.DataStore.delete(post,
                { Log.i("MyAmplifyApp", "Deleted a post.") },
                { Log.e("MyAmplifyApp", "Delete failed.", it) }
            )
        }
    },
    { Log.e("MyAmplifyApp", "Query failed.", it) }
)
```

</amplify-block>
<amplify-block name="RxJava">

```java
RxAmplify.DataStore.query(Post.class, Where.id("123"))
    .flatMapCompletable(RxAmplify.DataStore::delete)
    .subscribe(
        () -> Log.i("MyAmplifyApp", "Deleted a post."),
        failure -> Log.e("MyAmplifyApp", "Delete failed.", failure)
    );
```

</amplify-block>
</amplify-block-switcher>