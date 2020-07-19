<amplify-block-switcher>
<amplify-block name="Java">

```java
Amplify.DataStore.query(Post.class, Where.id("123"),
    matches -> {
        if (matches.hasNext()) {
            Post original = matches.next();
            Post edited = original.copyOfBuilder()
                .title("New Title")
                .build();
            Amplify.DataStore.save(edited,
                updated -> Log.i("MyAmplifyApp", "Updated a post."),
                failure -> Log.e("MyAmplifyApp", "Update failed.", failure)
            );
        }
    },
    failure -> Log.e("MyAmplifyApp", "Query failed.", failure)
);
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
Amplify.DataStore.query(Post::class.java, Where.id("123"),
    { matches ->
        if (matches.hasNext()) {
            val original = matches.next()
            val edited = original.copyOfBuilder()
                .title("New Title")
                .build()
            Amplify.DataStore.save(edited,
                { Log.i("MyAmplifyApp", "Updated a post.") },
                { Log.e("MyAmplifyApp", "Update failed.", it) }
            )
        }
    },
    { Log.e("MyAmplifyApp", "Query failed.", it) }
)
```

</amplify-block>
</amplify-block-switcher>

<amplify-callout>

Models in DataStore are *immutable*. Instead of directly modifying the fields on a Model, you must use the `.copyOfBuilder()` method to create a new representation of the model.

</amplify-callout>
