<amplify-block-switcher>
<amplify-block name="Java">

```java
Amplify.DataStore.save(post, Post.TITLE.beginsWith("[Amplify]"),
    update -> Log.i("MyAmplifyApp", "Post updated successfully!"),
    failure -> Log.e("MyAmplifyApp", "Could not update post, maybe the title has been changed?", failure)
);
```

</amplify-block>
<amplify-block name="Kotlin - Callbacks">

```kotlin
Amplify.DataStore.save(post, Post.TITLE.beginsWith("[Amplify]"),
    { Log.i("MyAmplifyApp", "Post updated successfully!") },
    { Log.e("MyAmplifyApp", "Could not update post, maybe the title has been changed?", it) }
)
```

</amplify-block>
<amplify-block name="Kotlin - Coroutines">

```kotlin
try {
    Amplify.DataStore.save(post, Post.TITLE.beginsWith("[Amplify]"))
    Log.i("MyAmplifyApp", "Post updated successfully!") 
} catch (error: DataStoreException) {
    Log.e("MyAmplifyApp", "Could not update post, maybe the title has been changed?", error) 
}
```

</amplify-block>
<amplify-block name="RxJava">

```java
RxAmplify.DataStore.save(post, Post.TITLE.beginsWith("[Amplify]"))
    .subscribe(
        update -> Log.i("MyAmplifyApp", "Post updated successfully!"),
        failure -> Log.e("MyAmplifyApp", "Could not update post, maybe the title has been changed?", failure)
    );
```

</amplify-block>
</amplify-block-switcher>

