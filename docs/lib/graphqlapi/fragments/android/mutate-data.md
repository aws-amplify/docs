## Run a mutation

Now that the client is set up, you can run a GraphQL mutation with `Amplify.API.mutate` to create, update, and delete your data.

<amplify-block-switcher>
<amplify-block name="Java">

```java
Todo todo = Todo.builder()
        .name("My updated todo")
        .build();

Amplify.API.mutate(
        ModelMutation.update(todo),
        response -> Log.i("MyAmplifyApp", "Updated Todo with id: " + response.getData().getId()),
        error -> Log.e("MyAmplifyApp", "Update failed", error)
);
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
val todo = Todo.builder()
        .name("My updated todo")
        .build()

Amplify.API.mutate(
        ModelMutation.update(todo),
        { response -> Log.i("MyAmplifyApp", "Updated Todo with id: " + response.data.id) },
        { error -> Log.e("MyAmplifyApp", "Update failed", error) }
)
```

</amplify-block>
<amplify-block name="RxJava">

```java
Todo todo = Todo.builder()
        .name("My updated todo")
        .build();

RxAmplify.API.mutate(ModelMutation.update(todo))
        .subscribe(
            response -> Log.i("MyAmplifyApp", "Updated Todo with id: " + response.getData().getId()),
            error -> Log.e("MyAmplifyApp", "Update failed", error)
        );
```

</amplify-block>
</amplify-block-switcher>
