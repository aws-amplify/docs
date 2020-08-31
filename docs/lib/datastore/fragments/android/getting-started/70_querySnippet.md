<amplify-block-switcher>
<amplify-block name="Java">

```java
Amplify.DataStore.query(Post.class,
    queryMatches -> {
        if (queryMatches.hasNext()) {
            Log.i("MyAmplifyApp", "Successful query, found posts.");
        } else {
            Log.i("MyAmplifyApp", "Successful query, but no posts.");
        }
    },
    error -> Log.e("MyAmplifyApp",  "Error retrieving posts", error)
);
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
Amplify.DataStore.query(Post::class.java,
    { result -> Log.i("MyAmplifyApp", "Posts retrieved successfully") },
    { error -> Log.e("MyAmplifyApp",  "Error retrieving posts", error) }
)
```

</amplify-block>
<amplify-block name="RxJava">

```java
RxAmplify.DataStore.query(Post.class).subscribe(
    post -> Log.i("MyAmplifyApp", "Successful query, found post."),
    error -> Log.e("MyAmplifyApp",  "Error retrieving posts", error)
);
```

</amplify-block>
</amplify-block-switcher>
