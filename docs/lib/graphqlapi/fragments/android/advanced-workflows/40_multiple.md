
<amplify-block-switcher>
<amplify-block name="Java">

```java
private GraphQLRequest<String> getPostAndTodo(String postId, String todoId) {
    String document = "query get($postId: ID!, $todoId: ID!) { "
        + "getPost(id: $postId) { "
            + "id "
            + "title "
            + "rating "
        + "} "
        + "getTodo(id: $todoId) { "
            + "id "
            + "name "
        + "} "
    + "}";
    Map<String, Object> variables = new HashMap<>();
    variables.put("postId", postId);
    variables.put("todoId", todoId);
    return new SimpleGraphQLRequest<>(
            document,
            variables,
            String.class,
            new GsonVariablesSerializer());
}
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
private fun getPostAndTodo(postId: String, todoId: String): GraphQLRequest<String> {
    val document = ("query get(\$postId: ID!, \$todoId: ID!) { "
            + "getPost(id: \$postId) { "
                + "id "
                + "title "
                + "rating "
            + "} "
            + "getTodo(id: \$todoId) { "
                + "id "
                + "name "
            + "} "
        + "}")

    return SimpleGraphQLRequest(
            document,
            mapOf("postId" to postId, "todoId" to todoId),
            String::class.java,
            GsonVariablesSerializer())
}
```
</amplify-block>
</amplify-block-switcher>
