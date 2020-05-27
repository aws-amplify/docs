## Query item

Now that you were able to make a mutation, take the `Id` that was printed out and use it in your query to retrieve data.

<amplify-block-switcher>
<amplify-block name="Java">

```java
private void getTodo(String id) {
  Amplify.API.query(
          ModelQuery.get(Todo.class, id),
          response -> Log.i("MyAmplifyApp", ((Todo) response.getData()).getName()),
          error -> Log.e("MyAmplifyApp", error.toString(), error)
  );
}
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
fun getTodo(id: String) {
    Amplify.API.query(
            ModelQuery.get(Todo::class.java, id),
            { response -> Log.i("MyAmplifyApp", response.data.name) },
            { error -> Log.e("MyAmplifyApp", "Query failed", error) }
    )
}
```

<<<<<<< Updated upstream
<amplify-block-switcher>
<amplify-block name="Java">

```java
private void getTodo(String id) {
  Amplify.API.query(
          ModelQuery.get(Todo.class, id),
          result -> Log.i("MyAmplifyApp", ((Todo) result.getData()).getName()),
          error -> Log.e("MyAmplifyApp", error.toString(), error)
  );
}
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
fun getTodo(id: String) {
    Amplify.API.query(
            ModelQuery.get(Todo::class.java, id),
            { result: GraphQLResponse<Todo> -> Log.i("MyAmplifyApp", result.data.name) },
            { error: ApiException -> Log.e("MyAmplifyApp", "Query failed", error) }
    )
}
```

</amplify-block>
</amplify-block-switcher>

## List Query
=======
</amplify-block>
</amplify-block-switcher>

## List items
>>>>>>> Stashed changes

You can get the list of items that match a condition that you specify in `Amplify.API.query`:

<amplify-block-switcher>
<amplify-block name="Java">

```java
Amplify.API.query(
        ModelQuery.list(Todo.class, Todo.NAME.contains("first")),
        response -> {
            for (Todo todo : response.getData()) {
                Log.i("MyAmplifyApp", todo.getName());
            }
        },
        error -> Log.e("MyAmplifyApp", "Query failure", error)
);
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
Amplify.API.query(
        ModelQuery.list(Todo::class.java, Todo.NAME.contains("first")),
        { response ->
            for (todo in response.data) {
                Log.i("MyAmplifyApp", todo.name)
            }
        },
        { error -> Log.e("MyAmplifyApp", "Query failure", error) }
)
```

</amplify-block>
</amplify-block-switcher>