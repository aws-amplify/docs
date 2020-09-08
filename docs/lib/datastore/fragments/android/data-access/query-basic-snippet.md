<amplify-block-switcher>
<amplify-block name="Java">

```java
Amplify.DataStore.query(Post.class,
    allPosts -> {
        while (allPosts.hasNext()) {
            Post post = allPosts.next();
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
RxAmplify.DataStore.query(Post.class).subscribe(
    post -> Log.i("MyAmplifyApp", "Title: " + post.getTitle()),
    failure -> Log.e("MyAmplifyApp", "Query failed.", failure)
);
```

</amplify-block>
</amplify-block-switcher>
