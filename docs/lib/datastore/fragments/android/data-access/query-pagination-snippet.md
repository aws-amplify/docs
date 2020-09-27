<amplify-block-switcher>
<amplify-block name="Java">

```java
Amplify.DataStore.query(Post.class,
    Where.matchesAll().paginated(Page.startingAt(0).withLimit(100)),
    matchingPosts -> {
        while (matchingPosts.hasNext()) {
            Post post = matchingPosts.next();
            Log.i("MyAmplifyApp", "Title: " + post.getTitle());
        }
    },
    failure -> Log.e("MyAmplifyApp", "Query failed.", failure)
);
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
Amplify.DataStore.query(Post::class.java,
    Where.matchesAll().paginated(Page.startingAt(0).withLimit(100)),
    {
        while (it.hasNext()) {
            Log.i("MyAmplifyApp", "Title: ${it.next().title}")
        }
    },
    { Log.e("MyAmplifyApp", "Query failed.", it) }
)
```

</amplify-block>
<amplify-block name="RxJava">

```java
RxAmplify.DataStore.query(
    Post.class,
    Where.matchesAll().paginated(Page.startingAt(0).withLimit(100)))
    .subscribe(
        post -> Log.i("MyAmplifyApp", "Title: " + post.getTitle()),
        failure -> Log.e("MyAmplifyApp", "Query failed.", failure)
    );
```

</amplify-block>
</amplify-block-switcher>
