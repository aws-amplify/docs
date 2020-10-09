<amplify-block-switcher>

<amplify-block name="Java">

```java
Amplify.DataStore.query(Post.class,
    Where.sorted(Post.RATING.ascending(), Post.TITLE.descending()),
    posts -> {
        while (posts.hasNext()) {
            Post post = posts.next();
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
    Where.sorted(Post.RATING.ascending(), Post.TITLE.descending()),
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
RxAmplify.DataStore.query(Post.class,
    Where.sorted(Post.RATING.ascending(), Post.TITLE.descending()))
    .subscribe(
        post -> Log.i("MyAmplifyApp", "Post: " +  post),
        failure -> Log.e("MyAmplifyApp", "Query failed.", failure)
    );
```

</amplify-block>

</amplify-block-switcher>
