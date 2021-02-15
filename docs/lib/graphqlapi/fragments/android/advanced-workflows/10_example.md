<amplify-block-switcher>
<amplify-block name="Java">

```java
Todo todo = Todo.builder()
        .name("My first todo")
        .description("todo description")
        .build();

Amplify.API.mutate(ModelMutation.create(todo));
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
val todo: Todo = Todo.builder()
        .name("My first todo")
        .description("todo description")
        .build()

Amplify.API.mutate(ModelMutation.create(todo))
```

</amplify-block>
</amplify-block-switcher>
