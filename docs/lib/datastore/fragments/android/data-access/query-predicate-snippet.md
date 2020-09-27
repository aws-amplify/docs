<amplify-block-switcher>
<amplify-block name="Java">

```java
Amplify.DataStore.query(Post.class, Where.matches(Post.RATING.gt(4)),
    goodPosts -> {
        while (goodPosts.hasNext()) {
            Post post = goodPosts.next();
            Log.i("MyAmplifyApp", "Post: " +  post);
        }
    },
    failure -> Log.e("MyAmplifyApp", "Query failed.", failure)
);
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
Amplify.DataStore.query(Post::class.java, Where.matches(Post.RATING.gt(4)),
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
    Where.matches(Post.RATING.gt(4)))
    .subscribe(
        post -> Log.i("MyAmplifyApp", "Post: " +  post),
        failure -> Log.e("MyAmplifyApp", "Query failed.", failure)
    );
```

</amplify-block>
</amplify-block-switcher>

<amplify-callout warning>

**Note:** when constructing predicates, static `QueryField` instances such as `Post.RATING` do not own any information about the model to which the field belongs. In order to avoid any ambiguity between field names which are used across multiple models, it is recommended to construct a custom instance of `QueryField` in the form of `QueryField.field("{model-name}.{field-name}")` (i.e. `field("post.rating")`).

</amplify-callout>
