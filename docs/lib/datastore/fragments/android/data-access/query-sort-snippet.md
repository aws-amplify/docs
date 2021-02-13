<amplify-block-switcher>

<amplify-block name="Java">

```java
Amplify.DataStore.query(Post.class,
    Where.sorted(Post.RATING.ascending()),
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
Amplify.DataStore
    .query(Post::class, Where.sorted(Post.RATING.ascending()))
    .catch { Log.e("MyAmplifyApp", "Query failed", it) }
    .collect { Log.i("MyAmplifyApp", "Title: ${it.title}") }
```

</amplify-block>

<amplify-block name="RxJava">

```java
RxAmplify.DataStore.query(Post.class,
    Where.sorted(Post.RATING.ascending())
    .subscribe(
        post -> Log.i("MyAmplifyApp", "Post: " +  post),
        failure -> Log.e("MyAmplifyApp", "Query failed.", failure)
    );
```

</amplify-block>

</amplify-block-switcher>
