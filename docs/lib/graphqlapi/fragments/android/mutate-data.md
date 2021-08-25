## Run a mutation

Now that the client is set up, you can run a GraphQL mutation with `Amplify.API.mutate` to create, update, and delete your data.

<amplify-block-switcher>
<amplify-block name="Java">

```java
Todo todo = Todo.builder()
    .name("My todo")
    .build();

Amplify.API.mutate(ModelMutation.create(todo),
    response -> Log.i("MyAmplifyApp", "Todo with id: " + response.getData().getId()),
    error -> Log.e("MyAmplifyApp", "Create failed", error)
);
```

</amplify-block>
<amplify-block name="Kotlin - Callbacks">

```kotlin
val todo = Todo.builder()
    .name("My todo")
    .build()

Amplify.API.mutate(ModelMutation.create(todo),
    { Log.i("MyAmplifyApp", "Todo with id: ${it.data.id}") }
    { Log.e("MyAmplifyApp", "Create failed", it) }
)
```

</amplify-block>
<amplify-block name="Kotlin - Coroutines (Beta)">

```kotlin
val todo = Todo.builder()
    .name("My todo")
    .build()
try {
    val response = Amplify.API.mutate(ModelMutation.create(todo))
    Log.i("MyAmplifyApp", "Todo with id: ${response.data.id}")
} catch (error: ApiException) {
    Log.e("MyAmplifyApp", "Create failed", error)
}
```

</amplify-block>
<amplify-block name="RxJava">

```java
Todo todo = Todo.builder()
        .name("My todo")
        .build();

RxAmplify.API.mutate(ModelMutation.create(todo))
        .subscribe(
            response -> Log.i("MyAmplifyApp", "Todo with id: " + response.getData().getId()),
            error -> Log.e("MyAmplifyApp", "Create failed", error)
        );
```

</amplify-block>
</amplify-block-switcher>

To update data, use `ModelMutation.update(todo)` instead. To delete data, use `ModelMutation.delete(todo)`.
