## Run a Mutation

Now that the client is set up, you can run a GraphQL mutation with `Amplify.API.mutate` to create, update, and delete your data.

```java
private void updateTodo() {
    // Retrieve your Todo using Amplify.API.query
    Todo todo = Todo.builder()
        .name("My updated todo")
        .build();

    Amplify.API.mutate(
        todo,
        MutationType.UPDATE,
        response -> Log.i("ApiQuickStart", "Updated Blog with id: " + response.getData().getId()),
        apiFailure -> Log.e("ApiQuickStart", apiFailure.getMessage(), apiFailure)
    );
}

```