<amplify-block-switcher>
<amplify-block name="Java">

```java
private GraphQLRequest<Todo> getTodoRequest(String id) {
    String document = "query getTodo($id: ID!) { "
        + "getTodo(id: $id) { "
            + "id "
            + "name "
        + "}"
    + "}";
    return new SimpleGraphQLRequest<>(
            document, 
            Collections.singletonMap("id", id), 
            Todo.class, 
            new GsonVariablesSerializer());
}
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
private fun getTodoRequest(id: String): GraphQLRequest<Todo> {
    val document = ("query getTodo(\$id: ID!) { "
          + "getTodo(id: \$id) { "
              + "id "
              + "name "
            + "}"
          + "}")
    return SimpleGraphQLRequest(
            document,
            mapOf("id" to id),
            Todo::class.java,
            GsonVariablesSerializer())
}
```

</amplify-block>
</amplify-block-switcher>

Then, query for the Todo by a todo id

<amplify-block-switcher>
<amplify-block name="Java">

```java
Amplify.API.query(getTodoQuery("[TODO_ID]"),
        response -> Log.d("MyAmplifyApp", "response" + response),
        error -> Log.e("MyAmplifyApp", "error" + error));
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
Amplify.API.query(getTodoQuery("[TODO_ID]"),
        { response: GraphQLResponse<Todo> -> Log.d("MyAmplifyApp", "response$response") },
        { error: ApiException -> Log.e("MyAmplifyApp", "error$error") })
```

</amplify-block>
</amplify-block-switcher>