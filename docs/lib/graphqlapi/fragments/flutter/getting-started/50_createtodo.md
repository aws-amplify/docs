<amplify-block-switcher>
<amplify-block name="Java">

```java
Todo todo = Todo.builder()
        .name("My first todo")
        .description("todo description")
        .build();

Amplify.API.mutate(
        ModelMutation.create(todo),
        response -> Log.i("MyAmplifyApp", "Added Todo with id: " + response.getData().getId()),
        error -> Log.e("MyAmplifyApp", "Create failed", error)
);
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
val todo: Todo = Todo.builder()
        .name("My first todo")
        .description("todo description")
        .build()

Amplify.API.mutate(
        ModelMutation.create(todo),
        { response -> Log.i("MyAmplifyApp", "Added Todo with id: " + response.getData().getId()) },
        { error: ApiException? -> Log.e("MyAmplifyApp", "Create failed", error) }
)
```

</amplify-block>
<amplify-block name="RxJava">

```java
Todo todo = Todo.builder()
        .name("My first todo")
        .description("todo description")
        .build();

RxAmplify.API.mutate(ModelMutation.create(todo))
        .subscribe(
              response -> Log.i("MyAmplifyApp", "Added Todo with id: " + response.getData().getId()),
              error -> Log.e("MyAmplifyApp", "Create failed", error)
        );
```

</amplify-block>
</amplify-block-switcher>

