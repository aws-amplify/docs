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
<amplify-block name="Kotlin">

```kotlin
Amplify.DataStore.query(
    Post::class.java,
    Where.matches(Post.RATING.gt(4).and(Post.STATUS.eq(PostStatus.PUBLISHED))),
    {
        while (it.hasNext()) {
            Log.i("MyAmplifyApp", "Post: ${it.next()}")
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
    Where.matches(Post.RATING.gt(4).and(Post.STATUS.eq(PostStatus.PUBLISHED))))
    .subscribe(
        post -> Log.i("MyAmplifyApp", "Post: " +  post),
        failure -> Log.e("MyAmplifyApp", "Query failed.", failure)
    );
```

</amplify-block>

</amplify-block-switcher>
