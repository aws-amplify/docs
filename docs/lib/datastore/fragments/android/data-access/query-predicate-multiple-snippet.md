<amplify-block-switcher>
<amplify-block name="Java">

```java
Amplify.DataStore.query(
    Post.class,
    Where.matches(Post.RATING.gt(4).and(Post.STATUS.eq(PostStatus.PUBLISHED))),
    goodActivePosts -> {
        while (goodActivePosts.hasNext()) {
            Post post = goodActivePosts.next();
            Log.i("MyAmplifyApp", "Post: " +  post);
        }
    },
    failure -> Log.e("MyAmplifyApp", "Query failed.", failure)
);
```

</amplify-block>
<amplify-block name="Kotlin - Callbacks">

```kotlin
Amplify.DataStore.query(
    Post.class, Where.matches(Post.RATING.gt(4)
        .and(Post.STATUS.eq(PostStatus.PUBLISHED))
    ),
    { goodActivePosts ->
        while (goodActivePosts.hasNext()) {
            val post = goodActivePosts.next()
            Log.i("MyAmplifyApp", "Post: $post ")
        }
    },
    { Log.e("MyAmplifyApp", "Query failed", it) }
)
```

</amplify-block>
<amplify-block name="Kotlin - Coroutines (Beta)">

```kotlin
Amplify.DataStore
    .query(Post::class,
        Where.matches(Post.RATING.gt(4)
            .and(Post.STATUS.eq(PostStatus.PUBLISHED)))
    )
    .catch { Log.e("MyAmplifyApp", "Query failed", it) }
    .collect { Log.i("MyAmplifyApp", "Post: $it") }
```

</amplify-block>
<amplify-block name="RxJava">

```java
RxAmplify.DataStore.query(
    Post.class,
    Where.matches(Post.RATING.gt(4).and(Post.STATUS.eq(PostStatus.PUBLISHED))))
    .subscribe(
        post -> Log.i("MyAmplifyApp", "Post: " +  post),
        failure -> Log.e("MyAmplifyApp", "Query failed.", failure)
    );
```

</amplify-block>

</amplify-block-switcher>
