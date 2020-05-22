## Query by Id

Now that you were able to make a mutation, take the `Id` that was printed out and use it in your query to retrieve data.

```java
private void getTodo(String id) {
    Amplify.API.query(
        Todo.class,
        id,
        queryResponse -> {
            Log.i("ApiQuickStart", "Got " + queryResponse.getData().getName());
        },
        apiFailure -> Log.e("ApiQuickStart", apiFailure.getMessage(), apiFailure)
    );
}
```

## List Query

You can get the list of items that match a condition that you specify in `Amplify.API.query`

```java
private void listTodo() {
    Amplify.API.query(
        Todo.class,
        Todo.NAME.contains("first").and(Todo.NAME.ne("first todo name")),
        queryResponse -> {
            for (Todo todo : queryResponse.getData()) {
                Log.i("ApiQuickstart", "List result: " + todo.getName());
            }
        },
        apiFailure -> Log.e("ApiQuickStart", apiFailure.getMessage(), apiFailure)
    );
}
```