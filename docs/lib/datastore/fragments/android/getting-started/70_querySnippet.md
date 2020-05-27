<amplify-block-switcher>
<amplify-block name="Java">

```java
Amplify.DataStore.query(Post.class,
    result -> Log.i("MyAmplifyApp", "Posts retrieved successfully"),
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
</amplify-block-switcher>
