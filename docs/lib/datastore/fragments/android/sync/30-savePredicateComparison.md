<amplify-block-switcher>
<amplify-block name="Java">

```java
// Tests only against the local state
if (post.getTitle().startsWith("[Amplify]")) {
    Amplify.DataStore.save(post,
        update -> { /* handle result */ },
        failure -> { /* handle failure */}
    );
}

// Only applies the update if the data in the remote backend satisfies the criteria
Amplify.DataStore.save(post, Post.TITLE.beginsWith("[Amplify]"),
    update -> { /* handle result */ },
    failure -> { /* handle failure */ }
);
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
// Tests only against the local state
if (post.title.starts("[Amplify]")) {
    Amplify.DataStore.save(post,
        { /* handle result */ },
        { /* handle failure */ }
    )
}

// Only applies the update if the data in the remote backend satisfies the criteria
Amplify.DataStore.save(post, Post.TITLE.beginsWith("[Amplify]"),
    { /* handle result */ },
    { /* handle failure */ }
)
```

</amplify-block>
<amplify-block name="RxJava">

```java
// Tests only against the local state
if (post.getTitle().startsWith("[Amplify]")) {
    RxAmplify.DataStore.save(post)
        .subscribe(
            update -> { /* handle result */ },
            failure -> { /* handle failure */}
        );
}

// Only applies the update if the data in the remote backend satisfies the criteria
RxAmplify.DataStore.save(post, Post.TITLE.beginsWith("[Amplify]"))
    .subscribe(
        update -> { /* handle result */ },
        failure -> { /* handle failure */ }
    );
```
</amplify-block>
</amplify-block-switcher>
