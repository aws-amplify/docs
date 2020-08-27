<amplify-block-switcher>
<amplify-block name="Java">

```java
Post post = Post.builder()
    .title("Create an Amplify DataStore app")
    .build();

Amplify.DataStore.save(post,
    result -> Log.i("MyAmplifyApp", "Created a new post successfully"),
    error -> Log.e("MyAmplifyApp",  "Error creating post", error)
);
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
val post = Post.builder()
    .title("Create an Amplify DataStore app")
    .build()

Amplify.DataStore.save(post,
    { Log.i("MyAmplifyApp", "Saved a new post successfully") },
    { Log.e("MyAmplifyApp", "Error saving post", it) }
)
```

</amplify-block>
<amplify-block name="RxJava">

```java
Post post = Post.builder()
    .title("Create an Amplify DataStore app")
    .build();

RxAmplify.DataStore.save(post).subscribe(
    () -> Log.i("MyAmplifyApp", "Created a new post successfully"),
    error -> Log.e("MyAmplifyApp",  "Error creating post", error)
);
```

</amplify-block>
</amplify-block-switcher>
